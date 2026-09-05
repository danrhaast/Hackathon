# START.md

# Como iniciar o Incident Hub

## 1. Entrar na pasta do projeto

O sistema está localizado dentro da pasta `incident_hub`.

Se o terminal estiver na raiz `Hackathon`, execute:

```bash
cd incident_hub
```

**Não execute `npm run dev` diretamente na raiz `Hackathon`.**

O `package.json` da aplicação está dentro da pasta `incident_hub`.

## 2. Instalar dependências

Dentro de `incident_hub`:

```bash
npm install
```

## 3. Configurar o banco

O projeto utiliza PostgreSQL.

Crie/configure o arquivo `.env`:

```env
PORT=3000
DATABASE_URL="postgresql://postgres:SUA_SENHA@localhost:5432/incident_hub?schema=public"
```

A senha deve ser substituída pela senha do PostgreSQL utilizado no ambiente.

## 4. Executar as migrations

```bash
npx prisma migrate dev
```

## 5. Popular o banco

```bash
npm run seed
```

## 6. Iniciar o sistema

```bash
npm run dev
```

O sistema ficará disponível em:

```text
http://localhost:3000
```

## Fluxo completo

```text
Hackathon
   ↓
cd incident_hub
   ↓
npm install
   ↓
npx prisma migrate dev
   ↓
npm run seed
   ↓
npm run dev
   ↓
http://localhost:3000
```

## Testes

Para executar os testes:

```bash
npm run test:run
```

Resultado esperado:

```text
Test Files  1 passed
Tests       20 passed
```

## Build

Para verificar a compilação:

```bash
npm run build
```

## Observação

O sistema foi desenvolvido para ser executado a partir da pasta `incident_hub`.

Caso o comando `npm run dev` seja executado na raiz `Hackathon`, o Incident Hub não será iniciado porque os arquivos de configuração e o `package.json` da aplicação estão dentro de `incident_hub`.
