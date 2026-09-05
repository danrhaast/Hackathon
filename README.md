# Incident Hub

## Sobre o projeto

O **Incident Hub** é um sistema para centralizar o registro, acompanhamento e resolução de incidentes operacionais.

O sistema permite registrar incidentes, acompanhar seus status, controlar a severidade, registrar alterações, adicionar comentários e visualizar uma timeline cronológica de todas as atividades.

O projeto foi desenvolvido durante o **AI Engineering Hackathon**, utilizando IA como apoio durante análise, planejamento, implementação, revisão, testes e documentação.

## Objetivo

Criar uma solução simples e funcional para melhorar o controle de incidentes, permitindo que uma equipe acompanhe todo o ciclo de tratamento de um problema em um único lugar.

## Funcionalidades

* Criação de incidentes
* Listagem de incidentes
* Filtro por status
* Filtro por severidade
* Visualização dos detalhes
* Alteração de status
* Histórico de alterações
* Dashboard com indicadores
* Comentários nos incidentes
* Timeline cronológica
* Persistência dos dados em PostgreSQL
* Validação dos dados de entrada
* Tratamento de erros
* Interface web simples

## Fluxo de status

Os incidentes possuem três estados:

```text
OPEN
  ↓
IN_PROGRESS
  ↓
RESOLVED
```

Existe uma regra especial para incidentes **CRITICAL**:

```text
CRITICAL + OPEN
       ↓
Não pode ir diretamente para RESOLVED
       ↓
Deve passar por IN_PROGRESS
       ↓
RESOLVED
```

Essa regra é aplicada no backend.

## Timeline

A timeline reúne em uma única visualização:

* alterações de status
* comentários

Os eventos são organizados cronologicamente, permitindo visualizar a evolução completa de um incidente.

## Tecnologia

* Node.js
* TypeScript
* Express
* PostgreSQL
* Prisma
* Zod
* Vitest
* Supertest
* HTML
* CSS
* JavaScript

## Estrutura

```text
Hackathon/
└── incident_hub/
    ├── src/
    │   ├── config/
    │   ├── database/
    │   ├── modules/
    │   │   └── incidents/
    │   ├── middlewares/
    │   ├── shared/
    │   ├── public/
    │   ├── app.ts
    │   └── server.ts
    ├── prisma/
    ├── tests/
    ├── README.md
    ├── START.md
    ├── PLAN.md
    ├── AI_LOG.md
    └── FINAL_REPORT.md
```

## Como executar

**Importante:** os comandos devem ser executados dentro da pasta `incident_hub`.

Se o terminal estiver na raiz do projeto `Hackathon`, primeiro entre na pasta:

```bash
cd incident_hub
```

Depois instale as dependências:

```bash
npm install
```

Configure o arquivo `.env`:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/incident_hub?schema=public"
```

Execute as migrations:

```bash
npx prisma migrate dev
```

Execute o seed:

```bash
npm run seed
```

Inicie o sistema:

```bash
npm run dev
```

Depois acesse:

```text
http://localhost:3000
```

### Importante

Executar:

```bash
npm run dev
```

diretamente na raiz `Hackathon` não inicia o Incident Hub, pois o `package.json` e o código da aplicação estão dentro da pasta `incident_hub`.

O fluxo correto é:

```text
Hackathon/
    ↓
cd incident_hub
    ↓
npm run dev
    ↓
http://localhost:3000
```

## Testes

Os testes devem ser executados dentro da pasta `incident_hub`:

```bash
cd incident_hub
npm run test:run
```

Resultado final:

```text
Test Files  1 passed
Tests       20 passed
```

Os testes cobrem:

* health check
* criação
* validação
* listagem
* filtros
* alteração de status
* regra de incidentes críticos
* histórico
* dashboard
* comentários
* persistência
* timeline

## Build

Dentro da pasta `incident_hub`:

```bash
npm run build
```

## Uso de IA

A IA foi utilizada como ferramenta de engenharia durante o desenvolvimento para acelerar:

* análise dos requisitos
* planejamento da solução
* definição da arquitetura
* implementação
* revisão de código
* identificação e correção de erros
* criação dos testes
* documentação
* análise da Change Request

A utilização de IA acelerou o ciclo de desenvolvimento sem substituir a validação humana. As funcionalidades foram executadas e verificadas no ambiente local antes da entrega.

## Resultado

O sistema foi finalizado dentro do período do hackathon, com backend, banco de dados, frontend, regras de negócio, testes automatizados e documentação funcionando de forma integrada.

**Resultado final: sistema funcional, persistente e validado com 20/20 testes automatizados passando.**
