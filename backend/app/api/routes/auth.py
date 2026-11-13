"""Public authentication endpoints."""
import secrets
from fastapi import APIRouter, HTTPException, Request, Response
from sqlalchemy.orm import Session

from app.api.dependencies import DatabaseSession, CurrentUser
from app.core.config import get_settings
from app.schemas.auth import LoginRequest, RegisterRequest, AuthResponse
from app.schemas.user import UserRead
from app.services.auth import AuthService, InvalidCredentialsError, DocumentAlreadyExistsError, LoginRateLimitError
from app.services.user import UserAlreadyExistsError

router = APIRouter(prefix="/auth", tags=["auth"])


def response(result, request: Request, response: Response):
    user, token = result
    settings = get_settings()
    csrf_token = secrets.token_urlsafe(32)
    max_age = settings.jwt_expire_minutes * 60
    secure = request.url.scheme == "https" or request.headers.get("x-forwarded-proto", "").lower() == "https"
    response.set_cookie("printpro_access", token, max_age=max_age, httponly=True,
                        secure=secure, samesite="strict", path="/")
    response.set_cookie("printpro_csrf", csrf_token, max_age=max_age, httponly=False,
                        secure=secure, samesite="strict", path="/")
    return AuthResponse(user=UserRead.model_validate(user), csrf_token=csrf_token,
                        expires_in=max_age)


@router.post("/login", response_model=AuthResponse)
def login(payload: LoginRequest, request: Request, response_obj: Response, session: Session = DatabaseSession):
    try:
        result = AuthService(session).login(payload, request.client.host if request.client else "unknown")
        return response(result, request, response_obj)
    except LoginRateLimitError:
        raise HTTPException(429, "Muitas tentativas. Aguarde um minuto e tente novamente.", headers={"Retry-After": "60"}) from None
    except InvalidCredentialsError:
        raise HTTPException(401, "E-mail ou senha inválidos, ou conta desativada.",
                            headers={}) from None


@router.post("/register", response_model=AuthResponse, status_code=201)
def register(payload: RegisterRequest, request: Request, response_obj: Response, session: Session = DatabaseSession):
    try:
        return response(AuthService(session).register(payload), request, response_obj)
    except UserAlreadyExistsError:
        raise HTTPException(409, "Já existe um usuário com este e-mail.") from None
    except DocumentAlreadyExistsError:
        raise HTTPException(409, "Já existe um cliente com este CPF/CNPJ.") from None


@router.get("/me", response_model=UserRead)
def me(user=CurrentUser):
    return user


@router.post("/logout", status_code=204)
def logout(response: Response, user=CurrentUser, session: Session = DatabaseSession):
    AuthService(session).logout(user)
    response.delete_cookie("printpro_access", path="/", samesite="strict")
    response.delete_cookie("printpro_csrf", path="/", samesite="strict")
