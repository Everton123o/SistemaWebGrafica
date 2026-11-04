"""Client repository."""

from sqlalchemy import select, func
from sqlalchemy.orm import Session

from app.models.client import Client


class ClientRepository:
    def __init__(self, session: Session):
        self.session = session

    def list(self) -> list[Client]:
        return list(self.session.scalars(select(Client).order_by(Client.id)))

    def get_by_id(self, client_id: int) -> Client | None:
        return self.session.get(Client, client_id)

    def get_by_document(self, document: str) -> Client | None:
        normalized = Client.cpf_cnpj
        for separator in ('.', '-', '/', ' '):
            normalized = func.replace(normalized, separator, '')
        return self.session.scalar(select(Client).where(normalized == document))

    def create(self, client: Client) -> Client:
        self.session.add(client)
        self.session.commit()
        self.session.refresh(client)
        return client
