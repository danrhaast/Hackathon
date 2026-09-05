# Incident Hub — Relatório Final

## 1. Resumo

O **Incident Hub** é um sistema desenvolvido durante o AI Engineering Hackathon para centralizar o registro, acompanhamento e resolução de incidentes operacionais.

A aplicação permite criar incidentes, controlar status e severidade, visualizar histórico, adicionar comentários, acompanhar uma timeline de atividades e consultar indicadores através de um dashboard.

O sistema foi finalizado e validado com sucesso.

## 2. Problema

Incidentes operacionais precisam ser acompanhados de forma organizada para que a equipe consiga entender:

* qual problema aconteceu
* qual a gravidade
* qual o estado atual
* quais ações foram realizadas
* quem realizou determinada ação
* quando cada evento aconteceu

O Incident Hub concentra essas informações em uma única aplicação.

## 3. Solução

Foi desenvolvido um sistema web com:

* API REST
* PostgreSQL
* Prisma
* regras de negócio no backend
* validação de dados
* frontend web
* histórico de alterações
* comentários
* timeline
* dashboard

## 4. Funcionalidades entregues

### Incidentes

* criação
* listagem
* filtros
* detalhes
* alteração de status
* classificação por severidade

### Regra de Critical

Incidentes críticos não podem ser resolvidos diretamente.

O fluxo obrigatório é:

```text
OPEN
 ↓
IN_PROGRESS
 ↓
RESOLVED
```

### Histórico

Toda alteração de status é registrada com:

* status anterior
* novo status
* responsável
* data

### Comentários

Cada incidente pode possuir vários comentários.

Cada comentário possui:

* autor
* conteúdo
* data de criação

Comentários são persistidos no banco de dados.

### Timeline

A timeline combina:

* alterações de status
* comentários

Os eventos são organizados cronologicamente.

Isso permite acompanhar toda a evolução do incidente em uma única visualização.

### Dashboard

O dashboard apresenta indicadores de:

* total
* abertos
* em andamento
* resolvidos
* críticos
* alta severidade
* média severidade
* baixa severidade

## 5. Change Request

A Change Request adicionou a necessidade de comentários e uma timeline unificada.

A solução adotada foi manter os comentários e o histórico de status em tabelas diferentes.

A timeline é montada no service combinando os dois tipos de eventos e ordenando-os pela data.

Essa decisão reduziu a complexidade da estrutura de dados sem perder as informações necessárias.

## 6. Persistência

Os dados são armazenados em PostgreSQL através do Prisma.

Foi validado que:

* incidentes permanecem após reinicialização
* comentários permanecem após atualização
* histórico permanece salvo
* timeline continua disponível após nova consulta

## 7. Testes

Foram implementados testes automatizados utilizando Vitest e Supertest.

Resultado final:

```text
Test Files  1 passed
Tests       20 passed
Failures    0
```

Foram testados os principais fluxos da aplicação, incluindo a regra especial para incidentes críticos e a nova Change Request.

## 8. Validação manual

Além dos testes automatizados, o sistema foi executado manualmente.

Foram validados:

* dashboard
* criação de incidentes
* listagem
* filtros
* detalhes
* alteração de status
* bloqueio de Critical → Resolved
* fluxo Critical → In Progress → Resolved
* comentários
* timeline
* persistência

Todos os fluxos principais funcionaram corretamente.

## 9. Execução

O sistema está organizado dentro da pasta `incident_hub`.

Para executar a aplicação, é necessário estar dentro dessa pasta:

```bash
cd incident_hub
npm run dev
```

A aplicação é disponibilizada em:

```text
http://localhost:3000
```

Executar `npm run dev` diretamente na raiz `Hackathon` não inicia o sistema, pois o `package.json` e os arquivos da aplicação estão dentro de `incident_hub`.

Esse procedimento está documentado no `START.md`.

## 10. Uso de IA

A IA foi utilizada durante todo o ciclo de desenvolvimento como ferramenta de apoio de engenharia.

Sua utilização ajudou a acelerar:

* análise dos requisitos
* planejamento
* arquitetura
* implementação
* resolução de erros
* revisão
* testes
* documentação

O uso de IA foi especialmente importante devido ao tempo limitado do hackathon.

A IA permitiu reduzir o tempo gasto em tarefas repetitivas e acelerar a identificação de problemas, permitindo concentrar o esforço na implementação e validação do sistema.

A validação final, execução do sistema e tomada das decisões técnicas permaneceram sob controle do desenvolvimento humano.

## 11. Principais decisões técnicas

### Backend separado por responsabilidades

Foi utilizada a divisão:

```text
Controller
Service
Repository
```

Isso permite separar HTTP, regras de negócio e acesso aos dados.

### Histórico e comentários separados

Foi decidido não criar uma tabela exclusiva para timeline.

O banco mantém:

```text
IncidentHistory
IncidentComment
```

A timeline é composta pelo service.

### Validação

Zod foi utilizado para validar os dados recebidos pela API.

### Persistência

PostgreSQL foi utilizado para garantir persistência dos dados.

## 12. Riscos e limitações

O projeto foi desenvolvido dentro do tempo limitado do hackathon.

Por isso, alguns pontos não foram priorizados:

* autenticação
* autorização
* gerenciamento de usuários
* notificações
* paginação
* deploy em produção
* recursos avançados de observabilidade

Esses pontos podem ser adicionados em uma evolução futura.

## 13. Resultado final

O Incident Hub foi concluído com sucesso.

O sistema possui:

```text
Backend
   +
Database
   +
Business Rules
   +
Frontend
   +
Comments
   +
Timeline
   +
Dashboard
   +
Tests
   +
Documentation
```

O desenvolvimento foi acelerado através do uso estruturado de Inteligência Artificial durante as diferentes etapas do projeto.

Ao final, o sistema estava funcionando sem erros identificados nos fluxos validados e apresentou:

**20 testes automatizados passando de 20 testes executados.**

## 14. Conclusão

O projeto cumpriu o objetivo de criar uma solução funcional para gerenciamento de incidentes operacionais.

Além da implementação das funcionalidades originais, a Change Request foi incorporada sem comprometer as regras existentes.

A utilização de IA como ferramenta de engenharia possibilitou um ciclo de desenvolvimento mais rápido, iterativo e orientado à resolução de problemas, mantendo a validação técnica durante todo o processo.

**Status final: CONCLUÍDO.**
