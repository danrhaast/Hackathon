# PLAN.md

## Objetivo

Criar um sistema chamado **Incident Hub** para registrar, acompanhar e resolver incidentes operacionais.

A ideia principal é ter um lugar único para controlar os incidentes e saber o que aconteceu com cada um deles.

## O que o sistema precisa fazer

* Criar incidentes
* Listar incidentes
* Filtrar por status
* Filtrar por severidade
* Ver detalhes
* Alterar status
* Registrar histórico
* Mostrar dashboard
* Adicionar comentários
* Mostrar uma timeline das atividades
* Manter os dados salvos mesmo depois de reiniciar o sistema

## Regra importante

Os status serão:

```text
Open → In Progress → Resolved
```

Incidentes **Critical** não podem passar diretamente de:

```text
Open → Resolved
```

Eles precisam obrigatoriamente passar por:

```text
Open → In Progress → Resolved
```

Essa regra deve ser controlada pelo backend.

## Change Request

Foi adicionada uma nova necessidade ao projeto:

* permitir comentários nos incidentes
* permitir vários comentários por incidente
* exigir autor e conteúdo
* salvar os comentários no banco
* mostrar comentários na timeline
* juntar comentários e alterações de status em uma única timeline cronológica

A decisão foi manter comentários e histórico de status em estruturas separadas no banco e montar a timeline no service.

Assim o sistema mantém os dados organizados e a timeline pode reunir diferentes tipos de eventos.

## Estrutura técnica

Vou utilizar:

* Node.js
* TypeScript
* Express
* PostgreSQL
* Prisma
* Zod
* Vitest
* Supertest

A aplicação será separada em:

```text
Controller
    ↓
Service
    ↓
Repository
    ↓
Database
```

O frontend será simples, utilizando HTML, CSS e JavaScript, porque o foco principal é o funcionamento do sistema e das regras de negócio.

## Ordem de desenvolvimento

1. Preparar o projeto
2. Configurar banco de dados
3. Criar modelo de incidentes
4. Criar API
5. Criar regras de negócio
6. Criar histórico
7. Criar dashboard
8. Implementar Change Request
9. Criar comentários
10. Criar timeline
11. Criar frontend
12. Fazer validação manual
13. Executar build
14. Executar testes automatizados
15. Revisar documentação
16. Fazer commit e entrega

## Uso de IA

A IA foi utilizada durante praticamente todo o ciclo de desenvolvimento como apoio de engenharia.

Ela ajudou principalmente na:

* interpretação dos requisitos
* estruturação do projeto
* planejamento
* implementação
* revisão
* identificação de erros
* criação dos testes
* documentação

Esse processo permitiu acelerar bastante o desenvolvimento dentro do tempo limitado do hackathon.

Mesmo utilizando IA, as decisões finais foram avaliadas e validadas durante a execução do sistema.

## Testes

Os testes automatizados foram executados após a implementação das funcionalidades.

Foram validados:

* criação
* filtros
* status
* regra de Critical
* histórico
* dashboard
* comentários
* persistência
* timeline

Resultado final:

```text
20 testes passando
20 testes executados
0 testes falhando
```

## Critérios de aceitação

O projeto será considerado concluído quando:

* [x] For possível criar incidentes
* [x] For possível listar incidentes
* [x] Os filtros funcionarem
* [x] Os detalhes funcionarem
* [x] A alteração de status funcionar
* [x] A regra de Critical funcionar
* [x] O histórico for salvo
* [x] O dashboard funcionar
* [x] Comentários puderem ser criados
* [x] Comentários forem persistidos
* [x] A timeline reunir todas as atividades
* [x] Os dados persistirem após reinicialização
* [x] O frontend funcionar
* [x] O build funcionar
* [x] Os testes passarem

## Resultado

O plano foi executado e o sistema foi finalizado com todas as funcionalidades principais funcionando.

O desenvolvimento foi acelerado com o uso de IA, principalmente nas etapas de implementação, revisão e resolução de problemas, permitindo chegar a uma versão funcional dentro do período disponível.

O resultado final possui backend, banco de dados, frontend, regras de negócio, persistência, testes automatizados e documentação.
