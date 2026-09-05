# Incident Hub

Sistema para centralização e acompanhamento de incidentes operacionais.

O objetivo do Incident Hub é permitir que uma equipe registre, acompanhe e resolva incidentes em um único lugar, mantendo o histórico das alterações e das interações realizadas durante o tratamento.

## Funcionalidades

* Criação de incidentes
* Listagem de incidentes
* Filtro por status
* Filtro por severidade
* Filtro combinado de status e severidade
* Alteração de status
* Regra especial para incidentes críticos
* Histórico de alterações de status
* Comentários nos incidentes
* Timeline cronológica de atividades
* Dashboard com estatísticas
* Persistência dos dados em PostgreSQL
* Seed inicial para popular o banco
* Validação dos dados de entrada
* Testes automatizados

## Regra de negócio principal

Incidentes com severidade `CRITICAL` não podem ser resolvidos diretamente.

O fluxo obrigatório é:

```text
OPEN → IN_PROGRESS → RESOLVED
```

Uma tentativa de:

```text
OPEN → RESOLVED
```

é rejeitada pela API.

## Timeline

A timeline reúne em uma única sequência cronológica:

* alterações de status;
* comentários realizados no incidente.

Exemplo:

```text
10:31 — Status changed: Open → In Progress
10:42 — Ana commented: "Provider contacted."
11:14 — Status changed: In Progress → Resolved
```

Os eventos são armazenados separadamente no banco e combinados pela camada de serviço para formar a timeline.

## Tecnologias

* Node.js
* TypeScript
* Express
* PostgreSQL
* Prisma
* Zod
* Vitest
* Supertest

## Estrutura

```text
incident-hub/
├── src/
│   ├── config/
│   ├── database/
│   ├── middlewares/
│   ├── modules/
│   │   └── incidents/
│   ├── shared/
│   ├── app.ts
│   └── server.ts
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── tests/
│   └── incidents/
├── .env
├── .env.example
├── PLAN.md
├── START.md
├── AI_LOG.md
└── README.md
```

## Como executar

### 1. Instalar dependências

```bash
npm install
```

### 2. Configurar o ambiente

Crie um arquivo `.env` na raiz do projeto:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/incident_hub?schema=public"
```

### 3. Criar o banco e executar as migrations

```bash
npx prisma migrate dev
```

### 4. Popular o banco

```bash
npm run seed
```

### 5. Executar o projeto

```bash
npm run dev
```

A API ficará disponível em:

```text
http://localhost:3000
```

## Endpoints

### Health Check

```http
GET /health
```

### Criar incidente

```http
POST /incidents
```

Exemplo:

```json
{
  "title": "Falha no processamento",
  "description": "As transações estão apresentando erro.",
  "severity": "CRITICAL"
}
```

Severidades disponíveis:

```text
LOW
MEDIUM
HIGH
CRITICAL
```

### Listar incidentes

```http
GET /incidents
```

### Filtrar incidentes

Por status:

```http
GET /incidents?status=OPEN
```

Por severidade:

```http
GET /incidents?severity=CRITICAL
```

Combinando filtros:

```http
GET /incidents?status=IN_PROGRESS&severity=CRITICAL
```

### Consultar incidente

```http
GET /incidents/:id
```

### Alterar status

```http
PATCH /incidents/:id/status
```

Exemplo:

```json
{
  "status": "IN_PROGRESS",
  "changedBy": "Daniel"
}
```

### Dashboard

```http
GET /incidents/dashboard
```

Retorna estatísticas de quantidade total, status e severidade.

### Criar comentário

```http
POST /incidents/:id/comments
```

Exemplo:

```json
{
  "author": "Ana",
  "content": "Provider contacted."
}
```

### Consultar timeline

```http
GET /incidents/:id/timeline
```

Retorna os comentários e alterações de status em ordem cronológica.

## Testes

O projeto possui testes automatizados utilizando Vitest e Supertest.

Executar os testes:

```bash
npm run test:run
```

Executar em modo de desenvolvimento:

```bash
npm run test
```

A suíte cobre as principais regras do sistema, incluindo:

* criação;
* validação;
* listagem;
* filtros;
* alteração de status;
* regra de incidentes críticos;
* histórico;
* dashboard;
* comentários;
* persistência;
* timeline;
* ordenação cronológica.

## Build

Para verificar a compilação TypeScript:

```bash
npm run build
```

## Seed

Para inserir dados iniciais:

```bash
npm run seed
```

O seed cria incidentes com diferentes severidades e status para facilitar os testes e a demonstração do sistema.

## Objetivo do projeto

O Incident Hub foi desenvolvido durante o AI Engineering Hackathon com foco em resolver o problema de centralização e acompanhamento de incidentes operacionais.

A implementação prioriza regras de negócio, persistência, rastreabilidade, validação e testes automatizados, mantendo a interface simples para concentrar o desenvolvimento na camada responsável pelo funcionamento do sistema.
