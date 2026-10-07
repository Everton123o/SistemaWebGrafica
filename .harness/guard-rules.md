# Guard Rules

Estas regras são restrições obrigatórias para qualquer IA que modificar o código do projeto.

## 1. Leitura obrigatória

Antes de modificar qualquer código, a IA deve ler:

1. `.harness/rules.md`
2. `.harness/guard-rules.md`

Esses arquivos devem ser tratados como regras obrigatórias do projeto.

## 2. Arquitetura

- **Não colocar regras de negócio complexas nos routers.**
- **Não colocar regras de negócio nos repositories.**
- **Não acessar o banco diretamente a partir dos routers quando a operação exigir lógica de persistência.**
- **Não colocar acesso direto ao banco dentro dos services quando esse acesso puder ser realizado pelo repository.**
- **Não criar uma segunda arquitetura paralela à arquitetura definida sem autorização.**
- Não misturar responsabilidades das camadas sem justificativa técnica.

A estrutura deve preservar:

```text
Router → Service → Repository → SQLAlchemy → MySQL
```

## 3. Banco de dados

- **Nunca utilizar SQL manual** para operações da aplicação.
- **Nunca ignorar o SQLAlchemy ORM** para acessar diretamente o banco.
- **Nunca criar acesso direto ao MySQL fora da camada responsável pela persistência.**
- Não alterar a estrutura do banco silenciosamente.
- Não apagar ou modificar dados reais para contornar problemas de implementação.
- Não criar tabelas, campos ou relacionamentos duplicados sem verificar os modelos existentes.

## 4. Segurança

- **Nunca armazenar senhas em texto puro.**
- **Nunca expor JWT secrets, senhas, tokens, chaves de API ou outras credenciais no código-fonte.**
- **Nunca inserir credenciais reais no código para facilitar testes ou desenvolvimento.**
- **Nunca desativar autenticação ou autorização apenas para fazer uma funcionalidade funcionar.**
- **Nunca confiar exclusivamente em validações realizadas pelo frontend.**
- Não expor informações sensíveis em respostas da API ou logs.
- Não registrar senhas, tokens ou credenciais em logs.

## 5. Uploads

- **Não armazenar arquivos enviados como BLOB no banco.**
- **Não utilizar o nome original fornecido pelo usuário diretamente como caminho físico.**
- **Não permitir path traversal.**
- **Não executar arquivos enviados por usuários.**
- **Não disponibilizar arquivos enviados publicamente sem controle adequado.**
- Não adicionar serviços externos de armazenamento sem autorização.
- O armazenamento definido para o projeto é **local**.

## 6. Testes

- **Nunca remover testes existentes para fazer uma implementação passar.**
- **Nunca alterar um teste apenas para mascarar uma falha da implementação.**
- **Nunca declarar uma funcionalidade como concluída com testes relevantes falhando sem informar o problema.**
- Toda nova funcionalidade deve ser acompanhada pelos testes correspondentes.
- Correções de bugs relevantes devem possuir testes de regressão.
- Se uma parte do sistema ainda não possuir testes, isso deve ser informado claramente e não ocultado.

## 7. Código existente

- **Não modificar código não relacionado à tarefa sem necessidade.**
- **Não remover funcionalidades existentes sem autorização.**
- **Não alterar comportamento existente silenciosamente.**
- **Não duplicar funcionalidades que já existem.**
- Antes de criar uma nova implementação, verificar o código existente.

## 8. Dependências e tecnologias

- **Não instalar bibliotecas ou frameworks sem necessidade.**
- **Não substituir tecnologias definidas no projeto sem autorização.**
- Não adicionar serviços externos sem autorização.
- As tecnologias definidas do projeto são:
  - Python
  - FastAPI
  - React
  - Tailwind CSS
  - SQLAlchemy
  - MySQL
  - JWT
  - pytest

## 9. Regras de negócio

- **Não inventar regras de negócio silenciosamente.**
- **Não remover regras de negócio existentes para simplificar uma implementação.**
- **Não alterar o comportamento de uma regra existente sem autorização.**
- Quando houver conflito entre uma solicitação e uma regra existente, a IA deve identificar o conflito.
- Quando faltar uma informação necessária para uma decisão de negócio, a IA deve informar a lacuna em vez de assumir uma regra arbitrária.

## 10. Escopo

- Não implementar funcionalidades que não fazem parte da tarefa solicitada.
- Não alterar frontend durante uma tarefa exclusivamente de backend, salvo quando explicitamente necessário e autorizado.
- Não realizar refatorações amplas sem necessidade para a tarefa atual.
- Não modificar arquivos de documentação ou configuração sem relação com a implementação.

## 11. Critério de segurança

Quando houver dúvida entre uma implementação conveniente e uma implementação que preserve a segurança, integridade, arquitetura ou consistência do sistema, deve-se preservar a regra existente e informar o conflito.

## 12. Conclusão

Uma tarefa não deve ser considerada concluída quando:

- existem testes relevantes falhando;
- existem erros conhecidos não informados;
- regras do `rules.md` foram violadas;
- regras deste arquivo foram violadas;
- a implementação utiliza uma solução explicitamente proibida;
- uma decisão necessária foi inventada silenciosamente.'