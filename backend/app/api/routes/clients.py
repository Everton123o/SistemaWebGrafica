"""Client endpoints."""

from fastapi import APIRouter, status
from sqlalchemy.orm import Session

from app.api.dependencies import DatabaseSession
from app.schemas.client import ClientCreate, ClientRead
from app.services.client import ClientService

router = APIRouter(prefix="/clients", tags=["clients"])


@router.post("", response_model=ClientRead, status_code=status.HTTP_201_CREATED)
def create_client(payload: ClientCreate, session: Session = DatabaseSession) -> ClientRead:
    return ClientService(session).create(payload)


@router.get("", response_model=list[ClientRead])
def list_clients(session: Session = DatabaseSession) -> list[ClientRead]:
    return ClientService(session).list()
