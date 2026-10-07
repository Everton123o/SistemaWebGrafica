"""User application services."""

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.user import User
from app.repositories.user import UserRepository
from app.schemas.user import UserCreate


class UserAlreadyExistsError(Exception):
    """Raised when a user email is already registered."""


class UserService:
    def __init__(self, session: Session):
        self.repository = UserRepository(session)

    def create(self, data: UserCreate) -> User:
        if self.repository.get_by_email(str(data.email)):
            raise UserAlreadyExistsError

        user = User(
            name=data.name,
            email=str(data.email),
            password_hash=hash_password(data.password),
            role=data.role,
        )
        try:
            return self.repository.create(user)
        except IntegrityError as error:
            self.repository.session.rollback()
            raise UserAlreadyExistsError from error
