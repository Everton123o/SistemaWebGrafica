"""Backfill order ownership and enforce unique client documents."""
from alembic import op
import sqlalchemy as sa

revision = "f41a5b6c7d8e"
down_revision = "d51e6f708192"
branch_labels = None
depends_on = None


def upgrade():
    connection = op.get_bind()
    connection.execute(sa.text(
        "UPDATE orders SET client_id = (SELECT clients.id FROM clients "
        "WHERE lower(clients.email) = lower(orders.client_email) "
        "ORDER BY clients.id LIMIT 1) WHERE client_id IS NULL"
    ))
    op.create_index("ix_orders_client_id", "orders", ["client_id"], unique=False)
    op.create_index("ix_clients_cpf_cnpj", "clients", ["cpf_cnpj"], unique=True)


def downgrade():
    op.drop_index("ix_clients_cpf_cnpj", table_name="clients")
    op.drop_index("ix_orders_client_id", table_name="orders")
