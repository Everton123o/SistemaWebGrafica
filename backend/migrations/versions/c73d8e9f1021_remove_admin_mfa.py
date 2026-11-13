"""Remove unused administrator MFA fields."""
from alembic import op
import sqlalchemy as sa

revision = "c73d8e9f1021"
down_revision = "b62c7d8e9f10"
branch_labels = None
depends_on = None


def upgrade():
    columns = {column["name"] for column in sa.inspect(op.get_bind()).get_columns("users")}
    if "mfa_enabled" in columns:
        op.drop_column("users", "mfa_enabled")
    if "mfa_secret" in columns:
        op.drop_column("users", "mfa_secret")


def downgrade():
    columns = {column["name"] for column in sa.inspect(op.get_bind()).get_columns("users")}
    if "mfa_secret" not in columns:
        op.add_column("users", sa.Column("mfa_secret", sa.String(length=64), nullable=True))
    if "mfa_enabled" not in columns:
        op.add_column("users", sa.Column("mfa_enabled", sa.Boolean(), nullable=False, server_default=sa.false()))
