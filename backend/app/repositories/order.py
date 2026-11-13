"""Order persistence operations."""

import secrets
from sqlalchemy import select
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session
from app.models.order import Order


class OrderRepository:
    def __init__(self, session: Session):
        self.session = session

    def list(self):
        return list(self.session.scalars(select(Order).order_by(Order.id.desc())).all())

    def list_by_client(self, client_id: int):
        return list(self.session.scalars(select(Order).where(
            Order.client_id == client_id).order_by(Order.id.desc())).all())

    def get(self, order_id: int):
        return self.session.get(Order, order_id)

    def get_by_code(self, code: str):
        return self.session.scalar(select(Order).where(Order.code == code))

    def create(self, order: Order):
        for attempt in range(5):
            if attempt:
                order.code = f"PRP-{secrets.token_hex(6).upper()}"
            self.session.add(order)
            try:
                self.session.commit()
                self.session.refresh(order)
                return order
            except IntegrityError:
                self.session.rollback()
                if attempt == 4:
                    raise

    def save(self, order: Order):
        self.session.commit()
        self.session.refresh(order)
        return order

