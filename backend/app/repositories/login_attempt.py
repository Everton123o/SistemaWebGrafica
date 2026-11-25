"""Persistence operations for login throttling records."""
from datetime import datetime
from sqlalchemy import delete, func, select
from sqlalchemy.orm import Session

from app.models.login_attempt import LoginAttempt


class LoginAttemptRepository:
    def __init__(self, session: Session):
        self.session = session

    def count_account_since(self, account_key: str, cutoff: datetime) -> int:
        return self.session.scalar(select(func.count(LoginAttempt.id)).where(
            LoginAttempt.account_key == account_key,
            LoginAttempt.attempted_at >= cutoff,
        )) or 0

    def count_ip_since(self, ip_key: str, cutoff: datetime) -> int:
        return self.session.scalar(select(func.count(LoginAttempt.id)).where(
            LoginAttempt.ip_key == ip_key,
            LoginAttempt.attempted_at >= cutoff,
        )) or 0

    def record_failure(self, account_key: str, ip_key: str, cleanup_cutoff: datetime | None = None) -> None:
        self.session.add(LoginAttempt(account_key=account_key, ip_key=ip_key))
        if cleanup_cutoff is not None:
            self.session.execute(delete(LoginAttempt).where(LoginAttempt.attempted_at < cleanup_cutoff))
        self.session.commit()

    def clear_account(self, account_key: str) -> None:
        self.session.execute(delete(LoginAttempt).where(LoginAttempt.account_key == account_key))
        self.session.commit()

