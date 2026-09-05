# AI_LOG.md

## Uso de Inteligência Artificial

A Inteligência Artificial foi utilizada como ferramenta de apoio durante o desenvolvimento do Incident Hub.

O objetivo não foi simplesmente gerar código, mas utilizar IA para acelerar o processo de engenharia, principalmente em análise, planejamento, implementação, revisão, testes e documentação.

## Onde a IA foi utilizada

### 1. Análise do problema

A IA foi utilizada para interpretar os requisitos do hackathon e transformar o problema em funcionalidades menores e mais fáceis de implementar.

Isso ajudou a identificar:

* entidades
* regras de negócio
* endpoints
* persistência
* histórico
* dashboard
* Change Request
* critérios de aceitação

### 2. Planejamento

A IA ajudou a estruturar o desenvolvimento e definir uma ordem de implementação.

O projeto foi dividido em partes para evitar desenvolver funcionalidades sem uma base funcional.

### 3. Arquitetura

Foi utilizada IA para discutir a organização do backend.

A arquitetura escolhida foi:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Prisma / PostgreSQL
```

Essa separação facilitou a implementação das regras de negócio e a manutenção do código.

### 4. Implementação

A IA foi utilizada como apoio na criação e revisão de:

* controllers
* services
* repositories
* schemas
* rotas
* middlewares
* modelos Prisma
* frontend
* testes

O código gerado ou sugerido foi executado no ambiente do projeto e ajustado conforme os erros encontrados.

### 5. Resolução de problemas

Durante o desenvolvimento foram encontrados problemas de implementação, incluindo erros de TypeScript, sintaxe e integração entre frontend e backend.

A IA foi utilizada para analisar os erros, encontrar a causa e sugerir correções.

As correções foram aplicadas e posteriormente validadas executando novamente o sistema.

### 6. Change Request

A Change Request adicionou comentários e uma timeline unificada.

A IA ajudou a analisar o impacto dessa alteração e foram avaliadas diferentes formas de implementação.

A decisão final foi manter:

```text
IncidentHistory
IncidentComment
```

como estruturas separadas e montar a timeline no service.

Isso evita criar uma tabela adicional apenas para representar a timeline e mantém cada tipo de informação organizado.

### 7. Testes

A IA ajudou a definir a estratégia de testes e os cenários que deveriam ser validados.

Foram criados testes para:

* health check
* criação
* validação
* listagem
* filtros
* mudança de status
* regra de Critical
* histórico
* dashboard
* comentários
* persistência
* timeline

Resultado final:

```text
Test Files  1 passed
Tests       20 passed
Failures    0
```

### 8. Documentação

A IA também foi utilizada para estruturar e revisar:

* README.md
* START.md
* PLAN.md
* AI_LOG.md
* FINAL_REPORT.md

## Impacto da IA no desenvolvimento

O principal impacto foi a **aceleração do ciclo de desenvolvimento**.

Em vez de utilizar a IA somente para gerar código, ela foi utilizada durante diferentes etapas:

```text
Problema
   ↓
Análise com IA
   ↓
Planejamento
   ↓
Implementação
   ↓
Erro / dúvida
   ↓
Análise com IA
   ↓
Correção
   ↓
Teste
   ↓
Revisão
   ↓
Documentação
```

Esse processo permitiu avançar rapidamente entre as etapas e concentrar o esforço humano na tomada de decisões, validação e integração das partes.

## Participação humana

Apesar do uso intenso de IA, a execução do projeto não foi automática.

As decisões técnicas foram avaliadas durante o desenvolvimento e as funcionalidades foram executadas no ambiente local.

A validação final incluiu:

* execução do backend
* execução do frontend
* interação com o sistema
* validação das regras
* verificação da persistência
* execução dos testes
* execução do build

## Resultado

A utilização de IA contribuiu diretamente para acelerar o desenvolvimento do Incident Hub e permitiu completar uma aplicação funcional dentro do tempo do hackathon.

O projeto terminou com:

* backend funcional
* banco PostgreSQL
* frontend funcional
* regras de negócio
* histórico
* comentários
* timeline
* dashboard
* persistência
* testes automatizados
* documentação

Resultado dos testes:

**20/20 testes passando.**
