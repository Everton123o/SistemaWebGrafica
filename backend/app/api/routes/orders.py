"""Order endpoints with ownership checks and server-owned commercial fields."""

import logging
import math
import secrets
from datetime import date, timedelta

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import CurrentUser, DatabaseSession, require_staff
from app.models.order import Order
from app.models.service import Service
from app.models.user import User
from app.repositories.order import OrderRepository
from app.schemas.order import OrderClientUpdate, OrderCreate, OrderRead, OrderStaffUpdate

router = APIRouter(prefix="/orders", tags=["orders"])
audit = logging.getLogger("audit.orders")


def serialize(order: Order):
    return OrderRead.from_order(order)


def calculate_price(service: Service, specs: dict) -> float:
    """The sole source of truth for order estimates persisted by the API."""
    try:
        quantity_value = specs.get("quantidade", 1)
        quantity = int(quantity_value)
        if float(quantity_value) != quantity:
            raise ValueError
        if quantity < 1 or quantity > 100000:
            raise ValueError
        for dimension in ("largura", "altura"):
            if dimension in specs:
                value = float(specs[dimension])
                if not 0 < value <= 100000:
                    raise ValueError
        if service.category == "Comunicação Visual" and specs.get("largura") and specs.get("altura"):
            total = (float(specs["largura"]) / 100) * (float(specs["altura"]) / 100) * 45 * quantity
        elif service.category == "Brindes & Copos":
            total = quantity * 2.8
        elif quantity > 1:
            factor = 1.6 if quantity >= 1000 else 1 if quantity >= 500 else .75 if quantity >= 250 else .5
            total = service.price_from * factor
        else:
            total = service.price_from
        if "Verniz Localizado" in str(specs.get("acabamento", "")):
            total += 35
        if not all(isinstance(value, (str, int, float)) and len(str(value)) <= 200 for value in specs.values()):
            raise ValueError
        if not math.isfinite(total):
            raise ValueError
        return round(max(15, total), 2)
    except (TypeError, ValueError, OverflowError):
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, "Especificações inválidas.") from None


@router.get("")
def list_orders(session: Session = DatabaseSession, current_user: User = CurrentUser):
    repo = OrderRepository(session)
    if current_user.role == "client":
        if not current_user.client_profile:
            return []
        orders = repo.list_by_client(current_user.client_profile.id)
    else:
        orders = repo.list()
    return [serialize(order) for order in orders]


@router.post("", status_code=status.HTTP_201_CREATED)
def create_order(payload: OrderCreate, session: Session = DatabaseSession, current_user: User = CurrentUser):
    if current_user.role != "client" or not current_user.client_profile:
        raise HTTPException(status.HTTP_403_FORBIDDEN, "Apenas clientes podem criar pedidos.")
    service = session.get(Service, payload.service_id)
    if not service or service.inactive:
        raise HTTPException(status.HTTP_422_UNPROCESSABLE_ENTITY, "Serviço inválido.")
    price = calculate_price(service, payload.specs)
    order = Order(
        code=f"PRP-{secrets.token_hex(6).upper()}", client_id=current_user.client_profile.id,
        client_name=current_user.name, client_email=current_user.email,
        client_phone=current_user.phone or "", client_company=current_user.client_profile.name,
        service_id=service.id, service_name=service.name, status="EM_ANALISE",
        deadline=(date.today() + timedelta(days=service.delivery_days)).isoformat(),
        total_value=price, specs=payload.specs, timeline=[{
            "step": "Pedido Criado", "author": current_user.name, "done": True,
        }], art_versions=[], quotation={}, observations=payload.observations,
    )
    return serialize(OrderRepository(session).create(order))


@router.post("/{order_id}/corrections")
def submit_correction(order_id: int, payload: OrderClientUpdate,
                      session: Session = DatabaseSession, current_user: User = CurrentUser):
    repo = OrderRepository(session)
    order = repo.get(order_id)
    if (current_user.role != "client" or not current_user.client_profile or not order
            or order.client_id != current_user.client_profile.id):
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Pedido não encontrado.")
    for key, value in payload.model_dump(exclude_unset=True).items():
        setattr(order, key, value)
    return serialize(repo.save(order))


@router.patch("/{order_id}", dependencies=[Depends(require_staff)])
def update_order(order_id: int, payload: OrderStaffUpdate,
                 session: Session = DatabaseSession, current_user: User = CurrentUser):
    repo = OrderRepository(session)
    order = repo.get(order_id)
    if not order:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Pedido não encontrado.")
    changes = payload.model_dump(exclude_unset=True)
    for key, value in changes.items():
        setattr(order, key, value)
    updated = repo.save(order)
    audit.info("order_updated actor_id=%s order_id=%s fields=%s", current_user.id, order.id, sorted(changes))
    return serialize(updated)
