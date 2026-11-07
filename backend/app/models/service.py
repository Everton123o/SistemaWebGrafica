"""Persisted print services and their dynamic order requirements."""

from datetime import datetime

from sqlalchemy import Boolean, DateTime, Float, JSON, String, func
from sqlalchemy.orm import Mapped, mapped_column

from app.core.database import Base


class Service(Base):
    __tablename__ = "services"

    id: Mapped[int] = mapped_column(primary_key=True)
    name: Mapped[str] = mapped_column(String(150), nullable=False)
    slug: Mapped[str] = mapped_column(String(180), nullable=False, unique=True)
    category: Mapped[str] = mapped_column(String(100), nullable=False)
    description: Mapped[str] = mapped_column(String(1000), nullable=False, default="")
    price_from: Mapped[float] = mapped_column(Float, nullable=False, default=0)
    unit: Mapped[str] = mapped_column(String(50), nullable=False, default="unidade")
    delivery_days: Mapped[int] = mapped_column(nullable=False, default=1)
    image: Mapped[str] = mapped_column(String(2048), nullable=False, default="")
    requirements: Mapped[dict] = mapped_column(JSON, nullable=False, default=dict)
    rating: Mapped[float] = mapped_column(Float, nullable=False, default=5)
    review_count: Mapped[int] = mapped_column(nullable=False, default=0)
    badge: Mapped[str] = mapped_column(String(80), nullable=True)
    popular: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    inactive: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)
