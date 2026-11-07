"""Admin service catalog endpoints."""

import re

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import DatabaseSession, require_admin
from app.models.service import Service
from app.repositories.service import ServiceRepository
from app.schemas.service import ServiceRead, ServiceWrite

router = APIRouter(prefix="/services", tags=["services"])


def serialize(service):
    return ServiceRead.from_service(service)


def slugify(name):
    return re.sub(r"[^a-z0-9]+", "-", name.lower()).strip("-") or "servico"


@router.get("")
def list_services(session: Session = DatabaseSession):
    return [serialize(item) for item in ServiceRepository(session).list()]


@router.post("", status_code=status.HTTP_201_CREATED, dependencies=[Depends(require_admin)])
def create_service(payload: ServiceWrite, session: Session = DatabaseSession):
    values = payload.to_model_dict()
    base, slug, number = slugify(payload.name), slugify(payload.name), 2
    while session.query(Service).filter(Service.slug == slug).first():
        slug, number = f"{base}-{number}", number + 1
    service = Service(**values, slug=slug)
    return serialize(ServiceRepository(session).create(service))


@router.patch("/{service_id}", dependencies=[Depends(require_admin)])
def update_service(service_id: int, payload: ServiceWrite, session: Session = DatabaseSession):
    repository = ServiceRepository(session)
    service = repository.get(service_id)
    if not service:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Serviço não encontrado.")
    values = payload.to_model_dict()
    for key, value in values.items():
        setattr(service, key, value)
    service.slug = slugify(service.name)
    conflict = session.query(Service).filter(Service.slug == service.slug, Service.id != service.id).first()
    if conflict:
        service.slug = f"{service.slug}-{service.id}"
    return serialize(repository.save(service))
