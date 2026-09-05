# AI_LOG.md — Incident Hub

## Objetivo

Este arquivo registra como utilizei inteligência artificial durante o desenvolvimento do Incident Hub.

A IA foi utilizada como apoio técnico para análise do problema, planejamento, implementação, revisão e criação de testes.

As decisões finais e a validação do código foram realizadas durante o desenvolvimento do projeto.

---

## Como a IA foi utilizada

### 1. Análise do problema

Utilizei IA para entender o problema proposto pelo hackathon e transformar os requisitos em funcionalidades menores.

A partir disso, foram definidos:

* cadastro de incidentes;
* consulta e listagem;
* filtros;
* fluxo de status;
* histórico;
* dashboard;
* comentários;
* timeline.

---

### 2. Planejamento

A IA foi utilizada para ajudar na organização do desenvolvimento e na definição das prioridades.

O foco foi priorizar primeiro:

1. regras de negócio;
2. persistência;
3. API;
4. testes;
5. funcionalidades do Change Request;
6. documentação.

A interface visual foi deixada em segundo plano para garantir que o funcionamento principal estivesse pronto dentro do prazo.

---

### 3. Arquitetura

A IA foi utilizada como apoio na definição da estrutura do backend.

Foi adotada uma separação entre:

```text
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

Essa divisão facilita a manutenção e deixa as regras de negócio concentradas no Service.

---

## Change Request — Comentários e Timeline

Quando o Change Request foi recebido, utilizei IA para analisar o impacto da nova funcionalidade sobre a estrutura existente.

Foi decidido não criar uma tabela específica para a timeline.

A solução adotada foi manter:

```text
IncidentHistory
IncidentComment
```

separados no banco e combinar os dois registros na camada de serviço.

A timeline é então formada pela união dos eventos e ordenada pela data.

Essa decisão reduz duplicação de dados e mantém a responsabilidade de cada entidade bem definida.

---

## Testes

A IA também foi utilizada para definir cenários de teste e identificar casos que poderiam quebrar as regras existentes.

Foram criados testes para:

* criação de incidentes;
* validação;
* listagem;
* filtros;
* alteração de status;
* regra de incidentes críticos;
* histórico;
* dashboard;
* criação de comentários;
* comentários sem autor;
* comentários sem conteúdo;
* comentários vazios;
* incidente inexistente;
* persistência de comentários;
* timeline;
* ordem cronológica.

A suíte final possui:

```text
20 testes
20 passando
```

---

## Validação humana

O código sugerido pela IA não foi considerado automaticamente correto.

Durante o desenvolvimento foram realizados:

* testes automatizados;
* testes manuais utilizando Thunder Client;
* execução do build TypeScript;
* verificação das respostas da API;
* validação das regras de negócio.

Durante os testes foram encontradas regressões no fluxo de atualização de status e histórico.

Esses problemas foram corrigidos antes da conclusão do projeto.

---

## Principais decisões apoiadas pela IA

### Regra de incidentes críticos

Foi definida a validação para impedir:

```text
CRITICAL:
OPEN → RESOLVED
```

sendo obrigatório:

```text
OPEN → IN_PROGRESS → RESOLVED
```

### Timeline

Foi decidido não duplicar os eventos em uma nova tabela.

### Validação

Foi utilizado Zod para validar os dados recebidos pela API.

### Persistência

Foi utilizado PostgreSQL com Prisma para garantir persistência dos dados.

### Testes

Foi utilizada uma combinação de testes de API e testes das principais regras de negócio.

---

## Resultado

A IA foi utilizada como ferramenta de apoio durante o desenvolvimento, principalmente para:

* analisar requisitos;
* estruturar o projeto;
* sugerir implementações;
* revisar problemas;
* criar cenários de teste;
* analisar impactos de mudanças;
* auxiliar na documentação.

As implementações foram executadas, testadas e corrigidas durante o desenvolvimento até que a aplicação apresentasse comportamento esperado.

No momento da conclusão da implementação, os testes automatizados apresentavam:

```text
20 passed
20 total
```
