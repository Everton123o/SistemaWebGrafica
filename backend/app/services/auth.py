"""Authentication and atomic customer registration."""
from jose import JWTError
from sqlalchemy.exc import IntegrityError

from app.core.security import create_access_token, decode_access_token, hash_password, verify_password
from app.models.user import User
from app.models.client import Client
from app.repositories.user import UserRepository
from app.repositories.client import ClientRepository
from app.services.user import UserAlreadyExistsError


class InvalidCredentialsError(Exception):
    pass


class DocumentAlreadyExistsError(Exception):
    pass


class AuthService:
    def __init__(self, session):
        self.repository = UserRepository(session)
        self.clients = ClientRepository(session)

    def login(self, data):
        user = self.repository.get_by_email(data.email)
        if not user or not verify_password(data.password, user.password_hash) or not user.is_active:
            raise InvalidCredentialsError
        return user, create_access_token(user.id)

    def current_user(self, token):
        try:
            user = self.repository.get_by_id(decode_access_token(token))
        except (JWTError, ValueError, TypeError):
            raise InvalidCredentialsError from None
        if not user or not user.is_active:
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
        return user, create_access_token(user.id)
