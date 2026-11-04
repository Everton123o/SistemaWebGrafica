import secrets
from datetime import datetime, timedelta, timezone

import pytest
from fastapi.testclient import TestClient
from jose import jwt
from sqlalchemy import create_engine, select
from sqlalchemy import event
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from sqlalchemy.pool import StaticPool

from app.api.dependencies import database_session
from app.core.database import Base
from app.core.security import settings, verify_password
from app.main import create_app
from app.models.user import User
from app.models.client import Client


@pytest.fixture
def api(monkeypatch):
    monkeypatch.setattr(settings, 'jwt_secret', secrets.token_urlsafe(32))
    engine = create_engine('sqlite://', connect_args={'check_same_thread': False}, poolclass=StaticPool)
    Base.metadata.create_all(engine)
    with Session(engine) as session:
        app = create_app()
        app.dependency_overrides[database_session] = lambda: session
        with TestClient(app) as client:
            yield client, session
    engine.dispose()


def payload():
    return dict(name='Cliente Teste', email='cliente@example.com', password='senha-teste-123',
                personType='PF', document='529.982.247-25', company='', phone='', birthDate=None,
                address=dict(cep='01001-000', street='Rua Teste', number='10', complement='',
                             district='Centro', city='Sao Paulo', state='SP'))


def test_register_login_restore_and_permissions(api):
    client, session = api
    data = payload()
    response = client.post('/auth/register', json=data)
    assert response.status_code == 201, response.text
    result = response.json()
    assert result['user']['role'] == 'client'
    assert 'password' not in response.text
    user = session.scalar(select(User))
    assert verify_password(data['password'], user.password_hash)
    profile = session.scalar(select(Client))
    assert profile.user_id == user.id
    assert profile.registration_details['city'] == 'Sao Paulo'
    auth = {'Authorization': 'Bearer ' + result['access_token']}
    assert client.get('/auth/me', headers=auth).json()['id'] == user.id
    assert client.post('/auth/login', json={'email': ' CLIENTE@EXAMPLE.COM ', 'password': data['password']}).status_code == 200
    assert client.post('/auth/register', json=data).status_code == 409
    assert client.get('/clients', headers=auth).status_code == 403
    assert client.post('/users', headers=auth, json={}).status_code == 403


def test_invalid_credentials_tokens_and_disabled_accounts(api):
    client, session = api
    data = payload()
    token = client.post('/auth/register', json=data).json()['access_token']
    for email, password in [(data['email'], 'wrong'), ('missing@example.com', data['password'])]:
        assert client.post('/auth/login', json={'email': email, 'password': password}).status_code == 401
    for headers in [{}, {'Authorization': 'Bearer invalid'}]:
        assert client.get('/auth/me', headers=headers).status_code == 401
    expired = jwt.encode({'sub': '1', 'exp': datetime.now(timezone.utc) - timedelta(minutes=1)},
                         settings.jwt_secret, algorithm=settings.jwt_algorithm)
    assert client.get('/auth/me', headers={'Authorization': 'Bearer ' + expired}).status_code == 401
    user = session.scalar(select(User))
    user.is_active = False
    session.commit()
    assert client.get('/auth/me', headers={'Authorization': 'Bearer ' + token}).status_code == 401
    assert client.post('/auth/login', json={'email': data['email'], 'password': data['password']}).status_code == 401


@pytest.mark.parametrize('patch', [{'role': 'admin'}, {'password': 'short'}, {'document': '11111111111'}, {'email': 'invalid'}])
def test_registration_validates_on_server(api, patch):
    client, session = api
    assert client.post('/auth/register', json={**payload(), **patch}).status_code == 422
    assert session.scalar(select(User)) is None


@pytest.mark.parametrize('role', ['admin', 'employee'])
def test_staff_roles_come_from_database(api, role):
    client, session = api
    token = client.post('/auth/register', json=payload()).json()['access_token']
    user = session.scalar(select(User))
    user.role = role
    session.commit()
    auth = {'Authorization': 'Bearer ' + token}
    assert client.get('/auth/me', headers=auth).json()['role'] == role
    assert client.get('/clients', headers=auth).status_code == 200


def test_company_registration_and_duplicate_document(api):
    client, session = api
    data = {**payload(), 'personType': 'PJ', 'document': '11.222.333/0001-81',
            'company': 'Empresa Teste'}
    assert client.post('/auth/register', json=data).status_code == 201
    profile = session.scalar(select(Client))
    assert profile.name == 'Empresa Teste'
    assert profile.registration_details['company'] == 'Empresa Teste'
    assert client.post('/auth/register', json={**data, 'email': 'other@example.com'}).status_code == 409


def test_customer_persistence_failure_rolls_back_user(api):
    client, session = api

    def fail_insert(*args):
        raise IntegrityError('test failure', {}, Exception('test'))

    event.listen(Client, 'before_insert', fail_insert)
    try:
        assert client.post('/auth/register', json=payload()).status_code == 409
    finally:
        event.remove(Client, 'before_insert', fail_insert)
    assert session.scalar(select(User)) is None
    assert session.scalar(select(Client)) is None
