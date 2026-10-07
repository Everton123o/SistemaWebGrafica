Você será responsável por desenvolver/completar o FRONTEND do sistema:

"Sistema Web de Pré-Produção e Validação de Pedidos para uma Gráfica"

IMPORTANTE:
Seu objetivo não é criar apenas uma interface bonita ou demonstrativa.
O frontend precisa representar TODAS as funcionalidades previstas para o sistema.

Não implemente backend.
Não implemente banco de dados.
Não escreva SQL.
Não altere a arquitetura do backend.
Não invente endpoints.

Caso alguma funcionalidade ainda não possua backend disponível, implemente normalmente sua interface utilizando dados mockados temporariamente.

==================================================
1. TECNOLOGIAS
==================================================

O frontend deve utilizar:

- React
- Tailwind CSS
- JavaScript ou TypeScript, mantendo a tecnologia já utilizada no projeto
- Componentização
- Estrutura organizada de páginas, componentes e layouts
- Design responsivo

Antes de modificar o projeto:
1. Analise toda a estrutura existente.
2. Identifique o que já está implementado.
3. Reutilize componentes existentes quando possível.
4. Não remova funcionalidades existentes sem necessidade.
5. Preserve o padrão visual já adotado no projeto.

==================================================
2. REGRA PRINCIPAL
==================================================

NÃO considere uma funcionalidade implementada apenas porque existe uma página com seu nome.

A funcionalidade deve poder ser realmente executada pela interface.

Exemplo:

Não basta existir:

"Gerenciar Serviços"

A interface deve permitir ações como:

- visualizar serviços;
- criar serviço;
- editar serviço;
- visualizar detalhes;
- ativar/desativar quando aplicável;
- configurar seus requisitos.

Outro exemplo:

Não basta existir:

"Solicitar Correção"

O responsável pela gráfica deve conseguir:

1. abrir um pedido;
2. visualizar a arte enviada;
3. selecionar a opção de solicitar correção;
4. informar o motivo;
5. confirmar a solicitação;
6. visualizar que o pedido ficou aguardando correção.

==================================================
3. ATORES DO SISTEMA
==================================================

Existem três tipos principais de usuário:

CLIENTE

Utiliza o sistema para consultar os serviços da gráfica, realizar pedidos, enviar arquivos e acompanhar seus pedidos.

RESPONSÁVEL DA GRÁFICA

Analisa pedidos e arquivos enviados pelos clientes, solicita correções, aprova/reprova artes, realiza orçamento e libera pedidos para produção.

ADMINISTRADOR

Gerencia usuários, clientes, serviços, requisitos, preços e configurações administrativas.

A interface apresentada deve respeitar o tipo de usuário autenticado.

Não apresente opções administrativas para clientes.

==================================================
4. FUNCIONALIDADES DO CLIENTE
==================================================

O frontend deve permitir ao CLIENTE:

### Visualizar catálogo

Criar uma página de catálogo contendo os serviços disponíveis.

Cada serviço deve apresentar informações suficientes para o cliente entender o que está contratando.

O cliente deve conseguir abrir os detalhes de um serviço.

### Visualizar detalhes do serviço

Apresentar:

- nome;
- descrição;
- informações relevantes;
- requisitos;
- opções disponíveis;
- necessidade ou não de envio de arte;
- outras configurações relacionadas ao serviço.

### Criar pedido

O cliente deve conseguir iniciar um pedido a partir de um serviço.

O formulário deve adaptar-se aos requisitos daquele serviço.

Exemplos:

- quantidade;
- largura;
- altura;
- material;
- acabamento;
- tipo de impressão;
- observações;
- outros requisitos definidos pelo serviço.

Não crie um formulário totalmente fixo se os serviços possuem requisitos diferentes.

### Preencher requisitos do serviço

Os requisitos configurados para determinado serviço precisam aparecer no formulário do pedido.

Exemplo:

Se "Banner" exigir:

- largura;
- altura;
- material;
- acabamento;

esses campos devem aparecer.

Outro serviço poderá possuir requisitos diferentes.

### Enviar arquivo/arte

Quando necessário, disponibilizar área de upload.

A interface deve mostrar:

- arquivo selecionado;
- nome;
- tipo;
- tamanho;
- estado do upload;
- possibilidade de remover/substituir antes do envio.

### Acompanhar pedidos

Criar uma área "Meus Pedidos".

O cliente deve conseguir visualizar seus pedidos e seus respectivos estados.

Exemplos de estados:

- Pendente
- Em análise
- Aguardando correção
- Aguardando aprovação
- Aprovado
- Em produção
- Finalizado

O cliente deve conseguir abrir os detalhes de cada pedido.

### Visualizar detalhes do pedido

Apresentar de forma organizada:

- serviço;
- requisitos preenchidos;
- arquivos enviados;
- orçamento;
- observações;
- situação atual;
- histórico;
- correções solicitadas;
- versão atual da arte.

### Enviar correções

Caso a gráfica solicite uma correção, o cliente deve:

- visualizar claramente a pendência;
- visualizar o motivo informado;
- enviar uma nova versão da arte;
- adicionar observação, quando necessário;
- confirmar o novo envio.

Não sobrescrever visualmente as versões anteriores.

A interface deve permitir visualizar o histórico de versões.

==================================================
5. FUNCIONALIDADES DO RESPONSÁVEL DA GRÁFICA
==================================================

Criar uma área/painel próprio para o responsável pela gráfica.

### Visualizar pedidos

Apresentar lista/tabela/cards dos pedidos.

Permitir visualizar informações importantes como:

- cliente;
- serviço;
- data;
- status;
- pendências.

Adicionar filtros úteis, principalmente por status.

### Validar pedido

O responsável deve conseguir abrir um pedido e analisar:

- dados do cliente;
- serviço;
- requisitos preenchidos;
- dimensões;
- quantidade;
- observações;
- arquivos enviados;
- pendências existentes.

### Verificar arquivo

Criar uma área específica para visualizar informações dos arquivos enviados.

Apresentar, quando disponíveis:

- nome;
- formato;
- tamanho;
- versão;
- data de envio;
- situação da análise.

Quando for possível exibir preview, disponibilizá-lo.

### Aprovar/Reprovar arte

O responsável deve possuir ações claras para:

- Aprovar arte
- Reprovar arte
- Solicitar correção

Antes de executar ações importantes, utilize confirmação.

### Solicitar correção

Ao solicitar uma correção, abrir formulário/modal para informar o motivo.

Exemplo:

"Resolução da imagem insuficiente."

"Dimensão do arquivo incompatível com o serviço solicitado."

"Informações da arte precisam ser corrigidas."

A solicitação deve ficar visível posteriormente nos detalhes do pedido.

### Histórico das artes

Apresentar as diferentes versões enviadas.

Exemplo:

Arte v1
Reprovada

Arte v2
Correção enviada

Arte v3
Aprovada

A versão aprovada deve estar claramente identificada.

### Calcular/registrar orçamento

Disponibilizar interface para orçamento contendo os dados relevantes do serviço.

Exibir de maneira organizada os valores necessários para chegar ao orçamento final.

O responsável deve conseguir registrar/alterar o orçamento através da interface.

### Liberar para produção

Disponibilizar ação específica:

"LIBERAR PARA PRODUÇÃO"

Essa ação deve possuir confirmação visual.

A interface deve deixar claro quando existem pendências que impedem a liberação.

### Acompanhar produção

Permitir visualizar os pedidos por status e identificar facilmente:

- aguardando análise;
- aguardando cliente;
- aprovados;
- em produção;
- finalizados.

==================================================
6. FUNCIONALIDADES DO ADMINISTRADOR
==================================================

Criar uma área administrativa separada.

### Gerenciar usuários

Criar interface para:

- listar usuários;
- visualizar usuário;
- criar usuário quando aplicável;
- editar usuário;
- ativar/desativar usuário quando aplicável;
- identificar seu perfil/papel.

### Gerenciar clientes

Criar interface para:

- listar clientes;
- pesquisar clientes;
- visualizar informações;
- editar informações;
- visualizar histórico relacionado ao cliente.

### Gerenciar serviços

O administrador deve conseguir:

- listar serviços;
- criar serviço;
- visualizar serviço;
- editar serviço;
- ativar/desativar serviço;
- modificar informações.

IMPORTANTE:

Os serviços NÃO devem ser tratados como informações permanentemente fixas na interface.

### Definir requisitos do serviço

Dentro do gerenciamento de serviços, criar uma interface para configurar requisitos.

Exemplo:

SERVIÇO: Banner

Requisitos:
[x] Largura
[x] Altura
[x] Material
[x] Acabamento
[x] Arquivo obrigatório

Outro serviço poderá possuir requisitos diferentes.

A interface deve permitir adicionar, editar e remover requisitos quando apropriado.

### Configurar preços e margens

Criar interface administrativa para configuração dos dados utilizados na formação de preços.

Apresentar campos e controles de maneira clara.

Não precisa implementar a regra matemática do backend.

O objetivo aqui é garantir que exista uma interface para visualizar e configurar essas informações.

==================================================
7. HISTÓRICO
==================================================

O sistema precisa apresentar histórico onde for relevante.

Principalmente:

- histórico do pedido;
- alterações de status;
- correções solicitadas;
- versões de arquivos;
- aprovação/reprovação;
- andamento do serviço.

Utilize uma representação visual adequada, como timeline, lista cronológica ou tabela.

==================================================
8. DASHBOARDS
==================================================

Os painéis devem ser úteis e não apenas decorativos.

CLIENTE:

Pode visualizar informações como:

- pedidos recentes;
- pedidos aguardando correção;
- pedidos em produção;
- pedidos finalizados.

RESPONSÁVEL DA GRÁFICA:

Pode visualizar:

- novos pedidos;
- aguardando análise;
- aguardando correção;
- aguardando aprovação;
- prontos para produção;
- em produção.

ADMINISTRADOR:

Pode visualizar informações gerais de gerenciamento.

Não invente gráficos apenas para preencher espaço.

==================================================
9. FEEDBACK VISUAL
==================================================

Toda ação relevante deve possuir feedback.

Exemplos:

- carregamento;
- sucesso;
- erro;
- confirmação;
- nenhuma informação encontrada;
- arquivo enviado;
- correção solicitada;
- arte aprovada;
- arte reprovada;
- pedido atualizado.

Não deixe botões sem comportamento visual.

==================================================
10. NAVEGAÇÃO
==================================================

A navegação deve ser coerente com o usuário autenticado.

CLIENTE:

- Início/Dashboard
- Catálogo
- Meus Pedidos
- Perfil

RESPONSÁVEL DA GRÁFICA:

- Dashboard
- Pedidos
- Análises/Pendências
- Produção
- Clientes

ADMINISTRADOR:

- Dashboard
- Usuários
- Clientes
- Serviços
- Preços/Configurações

A nomenclatura pode ser melhorada de acordo com o design existente, mas nenhuma funcionalidade pode desaparecer.

==================================================
11. RESPONSIVIDADE
==================================================

Todas as páginas devem funcionar adequadamente em:

- desktop;
- tablet;
- celular.

Evite tabelas inutilizáveis no celular.

Quando necessário, transforme informações de tabelas em cards ou utilize comportamento responsivo adequado.

==================================================
12. DADOS MOCKADOS
==================================================

A ausência temporária de uma API NÃO é motivo para excluir uma funcionalidade.

Quando necessário, utilize dados mockados.

Exemplo:

Se ainda não existir integração para histórico de versões da arte, crie dados temporários como:

Arte v1 — Reprovada
Arte v2 — Correção enviada
Arte v3 — Aprovada

O objetivo é deixar todo o fluxo visual pronto para posteriormente substituir os mocks pelos dados reais da API.

==================================================
13. NÃO FAÇA
==================================================

NÃO:

- transforme o sistema apenas em landing page;
- implemente somente login + dashboard + catálogo;
- ignore funcionalidades do diagrama;
- remova funcionalidades porque a API ainda não existe;
- crie botões que não fazem nada;
- coloque todas as funções administrativas em uma única tela confusa;
- esconda funcionalidades importantes apenas em menus difíceis de encontrar;
- implemente apenas o "caminho feliz";
- modifique desnecessariamente partes já funcionando;
- invente regras de negócio;
- implemente backend.

==================================================
14. CASOS DE USO OBRIGATÓRIOS
==================================================

Utilize o Diagrama de Casos de Uso fornecido como referência obrigatória.

Garanta representação concreta no frontend para:

[ ] Visualizar Catálogo
[ ] Criar Pedido
[ ] Preencher Requisitos do Serviço
[ ] Enviar Arquivo
[ ] Acompanhar Pedido
[ ] Enviar Correções

[ ] Validar Pedido
[ ] Verificar Arquivo
[ ] Aprovar/Reprovar Arte
[ ] Solicitar Correção
[ ] Calcular Orçamento
[ ] Liberar para Produção

[ ] Gerenciar Serviços
[ ] Definir Requisitos de Serviço
[ ] Gerenciar Usuários
[ ] Configurar Preços e Margens

Além disso, devido às atualizações posteriores do projeto:

[ ] Gerenciar Clientes
[ ] Visualizar histórico dos serviços/pedidos
[ ] Visualizar histórico/versões dos arquivos
[ ] Modificar serviços existentes

==================================================
15. PROCEDIMENTO ANTES DE PROGRAMAR
==================================================

NÃO comece criando páginas aleatoriamente.

Primeiro:

1. Analise o frontend existente.
2. Liste todas as páginas existentes.
3. Liste todos os componentes relevantes existentes.
4. Compare o que existe com este documento.
5. Identifique funcionalidades completas.
6. Identifique funcionalidades parcialmente implementadas.
7. Identifique funcionalidades ausentes.
8. Monte um plano de implementação.
9. Somente depois comece a modificar o código.

Não recrie páginas que já estão corretamente implementadas.

==================================================
16. MATRIZ DE COBERTURA
==================================================

Antes de considerar o trabalho concluído, produza uma matriz como:

FUNCIONALIDADE | ATOR | TELA | IMPLEMENTADA

Visualizar catálogo | Cliente | Catálogo | SIM/NÃO
Criar pedido | Cliente | Novo Pedido | SIM/NÃO
Enviar arquivo | Cliente | Novo Pedido | SIM/NÃO
Acompanhar pedido | Cliente | Meus Pedidos | SIM/NÃO
Enviar correções | Cliente | Detalhes do Pedido | SIM/NÃO

Validar pedido | Responsável | Detalhes do Pedido | SIM/NÃO
Verificar arquivo | Responsável | Análise do Pedido | SIM/NÃO
Solicitar correção | Responsável | Análise do Pedido | SIM/NÃO
Aprovar/Reprovar arte | Responsável | Análise do Pedido | SIM/NÃO
Calcular orçamento | Responsável | Orçamento | SIM/NÃO
Liberar para produção | Responsável | Detalhes do Pedido | SIM/NÃO

Gerenciar serviços | Administrador | Serviços | SIM/NÃO
Definir requisitos | Administrador | Serviço/Requisitos | SIM/NÃO
Gerenciar usuários | Administrador | Usuários | SIM/NÃO
Gerenciar clientes | Administrador | Clientes | SIM/NÃO
Configurar preços/margens | Administrador | Configurações | SIM/NÃO

Histórico | Conforme permissão | Detalhes | SIM/NÃO
Versões de arquivos | Cliente/Responsável | Pedido/Arte | SIM/NÃO

Se alguma estiver marcada como NÃO, o frontend ainda não está completo.

==================================================
17. CRITÉRIO FINAL
==================================================

Ao terminar, percorra o sistema mentalmente como cada um dos três usuários.

CLIENTE:
"Consigo escolher um serviço, fazer meu pedido, enviar minha arte, acompanhar o andamento e responder a uma solicitação de correção?"

RESPONSÁVEL DA GRÁFICA:
"Consigo receber o pedido, analisar os dados e a arte, solicitar uma correção, receber outra versão, aprovar/reprovar, trabalhar com orçamento e liberar o pedido para produção?"

ADMINISTRADOR:
"Consigo administrar usuários, clientes, serviços, requisitos, preços e configurações necessárias?"

Se alguma resposta for NÃO, continue a implementação.

Não considere o frontend concluído enquanto existirem funcionalidades previstas neste documento sem representação funcional na interface.