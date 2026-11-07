# Acesso externo com ngrok

Com dois túneis, crie `frontend/.env` antes de iniciar o Vite:

```env
VITE_API_URL=https://1833-2804-29b8-541a-91dd-38b4-ec21-c597-7ca1.ngrok-free.app 
```

No `backend/.env`, use a origem pública do frontend:

```env
CORS_ORIGINS=["https://a488-2804-29b8-541a-91dd-38b4-ec21-c597-7ca1.ngrok-free.app "]
```

Reinicie o Vite e a API depois de alterar esses arquivos. Nunca configure
`localhost` ou `127.0.0.1` em `VITE_API_URL`, porque o navegador do visitante
resolve esses endereços no computador dele.

Se somente o frontend estiver exposto, deixe `VITE_API_URL` vazio. O Vite usa
`/api` e encaminha internamente para `127.0.0.1:8000`.

O cliente já envia `ngrok-skip-browser-warning` quando `VITE_API_URL` contém
`ngrok`, evitando que a página de aviso do túnel seja interpretada como resposta
da API.
