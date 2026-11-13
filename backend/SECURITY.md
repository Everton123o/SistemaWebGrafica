# Segurança da API

## Aplicar as mudanças

Instale as dependências do backend e aplique todas as migrações:

```powershell
pip install -r requirements.txt
alembic upgrade head
```

Defina `JWT_SECRET` com um valor aleatório de pelo menos 32 bytes, `TRUSTED_HOSTS`
com os hosts públicos da API e `CORS_ORIGINS` com as origens exatas do frontend.
Em produção, publique frontend e API sob a mesma origem HTTPS e configure o proxy
para enviar `X-Forwarded-Proto: https`. A sessão usa cookies `SameSite=Strict`.

## Login e limitação de tentativas

O servidor permite até cinco falhas por conta e vinte por endereço IP em uma
janela de um minuto. Os identificadores são armazenados como HMAC na tabela
`login_attempts`; falhas antigas são removidas durante tentativas subsequentes.\n