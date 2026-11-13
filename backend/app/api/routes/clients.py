"""Client endpoints."""

from fastapi import APIRouter, Depends, HTTPException, Query, status
from sqlalchemy.orm import Session

from app.api.dependencies import DatabaseSession, require_staff
from app.schemas.client import ClientCreate, ClientRead
from app.services.client import ClientService

router = APIRouter(prefix="/clients", tags=["clients"], dependencies=[Depends(require_staff)])


@router.post("", response_model=ClientRead, status_code=status.HTTP_201_CREATED)
def create_client(payload: ClientCreate, session: Session = DatabaseSession) -> ClientRead:
    try:
        return ClientService(session).create(payload)
    except ValueError as error:
        raise HTTPException(status.HTTP_409_CONFLICT, str(error)) from error


@router.get("", response_model=list[ClientRead])
def list_clients(session: Session = DatabaseSession, offset: int = Query(0, ge=0),
                 limit: int = Query(50, ge=1, le=100), user=Depends(require_staff)) -> list[ClientRead]:
    clients = ClientService(session).repository.list(limit=limit, offset=offset)
    result = [ClientRead.model_validate(client) for client in clients]
    if user.role != "admin":
        for item in result:
            item.cpf_cnpj = "***" + item.cpf_cnpj[-4:]
    return result
