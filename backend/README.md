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

## Autenticação integrada

Configure `DATABASE_URL` e `JWT_SECRET` no `.env`. Gere um segredo aleatório
com `python -c "import secrets; print(secrets.token_urlsafe(48))"`.
Antes de iniciar a API, execute `alembic upgrade head`.

- `POST /auth/register`: cria usuário com perfil `client` e cliente na mesma
  transação, valida os dados e retorna JWT. Os campos seguem o formulário:
  `name`, `email`, `password`, `personType`, `document`, `company`, `birthDate`,
  `phone`, `address` (cep, street, number, complement, district, city, state).
- `POST /auth/login`: recebe JSON com `email` e `password`.
- `GET /auth/me`: exige `Authorization: Bearer <token>` e consulta o usuário
  ativo no banco. O papel é sempre obtido do banco.
- `POST /users`: exige administrador; `GET/POST /clients`: exigem equipe.

O cadastro público nunca cria administradores ou funcionários. Contas desses
perfis devem ser provisionadas por um administrador existente.

Para criar o primeiro administrador, execute a partir de `backend`:

```powershell
python -m scripts.create_initial_admin
```

O script pede a senha sem exibi-la, cria somente o e-mail ainda inexistente e
armazena apenas o hash. Para automação, use `INITIAL_ADMIN_EMAIL`,
`INITIAL_ADMIN_NAME` e `INITIAL_ADMIN_PASSWORD` no ambiente, sem versionar esses
valores.
Os tokens expiram em `JWT_EXPIRE_MINUTES` (30 por padrão). O logout remove o
token do navegador; tokens já emitidos permanecem válidos até sua expiração.

A migration `a21b3c4d5e6f` adiciona `clients.registration_details` (JSON nullable)
para preservar endereço completo, tipo de pessoa, razão social e nascimento.
Não altera os dados dos clientes existentes.

Os testes de integração usam banco SQLite isolado, sem tocar no MySQL real.
`httpx` é usado pelo TestClient. Recuperação de senha e OAuth não estão implementados.
