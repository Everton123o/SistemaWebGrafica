# Sistema Web para Gráfica — Arquitetura e conceitos

Este documento registra as decisões técnicas do projeto e serve como apoio para a apresentação. Ele deve ser atualizado sempre que um novo módulo ou conceito for implementado.

## 1. Objetivo do sistema

O sistema será uma aplicação web para gerenciamento de uma gráfica. O backend expõe uma API para ser consumida futuramente pelo frontend em React.

## 2. Tecnologias utilizadas

- **Python:** linguagem do backend.
- **FastAPI:** framework utilizado para criar a API HTTP.
- **SQLAlchemy ORM:** mapeamento entre classes Python e tabelas do banco.
- **MySQL:** banco de dados relacional.
- **Alembic:** controle de migrations e evolução da estrutura do banco.
- **Pydantic:** validação dos dados recebidos e enviados pela API.
- **JWT:** tecnologia planejada para autenticação e autorização.
- **pytest:** testes automatizados.
- **React e Tailwind CSS:** tecnologias previstas para o frontend.

## 3. Arquitetura adotada

O projeto utiliza uma **Clean Architecture simplificada**, com separação por responsabilidades:

```text
React
  ↓
Router / API
  ↓
Service
  ↓
Repository
  ↓
SQLAlchemy ORM
  ↓
MySQL
```

### Router / API

Recebe requisições HTTP, valida os schemas, chama o Service e transforma o resultado em resposta HTTP. A camada não deve conter regras complexas de negócio.

Exemplos atuais:

- `POST /users`
- `POST /clients`
- `GET /clients`

### Service Layer

Contém os casos de uso e as regras de negócio. Por exemplo, o `UserService` verifica se o e-mail já está cadastrado e transforma a senha em hash antes de persistir o usuário.

### Repository Pattern

Isola o acesso ao banco. Os repositories utilizam SQLAlchemy para consultar e persistir os models, sem colocar regras de negócio nessa camada.

### Models

Representam as entidades persistidas no banco. Atualmente existem:

- `User`: usuário do sistema, com nome, e-mail, senha protegida, papel e status.
- `Client`: cliente da gráfica, com nome, CPF/CNPJ, telefone, e-mail e endereço.

### Schemas / DTOs

São os objetos usados para validar e serializar dados da API. Eles impedem, por exemplo, que `password_hash` seja retornado nas respostas públicas de usuário.

### Core

Concentra configurações, conexão com banco e recursos de segurança compartilhados.

## 4. Padrões de projeto utilizados

### Service Layer

Organiza os casos de uso em serviços próprios. Isso evita colocar regras de negócio diretamente nos endpoints e facilita os testes.

### Repository Pattern

Abstrai a persistência. O Service não precisa conhecer detalhes de consultas SQLAlchemy; ele conversa com o Repository.

### Dependency Injection

O FastAPI injeta a sessão do banco nos endpoints por meio de dependências. Isso reduz acoplamento e facilita substituir a sessão por uma sessão de teste.

### Data Mapper / ORM

O SQLAlchemy faz o mapeamento entre os objetos Python e as tabelas do MySQL. A aplicação não executa SQL manual para as operações de negócio.

### Migrations

O Alembic registra alterações estruturais do banco em arquivos versionados. Assim, a estrutura pode ser recriada e atualizada de forma controlada.

## 5. Relação com SOLID

### S — Single Responsibility Principle

Cada camada possui uma responsabilidade principal:

- Router: HTTP.
- Service: regras de negócio.
- Repository: persistência.
- Model: entidade do banco.
- Schema: validação e serialização.

### O — Open/Closed Principle

Novos módulos podem ser adicionados criando novos routers, services, repositories, models e schemas, sem concentrar tudo em uma única classe ou arquivo.

### L — Liskov Substitution Principle

Ainda não existe uma hierarquia complexa de classes no projeto. O princípio será aplicado caso sejam criadas abstrações ou implementações substituíveis.

### I — Interface Segregation Principle

Os componentes são pequenos e específicos. Os endpoints de usuário não dependem dos detalhes dos endpoints de cliente, por exemplo.

### D — Dependency Inversion Principle

A API depende de uma dependência de sessão, e os Services recebem uma sessão em vez de criarem diretamente uma conexão global. Isso facilita testes e reduz acoplamento com a infraestrutura.

## 6. Segurança

- Senhas não são armazenadas em texto puro.
- O hash utiliza PBKDF2 com salt aleatório por senha.
- O segredo JWT será lido por variável de ambiente.
- Arquivos `.env` não são versionados.
- Schemas de resposta não expõem o hash da senha.
- A autenticação JWT e a autorização por papel ainda serão implementadas antes de considerar endpoints administrativos prontos para produção.

## 7. Banco de dados e migrations

As tabelas atuais são criadas pela migration:

```text
migrations/versions/eee41ee648b7_create_users_and_clients.py
```

Para aplicar migrations:

```powershell
alembic upgrade head
```

Para criar uma nova migration depois de alterar os models:

```powershell
alembic revision --autogenerate -m "descricao da alteracao"
alembic upgrade head
```

## 8. Testes

Os testes são executados com pytest:

```powershell
python -m pytest -q
```

Atualmente existem testes para:

- configuração obrigatória do banco;
- hash e verificação de senha.

Novos módulos devem receber testes para regras de negócio, validações, persistência e autorização conforme forem implementados.

## 9. Como explicar o fluxo de uma requisição

Exemplo: criação de usuário.

1. O cliente envia `POST /users`.
2. O Router recebe a requisição e o Pydantic valida o corpo.
3. O Router chama `UserService`.
4. O Service verifica se o e-mail já existe e gera o hash da senha.
5. O Service chama `UserRepository`.
6. O Repository usa SQLAlchemy para inserir o `User` no MySQL.
7. O schema de resposta retorna apenas os dados públicos do usuário.

## 10. Próximos conceitos a documentar

- autenticação e autorização com JWT;
- permissões por papel;
- pedidos e orçamentos;
- upload seguro de arquivos;
- transações e regras de status;
- testes de integração da API;
- integração com o frontend React.
