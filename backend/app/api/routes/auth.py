"""Public authentication endpoints."""
from fastapi import APIRouter, HTTPException
from sqlalchemy.orm import Session

from app.api.dependencies import DatabaseSession, CurrentUser
from app.core.config import get_settings
from app.schemas.auth import LoginRequest, RegisterRequest, AuthResponse
from app.schemas.user import UserRead
from app.services.auth import AuthService, InvalidCredentialsError, DocumentAlreadyExistsError
from app.services.user import UserAlreadyExistsError

router = APIRouter(prefix="/auth", tags=["auth"])


def response(result):
    user, token = result
    return AuthResponse(user=UserRead.model_validate(user), access_token=token,
                        expires_in=get_settings().jwt_expire_minutes * 60)


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, session: Session = DatabaseSession):
    try:
        return response(AuthService(session).login(payload))
    except InvalidCredentialsError:
        raise HTTPException(401, "E-mail ou senha inválidos, ou conta desativada.",
                            headers={"WWW-Authenticate": "Bearer"}) from None


@router.post("/register", response_model=AuthResponse, status_code=201)
def register(payload: RegisterRequest, session: Session = DatabaseSession):
    try:
        return response(AuthService(session).register(payload))
    except UserAlreadyExistsError:
        raise HTTPException(409, "Já existe um usuário com este e-mail.") from None
    except DocumentAlreadyExistsError:
        raise HTTPException(409, "Já existe um cliente com este CPF/CNPJ.") from None


@router.get("/me", response_model=UserRead)
def me(user=CurrentUser):
    return user
