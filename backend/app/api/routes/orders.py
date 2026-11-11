"""Order management endpoints."""

from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.api.dependencies import CurrentUser, DatabaseSession
from app.models.order import Order
from app.models.user import User
from app.repositories.order import OrderRepository
from app.schemas.order import OrderRead, OrderWrite

router = APIRouter(prefix="/orders", tags=["orders"])


def serialize(order: Order):
    return OrderRead.from_order(order)


@router.get("")
def list_orders(session: Session = DatabaseSession, current_user: User = CurrentUser):
    repo = OrderRepository(session)
    orders = repo.list()
    # Clientes veem seus próprios pedidos; equipe/admin veem todos
    if current_user.role == "client":
        orders = [o for o in orders if o.client_email == current_user.email]
    return [serialize(o) for o in orders]


@router.post("", status_code=status.HTTP_201_CREATED)
def create_order(payload: OrderWrite, session: Session = DatabaseSession, current_user: User = CurrentUser):
    repo = OrderRepository(session)
    count = len(repo.list()) + 1
    code = f"PRP-{1040 + count}"
    
    values = payload.to_model_dict()
    values["code"] = code
    if current_user.role == "client":
        values["client_name"] = current_user.name
        values["client_email"] = current_user.email

    order = Order(**values)
    return serialize(repo.create(order))


@router.patch("/{order_id}")
def update_order(order_id: int, payload: dict, session: Session = DatabaseSession, current_user: User = CurrentUser):
    repo = OrderRepository(session)
    order = repo.get(order_id)
    if not order:
        raise HTTPException(status.HTTP_404_NOT_FOUND, "Pedido não encontrado.")

    # Mapear chaves camelCase para snake_case
    key_map = {
        "clientName": "client_name",
        "clientEmail": "client_email",
        "clientPhone": "client_phone",
        "clientCompany": "client_company",
        "serviceId": "service_id",
        "serviceName": "service_name",
        "totalValue": "total_value",
        "artVersions": "art_versions",
        "productionStage": "production_stage"
    }
    for k, v in payload.items():
        attr = key_map.get(k, k)
        if hasattr(order, attr):
            setattr(order, attr, v)

    return serialize(repo.save(order))

