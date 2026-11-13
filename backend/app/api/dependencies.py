"""Shared API dependencies."""

from collections.abc import Generator

from fastapi import Depends, HTTPException, Request
from sqlalchemy.orm import Session

from app.core.database import get_db


def database_session() -> Generator[Session, None, None]:
    """Provide a database session to API handlers."""
    yield from get_db()


DatabaseSession = Depends(database_session)

def current_user(request: Request, session: Session = DatabaseSession):
    from app.services.auth import AuthService, InvalidCredentialsError
    try:
        token = request.cookies.get("printpro_access")
        if not token:
            raise InvalidCredentialsError
        user = AuthService(session).current_user(token)
        return user
    except InvalidCredentialsError:
        raise HTTPException(401, "Sessão inválida ou expirada.",
                            headers={}) from None


CurrentUser = Depends(current_user)
get_current_user = current_user


def require_admin(user=CurrentUser):
    if user.role != "admin":
        raise HTTPException(403, "Acesso restrito ao administrador.")
    return user


def require_staff(user=CurrentUser):
    if user.role not in ("admin", "employee"):
        raise HTTPException(403, "Acesso restrito à equipe.")
    return user
