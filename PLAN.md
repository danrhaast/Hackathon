# PLAN.md — Incident Hub

## 1. Objetivo

Criar um sistema para centralizar incidentes operacionais, permitindo registrar, acompanhar e resolver problemas em um único lugar.

O foco principal do projeto é garantir as regras de negócio, persistência dos dados, histórico das ações e facilidade para consultar os incidentes.

---

## 2. O que será desenvolvido

### Incidentes

* Criar incidentes.
* Listar incidentes.
* Consultar detalhes.
* Filtrar por status.
* Filtrar por severidade.
* Filtrar por status e severidade.
* Alterar o status do incidente.

### Regra de incidentes críticos

Incidentes `CRITICAL` não podem passar diretamente de:

```text
OPEN → RESOLVED
```

O fluxo obrigatório é:

```text
OPEN → IN_PROGRESS → RESOLVED
```

Essa regra será aplicada no backend.

### Histórico

Toda alteração de status deve gerar um registro no histórico contendo:

* status anterior;
* novo status;
* responsável pela alteração;
* data da alteração.

### Dashboard

Criar um endpoint com informações resumidas dos incidentes:

* total;
* abertos;
* em andamento;
* resolvidos;
* quantidade por severidade.

---

## 3. Change Request — Comentários e Timeline

Durante o desenvolvimento foi solicitado um novo requisito:

* permitir comentários nos incidentes;
* permitir vários comentários por incidente;
* registrar autor, conteúdo e data;
* impedir comentários vazios;
* manter os comentários persistidos;
* criar uma timeline única de atividades.

A timeline deve juntar:

* alterações de status;
* comentários.

Os eventos devem aparecer em ordem cronológica.

### Decisão técnica

Não será criada uma tabela específica para timeline.

Os comentários e alterações de status continuarão sendo armazenados separadamente:

```text
IncidentComment
IncidentHistory
```

A aplicação combina os dois registros na camada de serviço para montar a timeline.

Essa decisão evita duplicação de dados e mantém cada tipo de informação com sua responsabilidade.

---

## 4. Ordem de desenvolvimento

A implementação foi dividida da seguinte forma:

1. Configuração do projeto.
2. Configuração do PostgreSQL e Prisma.
3. Criação do modelo de incidentes.
4. Criação da API de incidentes.
5. Implementação dos filtros.
6. Implementação das regras de status.
7. Implementação do histórico.
8. Implementação do dashboard.
9. Implementação dos comentários.
10. Implementação da timeline.
11. Criação dos testes automatizados.
12. Seed do banco.
13. Documentação.
14. Revisão final e entrega.

---

## 5. Testes

Os testes devem validar principalmente as regras de negócio e não apenas os endpoints.

Serão testados:

* criação de incidentes;
* validação dos dados;
* listagem;
* filtros;
* alteração de status;
* regra de incidentes críticos;
* histórico;
* dashboard;
* criação de comentários;
* validação de comentários;
* persistência dos comentários;
* timeline;
* ordem cronológica da timeline.

A suíte atual possui **20 testes automatizados**.

---

## 6. Critérios de aceitação

O projeto será considerado funcional quando:

* for possível criar um incidente;
* os incidentes forem persistidos no PostgreSQL;
* for possível consultar e filtrar incidentes;
* a regra de incidentes críticos for respeitada;
* as alterações de status forem registradas;
* o dashboard apresentar os dados corretamente;
* for possível adicionar vários comentários;
* comentários vazios forem rejeitados;
* comentários permanecerem persistidos;
* a timeline reunir comentários e alterações de status;
* a timeline estiver em ordem cronológica;
* os testes automatizados passarem;
* o projeto compilar sem erros.

---

## 7. Riscos e cuidados

### Regra de status

Existe risco de permitir uma transição de status inválida.

**Tratamento:** concentrar a regra na camada de serviço e testar o fluxo crítico.

### Persistência

Os dados precisam continuar disponíveis após reiniciar a aplicação.

**Tratamento:** utilizar PostgreSQL com Prisma.

### Timeline

Existe risco de duplicar informações ou criar inconsistência entre histórico e comentários.

**Tratamento:** manter as entidades separadas e montar a timeline a partir dos registros existentes.

### Validação

Dados inválidos podem comprometer o funcionamento da API.

**Tratamento:** utilizar Zod para validar as entradas.

---

## 8. Resultado esperado

Ao final, o Incident Hub deverá permitir que uma equipe registre um incidente, acompanhe sua evolução, registre comentários e consulte todo o histórico de atividades em uma única timeline.

O backend será a parte principal do sistema, com foco em regras de negócio, persistência, rastreabilidade e testes.
