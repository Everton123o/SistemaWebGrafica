"""Order persistence operations."""

from sqlalchemy import select
from sqlalchemy.orm import Session
from app.models.order import Order


class OrderRepository:
    def __init__(self, session: Session):
        self.session = session

    def list(self):
        return list(self.session.scalars(select(Order).order_by(Order.id.desc())).all())

    def get(self, order_id: int):
        return self.session.get(Order, order_id)

    def get_by_code(self, code: str):
        return self.session.scalar(select(Order).where(Order.code == code))

    def create(self, order: Order):
        self.session.add(order)
        self.session.commit()
        self.session.refresh(order)
        return order

    def save(self, order: Order):
        self.session.commit()
        self.session.refresh(order)
        return order

