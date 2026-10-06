"""User endpoints."""

from fastapi import APIRouter, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import DatabaseSession
from app.schemas.user import UserCreate, UserRead
from app.services.user import UserAlreadyExistsError, UserService

router = APIRouter(prefix="/users", tags=["users"])


@router.post("", response_model=UserRead, status_code=status.HTTP_201_CREATED)
def create_user(payload: UserCreate, session: Session = DatabaseSession) -> UserRead:
    try:
        return UserService(session).create(payload)
    except UserAlreadyExistsError as error:
        raise HTTPException(
            status_code=status.HTTP_409_CONFLICT,
            detail="Já existe um usuário com este e-mail.",
        ) from error
