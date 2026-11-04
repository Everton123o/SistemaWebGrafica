"""User application services."""

from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from app.core.security import hash_password
from app.models.user import User
from app.repositories.user import UserRepository
from app.schemas.user import UserCreate, UserUpdate


class UserAlreadyExistsError(Exception):
    """Raised when a user email is already registered."""


class UserNotFoundError(Exception):
    """Raised when a user does not exist."""


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
            phone=data.phone,
        )
        try:
            return self.repository.create(user)
        except IntegrityError as error:
            self.repository.session.rollback()
            raise UserAlreadyExistsError from error

    def list(self) -> list[User]:
        return self.repository.list()

    def update(self, user_id: int, data: UserUpdate) -> User:
        user = self.repository.get_by_id(user_id)
        if not user:
            raise UserNotFoundError
        values = data.model_dump(exclude_unset=True)
        if "email" in values and values["email"] != user.email:
            if self.repository.get_by_email(values["email"]):
                raise UserAlreadyExistsError
        if "password" in values:
            user.password_hash = hash_password(values.pop("password"))
        for field, value in values.items():
            setattr(user, field, value)
        try:
            return self.repository.save(user)
        except IntegrityError as error:
            self.repository.session.rollback()
            raise UserAlreadyExistsError from error
