# PLAN.md

## 1. Entendimento

O problema é que os incidentes da operação são acompanhados de forma informal. Isso dificulta saber quais problemas estão acontecendo, quem é o responsável, qual a gravidade e em que situação cada incidente está.

A ideia é criar o Incident Hub para centralizar essas informações em um único lugar.

O sistema deve permitir criar, acompanhar e resolver incidentes, além de manter um histórico das mudanças de status.

---

## 2. Escopo

### Obrigatório

* Criar incidentes
* Listar os incidentes
* Filtrar por status e severidade
* Ver os detalhes de um incidente
* Alterar o status
* Controlar a regra dos incidentes críticos
* Salvar o histórico das mudanças de status
* Mostrar um dashboard com os principais números
* Manter os dados salvos
* Criar alguns incidentes iniciais
* Criar testes para as principais regras

### Desejável

* Melhorar a aparência da aplicação
* Melhorar as mensagens para o usuário
* Pequenas melhorias de usabilidade

### Fora do escopo

* Login
* Sistema de permissões
* Multi-tenancy
* Integrações externas
* Funcionalidades muito complexas

---

## 3. Decisões técnicas

Vou utilizar uma estrutura simples para conseguir desenvolver, testar e corrigir o sistema rapidamente.

A aplicação terá uma separação entre:

* Interface
* Regras do sistema
* Banco de dados
* Testes

Para a persistência, vou utilizar um banco local para que os dados continuem existindo mesmo depois de reiniciar a aplicação.

As regras mais importantes ficarão no lado do servidor para evitar que uma regra seja burlada apenas pela interface.

---

## 4. Desenvolvimento

Vou desenvolver o projeto por partes, sempre testando o que foi feito antes de continuar.

1. Criar a estrutura inicial
2. Configurar o banco de dados
3. Criar os incidentes
4. Criar a tela de cadastro
5. Criar a listagem e os filtros
6. Criar a tela de detalhes
7. Implementar a alteração de status
8. Implementar a regra para incidentes críticos
9. Criar o histórico
10. Criar o dashboard
11. Criar os testes
12. Corrigir problemas encontrados
13. Fazer a validação final
14. Finalizar a documentação

---

## 5. Critérios de aceite

Vou considerar o sistema funcionando quando:

* Consigo criar um incidente.
* Um novo incidente começa como `Open`.
* Consigo visualizar e filtrar os incidentes.
* Consigo abrir os detalhes de um incidente.
* Consigo alterar o status.
* Um incidente `Critical` não pode ir diretamente de `Open` para `Resolved`.
* As alterações de status ficam registradas no histórico.
* O dashboard apresenta os números corretos.
* Os dados continuam salvos depois de reiniciar a aplicação.
* As principais regras possuem testes.

---

## 6. Riscos

Os principais riscos que vejo são:

* Gastar tempo criando coisas que não são necessárias.
* A IA gerar código incorreto.
* Criar uma estrutura muito complexa.
* Deixar os testes para o final.
* Ter problemas na integração entre as partes.

Para evitar isso, vou trabalhar em pequenas etapas e validar cada parte antes de seguir.

---

## 7. Estratégia de IA

Vou utilizar a IA durante todo o desenvolvimento para criar código, testes, configurações e ajudar na investigação de problemas.

Minha estratégia será:

1. Explicar o problema para a IA.
2. Passar uma tarefa pequena por vez.
3. Pedir para a IA implementar.
4. Executar a aplicação.
5. Testar o que foi feito.
6. Se houver erro, investigar com a IA.
7. Corrigir e testar novamente.
8. Só depois continuar para a próxima etapa.

Não vou assumir que o código gerado pela IA está correto. A aplicação será executada e testada durante o desenvolvimento.
