"""Store user phone numbers managed by the administrator."""
from alembic import op
import sqlalchemy as sa

revision = "b31c4d5e6f70"
down_revision = "a21b3c4d5e6f"
branch_labels = None
depends_on = None


def upgrade():
    op.add_column("users", sa.Column("phone", sa.String(length=30), nullable=False, server_default=""))
    op.alter_column("users", "phone", server_default=None)


def downgrade():
    op.drop_column("users", "phone")
