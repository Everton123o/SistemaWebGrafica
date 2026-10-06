# Development Rules

Estas regras devem ser lidas por qualquer IA antes de modificar, criar ou remover código do projeto.

## 1. Tecnologias

- O backend deve utilizar **Python e FastAPI**.
- O frontend deve utilizar **React**.
- A estilização do frontend deve utilizar **Tailwind CSS**.
- O banco de dados utilizado pelo sistema é **MySQL**.
- O acesso ao banco de dados deve utilizar exclusivamente **SQLAlchemy ORM**.
- O sistema de autenticação deve utilizar **JWT (JSON Web Token)**.
- Os testes automatizados do backend devem utilizar **pytest**.

## 2. Arquitetura

O backend deve utilizar uma **Clean Architecture simplificada**, organizada em camadas e utilizando **Service Layer** e **Repository Pattern**.

O fluxo principal deve seguir:

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

Responsabilidades:

- **Router/API:** comunicação HTTP, recebimento de requisições e retorno de respostas.
- **Service:** regras de negócio e orquestração dos casos de uso.
- **Repository:** acesso e persistência de dados.
- **Model:** representação das entidades persistidas.
- **Schema:** validação e serialização dos dados da API.
- **Core:** configurações, banco, segurança e recursos fundamentais da aplicação.

Routers não devem concentrar regras de negócio complexas.

Repositories não devem conter regras de negócio.

Services não devem depender diretamente de detalhes HTTP quando isso puder ser evitado.

## 3. Backend

- O backend deve manter separação clara entre API, regras de negócio, persistência e infraestrutura.
- Dados recebidos pela API devem ser validados no backend.
- Regras críticas do sistema devem ser verificadas no backend.
- Erros devem ser tratados de maneira consistente.
- Respostas da API não devem expor informações internas desnecessárias.
- Endpoints protegidos devem exigir autenticação adequada.
- A lógica de negócio deve permanecer testável independentemente da camada HTTP sempre que possível.

## 4. Banco de Dados

- Toda operação de persistência deve utilizar **SQLAlchemy ORM**.
- Não utilizar SQL manual para operações da aplicação.
- Alterações estruturais do banco devem utilizar migrations.
- Não modificar ou remover dados existentes apenas para facilitar o desenvolvimento ou execução de testes.
- Models SQLAlchemy devem representar corretamente os relacionamentos definidos para o sistema.

## 5. Frontend

- O frontend deve ser desenvolvido utilizando React.
- A estilização deve utilizar Tailwind CSS.
- O frontend deve consumir a API através dos endpoints definidos.
- Validações no frontend não substituem as validações obrigatórias do backend.
- O frontend não deve conter secrets, credenciais ou informações que devam permanecer no backend.

## 6. Autenticação e segurança

- A autenticação deve utilizar JWT.
- Senhas nunca devem ser armazenadas em texto puro.
- JWT secrets, senhas, chaves de API e outras credenciais devem ser obtidos através de configuração segura.
- Informações sensíveis não devem ser retornadas desnecessariamente pela API.
- Entradas fornecidas pelos usuários devem ser tratadas como não confiáveis.

## 7. Arquivos e uploads

- Os arquivos enviados pelos usuários devem ser armazenados **localmente no servidor**.
- O banco de dados deve armazenar os metadados e a referência/caminho do arquivo, não o arquivo binário.
- A lógica de armazenamento de arquivos deve ser separada da lógica de negócio.
- Uploads devem possuir validação de tipo, extensão e tamanho conforme as regras definidas para o sistema.
- Arquivos enviados não devem ser executados como código.
- O nome original do arquivo não deve ser utilizado diretamente como caminho de armazenamento.
- O sistema deve impedir path traversal e outros acessos indevidos ao sistema de arquivos.
- Os arquivos não devem ser disponibilizados publicamente sem controle adequado.

## 8. Regras de negócio

- Regras de negócio devem ser implementadas na camada de Service.
- Regras críticas não devem depender exclusivamente do frontend.
- Uma alteração de comportamento deve preservar as regras existentes, salvo quando houver uma decisão explícita para modificá-las.
- A IA não deve inventar regras de negócio quando a documentação não fornecer informação suficiente.
- Em caso de ambiguidade, a IA deve identificar a decisão necessária antes de implementar uma solução definitiva.

## 9. Testes

- Toda nova funcionalidade deve possuir testes automatizados.
- Toda correção de bug relevante deve possuir um teste de regressão.
- O projeto utilizará **pytest** para os testes do backend.
- Testes existentes não devem ser removidos apenas para fazer uma implementação passar.
- Alterações importantes devem ser acompanhadas pela atualização dos testes correspondentes.
- Testes devem cobrir, conforme aplicável, regras de negócio, persistência, autenticação, autorização, validações e erros.
- Uma funcionalidade não deve ser considerada concluída enquanto os testes relevantes não forem executados e validados.

## 10. Código e manutenção

- O código deve permanecer organizado, legível e consistente.
- Evitar duplicação de código.
- Não adicionar dependências sem necessidade ou justificativa.
- Não modificar partes não relacionadas à tarefa sem necessidade.
- Antes de criar uma nova implementação, verificar se já existe uma solução reutilizável.
- Alterações devem preservar o comportamento existente, salvo quando a tarefa solicitar explicitamente uma mudança.

## 11. Conclusão de tarefas

Uma tarefa somente deve ser considerada concluída quando:

1. A implementação estiver realizada.
2. As regras deste arquivo e de `guard-rules.md` forem respeitadas.
3. Os testes relevantes tiverem sido executados.
4. Não houver erros conhecidos relacionados à implementação.
5. A implementação tiver sido revisada em relação à arquitetura definida.