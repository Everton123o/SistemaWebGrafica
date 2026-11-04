"""User endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import DatabaseSession, require_admin
from app.schemas.user import UserCreate, UserRead, UserUpdate
from app.services.user import UserAlreadyExistsError, UserNotFoundError, UserService

router = APIRouter(prefix="/users", tags=["users"], dependencies=[Depends(require_admin)])


@router.get("", response_model=list[UserRead])
def list_users(session: Session = DatabaseSession) -> list[UserRead]:
    return UserService(session).list()


@router.post("", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_user(payload: UserCreate, session: Session = DatabaseSession) -> UserRead:
    try:
        return UserService(session).create(payload)
    except UserAlreadyExistsError as error:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Já existe um usuário com este e-mail.",
        ) from error


@router.patch("/{user_id}", response_model=UserRead)
def update_user(user_id: int, payload: UserUpdate, session: Session = DatabaseSession) -> UserRead:
    try:
        return UserService(session).update(user_id, payload)
    except UserNotFoundError:
        raise HTTPException(status_code=404, detail="Usuário não encontrado.") from None
    except UserAlreadyExistsError:
        raise HTTPException(status_code=409, detail="Já existe um usuário com este e-mail.") from None
