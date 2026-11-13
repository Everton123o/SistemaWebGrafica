"""Hashed identifiers used for database-backed login throttling."""
from datetime import datetime
from sqlalchemy import DateTime, Integer, String, func
from sqlalchemy.orm import Mapped, mapped_column
from app.core.database import Base


class LoginAttempt(Base):
    __tablename__ = "login_attempts"
    id: Mapped[int] = mapped_column(Integer, primary_key=True)
    account_key: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    ip_key: Mapped[str] = mapped_column(String(64), nullable=False, index=True)
    attempted_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, server_default=func.now(), index=True)
