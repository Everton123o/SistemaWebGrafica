"""Shared API dependencies."""

from collections.abc import Generator

from fastapi import Depends, HTTPException
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session

from app.core.database import get_db


def database_session() -> Generator[Session, None, None]:
    """Provide a database session to API handlers."""
    yield from get_db()


DatabaseSession = Depends(database_session)

bearer = HTTPBearer(auto_error=False)


def current_user(credentials: HTTPAuthorizationCredentials | None = Depends(bearer),
                 session: Session = DatabaseSession):
    from app.services.auth import AuthService, InvalidCredentialsError
    try:
        if credentials is None:
            raise InvalidCredentialsError
        return AuthService(session).current_user(credentials.credentials)
    except InvalidCredentialsError:
        raise HTTPException(401, "Sessão inválida ou expirada.",
                            headers={"WWW-Authenticate": "Bearer"}) from None


CurrentUser = Depends(current_user)


def require_admin(user=CurrentUser):
    if user.role != "admin":
        raise HTTPException(403, "Acesso restrito ao administrador.")
    return user


def require_staff(user=CurrentUser):
    if user.role not in ("admin", "employee"):
        raise HTTPException(403, "Acesso restrito à equipe.")
    return user
