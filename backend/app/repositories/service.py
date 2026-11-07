"""Service persistence operations."""

from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.service import Service


class ServiceRepository:
    def __init__(self, session: Session):
        self.session = session

    def list(self):
        return list(self.session.scalars(select(Service).order_by(Service.id.desc())).all())

    def get(self, service_id: int):
        return self.session.get(Service, service_id)

    def create(self, service: Service):
        self.session.add(service)
        self.session.commit()
        self.session.refresh(service)
        return service

    def save(self, service: Service):
        self.session.commit()
        self.session.refresh(service)
        return service
