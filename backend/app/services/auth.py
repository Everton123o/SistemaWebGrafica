"""Authentication and atomic customer registration."""
import hashlib
import hmac
from datetime import datetime, timedelta
from jwt import InvalidTokenError
from sqlalchemy.exc import IntegrityError

from app.core.security import (create_access_token, decode_access_token, hash_password,
                               jwt_key, verify_password)
from app.models.user import User
from app.models.client import Client
from app.repositories.user import UserRepository
from app.repositories.client import ClientRepository
from app.repositories.login_attempt import LoginAttemptRepository
from app.services.user import UserAlreadyExistsError


class InvalidCredentialsError(Exception):
    pass


class DocumentAlreadyExistsError(Exception):
    pass


class LoginRateLimitError(Exception):
    pass


class AuthService:
    _dummy_hash = hash_password("constant-time-dummy-password")
    def __init__(self, session):
        self.repository = UserRepository(session)
        self.clients = ClientRepository(session)
        self.login_attempts = LoginAttemptRepository(session)

    def _key(self, value: str) -> str:
        return hmac.new(jwt_key().encode(), value.encode(), hashlib.sha256).hexdigest()

    def login(self, data, ip_address: str):
        account_key = self._key("account:" + data.email.strip().lower())
        ip_key = self._key("ip:" + (ip_address or "unknown"))
        cutoff = datetime.utcnow() - timedelta(minutes=1)
        account_count = self.login_attempts.count_account_since(account_key, cutoff)
        ip_count = self.login_attempts.count_ip_since(ip_key, cutoff)
        if account_count >= 5 or ip_count >= 20:
            raise LoginRateLimitError
        user = self.repository.get_by_email(data.email)
        valid = verify_password(data.password, user.password_hash if user else self._dummy_hash)
        if not user or not valid or not user.is_active:
            self.login_attempts.record_failure(
                account_key, ip_key, datetime.utcnow() - timedelta(days=1))
            raise InvalidCredentialsError
        self.login_attempts.clear_account(account_key)
        return user, create_access_token(user.id, user.token_version)

    def current_user(self, token):
        try:
            user_id, token_version = decode_access_token(token)
            user = self.repository.get_by_id(user_id)
        except (InvalidTokenError, ValueError, TypeError):
            raise InvalidCredentialsError from None
        if not user or not user.is_active or user.token_version != token_version:
            raise InvalidCredentialsError
        return user

    def register(self, data):
        # Validate JWT configuration before committing a new account.
        create_access_token(0)
        if self.repository.get_by_email(data.email):
            raise UserAlreadyExistsError
        if self.clients.get_by_document(data.document):
            raise DocumentAlreadyExistsError
        user = User(name=data.name, email=data.email,
                    password_hash=hash_password(data.password), role="client", phone=data.phone)
        user.client_profile = Client(
            name=data.company or data.name, cpf_cnpj=data.document,
            email=data.email, phone=data.phone,
            address=f"{data.address.street}, {data.address.number}",
            registration_details={**data.address.model_dump(), "person_type": data.personType,
                                  "company": data.company,
                                  "birth_date": data.birthDate.isoformat() if data.birthDate else None},
        )
        try:
            self.repository.create(user)
        except IntegrityError as error:
            self.repository.rollback()
            raise UserAlreadyExistsError from error
        return user, create_access_token(user.id, user.token_version)

    def logout(self, user):
        user.token_version += 1
        self.repository.save(user)
