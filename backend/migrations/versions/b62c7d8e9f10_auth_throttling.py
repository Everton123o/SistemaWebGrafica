"""Add shared database-backed login throttling."""
from alembic import op
import sqlalchemy as sa

revision = "b62c7d8e9f10"
down_revision = "a51b6c7d8e9f"
branch_labels = None
depends_on = None


def upgrade():
    op.create_table(
        "login_attempts",
        sa.Column("id", sa.Integer(), primary_key=True),
        sa.Column("account_key", sa.String(length=64), nullable=False),
        sa.Column("ip_key", sa.String(length=64), nullable=False),
        sa.Column("attempted_at", sa.DateTime(), nullable=False, server_default=sa.func.now()),
    )
    op.create_index("ix_login_attempts_account_key", "login_attempts", ["account_key"])
    op.create_index("ix_login_attempts_ip_key", "login_attempts", ["ip_key"])
    op.create_index("ix_login_attempts_attempted_at", "login_attempts", ["attempted_at"])


def downgrade():
    op.drop_table("login_attempts")
