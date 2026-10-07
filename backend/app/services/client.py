"""Client application services."""

from sqlalchemy.orm import Session

from app.models.client import Client
from app.repositories.client import ClientRepository
from app.schemas.client import ClientCreate


class ClientService:
    def __init__(self, session: Session):
        self.repository = ClientRepository(session)

    def list(self) -> list[Client]:
        return self.repository.list()

    def create(self, data: ClientCreate) -> Client:
        client = Client(**data.model_dump())
        return self.repository.create(client)
