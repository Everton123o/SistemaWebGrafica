# Backend

Estrutura inicial do backend do Sistema Web para Gráfica.

## Tecnologias

Python, FastAPI, SQLAlchemy ORM, MySQL, Pydantic, JWT, Alembic e pytest.

## Ambiente local

No diretório `backend`, crie e ative um ambiente virtual:

```bash
python -m venv .venv
# Windows PowerShell
.venv\Scripts\Activate.ps1
# Linux/macOS
source .venv/bin/activate
```

Instale as dependências:

```bash
pip install -r requirements.txt
```

Copie `.env.example` para `.env` e preencha as variáveis de ambiente
necessárias para o seu ambiente local. Não versionar o arquivo `.env`.

## Executar a API

```bash
uvicorn app.main:app --reload
```

## Executar os testes

```bash
pytest
```

Esta etapa contém somente a estrutura inicial. Funcionalidades de negócio,
entidades, rotas e migrações serão adicionadas em tarefas posteriores.
