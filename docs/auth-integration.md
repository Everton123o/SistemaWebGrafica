# Integração de autenticação

Inicie a API em `127.0.0.1:8000` a partir de `backend`:

```powershell
.\.venv\Scripts\python.exe -m alembic upgrade head
.\.venv\Scripts\python.exe -m uvicorn app.main:app --reload
```

Em outro terminal, a partir de `frontend`, execute `npm.cmd run dev`.
O Vite encaminha `/api` para a API, sem necessidade de CORS em desenvolvimento.
Em produção, configure um proxy equivalente removendo o prefixo `/api`, ou
defina `VITE_API_URL` na compilação e `CORS_ORIGINS` no backend como array JSON
das origens autorizadas. Use HTTPS.

O JWT fica em `sessionStorage` da aba. A interface consulta `/auth/me` ao
recarregar, encerra a sessão ao expirar e limpa o token no logout ou resposta 401.
Sessões mockadas antigas não são aceitas. Não há contas de demonstração para login.

| Funcionalidade | Ator | Tela | Integrada |
|---|---|---|---|
| Login com senha e JWT | Todos | Login | Sim |
| Cadastro com persistência de usuário e cliente | Cliente | Cadastro | Sim |
| Restauração, expiração e saída da sessão | Todos | Aplicação | Sim |
| Acesso conforme perfil retornado pela API | Todos | Painéis | Sim |
| Recuperação de senha e login social | Todos | Login | Não; informados como indisponíveis |

Pedidos, catálogo e gerenciamento visual de usuários/clientes continuam usando
os mocks existentes, fora do escopo desta integração. Criar um usuário no painel
mockado não cria uma conta para login; use o cadastro público ou a API autorizada.

O gerenciador de usuários cria apenas administradores e responsáveis da gráfica.
Contas de clientes são criadas pelo cadastro público junto com seu perfil de
cliente; contas `client` existentes continuam visíveis para consulta.

Verificações: `python -m pytest` no backend; `npm.cmd test`, `npm.cmd run build`
e `npm.cmd run lint` no frontend.
