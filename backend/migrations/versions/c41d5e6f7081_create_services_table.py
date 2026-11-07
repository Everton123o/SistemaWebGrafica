"""Create services table for catalog and dynamic requirements.

Revision ID: c41d5e6f7081
Revises: b31c4d5e6f70
Create Date: 2026-11-06
"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.engine.reflection import Inspector

revision = "c41d5e6f7081"
down_revision = "b31c4d5e6f70"
branch_labels = None
depends_on = None


def upgrade():
    conn = op.get_bind()
    inspector = Inspector.from_engine(conn)
    tables = inspector.get_table_names()

    if "services" not in tables:
        op.create_table(
            "services",
            sa.Column("id", sa.Integer(), nullable=False, primary_key=True),
            sa.Column("name", sa.String(length=150), nullable=False),
            sa.Column("slug", sa.String(length=180), nullable=False, unique=True),
            sa.Column("category", sa.String(length=100), nullable=False),
            sa.Column("description", sa.String(length=1000), nullable=False, server_default=""),
            sa.Column("price_from", sa.Float(), nullable=False, server_default="0"),
            sa.Column("unit", sa.String(length=50), nullable=False, server_default="unidade"),
            sa.Column("delivery_days", sa.Integer(), nullable=False, server_default="1"),
            sa.Column("image", sa.String(length=2048), nullable=False, server_default=""),
            sa.Column("requirements", sa.JSON(), nullable=False),
            sa.Column("rating", sa.Float(), nullable=False, server_default="5"),
            sa.Column("review_count", sa.Integer(), nullable=False, server_default="0"),
            sa.Column("badge", sa.String(length=80), nullable=True),
            sa.Column("popular", sa.Boolean(), nullable=False, server_default=sa.text("0")),
            sa.Column("inactive", sa.Boolean(), nullable=False, server_default=sa.text("0")),
            sa.Column("created_at", sa.DateTime(), server_default=sa.func.now(), nullable=False),
            sa.Column("updated_at", sa.DateTime(), server_default=sa.func.now(), onupdate=sa.func.now(), nullable=False),
        )
        op.create_index("ix_services_slug", "services", ["slug"], unique=True)


def downgrade():
    conn = op.get_bind()
    inspector = Inspector.from_engine(conn)
    tables = inspector.get_table_names()
    if "services" in tables:
        op.drop_table("services")
