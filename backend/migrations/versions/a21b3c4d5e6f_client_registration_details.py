"""Preserve customer registration details without changing existing profiles."""
from alembic import op
import sqlalchemy as sa

revision = "a21b3c4d5e6f"
down_revision = "eee41ee648b7"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("clients", sa.Column("registration_details", sa.JSON(), nullable=True))


def downgrade():
    op.drop_column("clients", "registration_details")
