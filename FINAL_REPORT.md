# FINAL_REPORT.md — Incident Hub

## 1. Resumo

O Incident Hub é uma API para centralização e acompanhamento de incidentes operacionais.

O sistema permite registrar incidentes, acompanhar seus status, aplicar regras de negócio, registrar comentários e consultar uma timeline com todas as atividades realizadas.

O desenvolvimento foi realizado com foco no backend, priorizando funcionamento, persistência, rastreabilidade e testes.

---

## 2. Problema

Em uma operação com diferentes incidentes, informações podem ficar espalhadas entre ferramentas e dificultar o acompanhamento dos problemas.

O Incident Hub busca centralizar essas informações e permitir que a equipe acompanhe:

* qual é o problema;
* qual sua severidade;
* em qual etapa de tratamento está;
* quem realizou alterações;
* quais comentários foram registrados;
* como o incidente evoluiu ao longo do tempo.

---

## 3. Solução

Foi desenvolvida uma API REST utilizando:

* Node.js;
* TypeScript;
* Express;
* PostgreSQL;
* Prisma;
* Zod.

A aplicação possui uma estrutura separada por responsabilidades:

```text id="6r2mx8"
Controller
    ↓
Service
    ↓
Repository
    ↓
Prisma
    ↓
PostgreSQL
```

O Controller recebe as requisições, o Service concentra as regras de negócio e o Repository realiza o acesso aos dados.

---

## 4. Funcionalidades entregues

### Incidentes

* Criação;
* listagem;
* consulta por ID;
* filtros por status;
* filtros por severidade;
* filtros combinados;
* alteração de status.

### Regras de negócio

Incidentes críticos não podem ser resolvidos diretamente.

O fluxo obrigatório é:

```text id="z3kz0u"
OPEN → IN_PROGRESS → RESOLVED
```

### Histórico

As alterações de status são persistidas com:

* status anterior;
* novo status;
* responsável;
* data da alteração.

### Dashboard

O sistema apresenta estatísticas de:

* total de incidentes;
* incidentes abertos;
* incidentes em andamento;
* incidentes resolvidos;
* quantidade por severidade.

### Comentários

Cada incidente pode possuir vários comentários.

Cada comentário possui:

* autor;
* conteúdo;
* data de criação.

Comentários vazios ou sem autor são rejeitados.

### Timeline

A timeline reúne:

* alterações de status;
* comentários.

Os eventos são combinados e apresentados em ordem cronológica.

---

## 5. Change Request

O Change Request recebido durante o desenvolvimento adicionou a necessidade de comentários e uma timeline única.

A implementação foi realizada sem substituir o histórico existente.

Foram mantidas duas estruturas:

```text id="ojwz8g"
IncidentHistory
IncidentComment
```

A timeline é construída pela aplicação a partir dessas duas fontes.

Essa abordagem evita duplicação de informações no banco e mantém cada entidade responsável pelo seu próprio tipo de evento.

---

## 6. Persistência

Os dados são armazenados em PostgreSQL utilizando Prisma como ORM.

Os principais dados persistidos são:

* incidentes;
* histórico de alterações;
* comentários.

Os dados permanecem disponíveis após reiniciar a aplicação.

Também foi criado um seed para facilitar a demonstração do sistema.

---

## 7. Testes

Foram utilizados Vitest e Supertest para testar a API e as principais regras de negócio.

A suíte final possui:

```text id="l4k8g1"
20 testes
20 passando
```

Os testes cobrem:

* Health Check;
* criação de incidentes;
* validação;
* listagem;
* filtros;
* alteração de status;
* regra de incidentes críticos;
* histórico;
* dashboard;
* criação de comentários;
* validação de comentários;
* persistência;
* incidente inexistente;
* timeline;
* ordenação cronológica.

Além dos testes automatizados, as principais funcionalidades foram verificadas manualmente utilizando Thunder Client.

---

## 8. Validação

A aplicação foi validada através de:

* testes automatizados;
* testes manuais da API;
* validação das respostas HTTP;
* verificação das regras de negócio;
* verificação da persistência;
* compilação TypeScript.

O objetivo foi garantir que a implementação do Change Request não quebrasse as funcionalidades existentes.

---

## 9. Decisões técnicas

### Backend como prioridade

O desenvolvimento priorizou o funcionamento da aplicação e as regras de negócio em vez de investir tempo excessivo na interface.

### Separação de responsabilidades

Foi utilizada a separação Controller, Service e Repository para facilitar manutenção e organização.

### Timeline sem tabela própria

Não foi criada uma tabela Timeline porque os eventos já possuem suas próprias entidades.

A timeline é uma visão construída pela aplicação.

### Validação com Zod

As entradas da API são validadas antes de serem processadas.

### Transação para alteração de status

A alteração do status e a criação do histórico são realizadas dentro da mesma transação para evitar que o incidente seja atualizado sem o respectivo registro histórico.

---

## 10. Riscos identificados

Durante o desenvolvimento foram considerados alguns riscos:

* permitir uma resolução inválida de incidentes críticos;
* perder o histórico de alterações;
* permitir comentários vazios;
* inconsistência entre status e histórico;
* perda de dados após reinicialização;
* regressões causadas pelas novas funcionalidades.

Esses pontos foram tratados através das regras implementadas, persistência e testes automatizados.

---

## 11. Limitações

O projeto foi desenvolvido dentro do tempo disponível para o hackathon.

Algumas funcionalidades que poderiam ser adicionadas em uma evolução futura:

* autenticação e autorização;
* usuários reais;
* paginação;
* notificações;
* anexos;
* métricas mais avançadas;
* interface web mais completa;
* auditoria mais detalhada.

Essas funcionalidades não fazem parte do escopo principal entregue.

---

## 12. Resultado final

O Incident Hub atende às funcionalidades principais definidas inicialmente e também ao Change Request de comentários e timeline.

O sistema possui:

```text id="u1j8h3"
API REST
PostgreSQL
Prisma
Validação
Regras de negócio
Histórico
Comentários
Timeline
Dashboard
Seed
Testes automatizados
Documentação
```

A implementação foi validada com **20 testes automatizados passando**, além dos testes manuais realizados durante o desenvolvimento.
