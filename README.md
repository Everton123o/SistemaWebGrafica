# Sistema Web para Gráfica

Aplicação com API em FastAPI e interface em React com Vite.

## Pré-requisitos

- Python instalado
- Node.js e npm instalados
- MySQL em execução e um banco de dados criado para a aplicação

## Backend

No PowerShell, a partir da raiz do repositório:

```powershell
cd backend
python -m venv .venv
.venv\Scripts\Activate.ps1
pip install -r requirements.txt
Copy-Item .env.example .env
```

Edite `backend/.env` e configure `DATABASE_URL` para apontar ao seu banco MySQL. Em seguida, inicie a API:

```powershell
uvicorn app.main:app --reload
```

A API ficará disponível em `http://127.0.0.1:8000`. A documentação interativa do FastAPI pode ser acessada em `http://127.0.0.1:8000/docs`.

Para ativar o ambiente virtual novamente em outro terminal, execute `cd backend` e depois `.venv\Scripts\Activate.ps1` antes de iniciar a API.

## Frontend

Abra outro terminal na raiz do repositório e execute:

```powershell
cd frontend
npm install
npm run dev
```

O Vite exibirá no terminal o endereço local para abrir a interface no navegador (normalmente `http://localhost:5173`). Mantenha os dois terminais abertos para usar a aplicação com a API.
