"""Orders and order tracking persistence model."""

from datetime import datetime
from sqlalchemy import Boolean, DateTime, Float, ForeignKey, Integer, JSON, String, func
from sqlalchemy.orm import Mapped, mapped_column, relationship

from app.core.database import Base


class Order(Base):
    __tablename__ = "orders"

    id: Mapped[int] = mapped_column(primary_key=True)
    code: Mapped[str] = mapped_column(String(50), nullable=False, unique=True, index=True)
    client_id: Mapped[int] = mapped_column(ForeignKey("clients.id"), nullable=True)
    client_name: Mapped[str] = mapped_column(String(150), nullable=False)
    client_email: Mapped[str] = mapped_column(String(255), nullable=False, default="")
    client_phone: Mapped[str] = mapped_column(String(30), nullable=False, default="")
    client_company: Mapped[str] = mapped_column(String(150), nullable=True)
    
    service_id: Mapped[int] = mapped_column(ForeignKey("services.id"), nullable=True)
    service_name: Mapped[str] = mapped_column(String(150), nullable=False)
    
    status: Mapped[str] = mapped_column(String(50), nullable=False, default="EM_ANALISE")
    deadline: Mapped[str] = mapped_column(String(50), nullable=True)
    total_value: Mapped[float] = mapped_column(Float, nullable=False, default=0.0)
    
    specs: Mapped[dict] = mapped_column(JSON, nullable=False, default=dict)
    timeline: Mapped[list] = mapped_column(JSON, nullable=False, default=list)
    art_versions: Mapped[list] = mapped_column(JSON, nullable=False, default=list)
    quotation: Mapped[dict] = mapped_column(JSON, nullable=False, default=dict)
    observations: Mapped[str] = mapped_column(String(1000), nullable=False, default="")
    production_stage: Mapped[str] = mapped_column(String(100), nullable=True)

    created_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), nullable=False)
    updated_at: Mapped[datetime] = mapped_column(DateTime, server_default=func.now(), onupdate=func.now(), nullable=False)

