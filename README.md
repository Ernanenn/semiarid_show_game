# Show do Semiárido

## Descrição
"Show do Semiárido" é um jogo de perguntas e respostas interativo e divertido sobre as tradições, história e curiosidades do semiárido brasileiro. Desenvolvido com React, Express e SQLite, este quiz permite que os jogadores testem seus conhecimentos, compartilhem seus resultados e comparem suas pontuações com outros jogadores em um ranking global persistente.

## Funcionalidades
* **Interface Moderna:** Design intuitivo e responsivo com React e Styled Components
* **Perguntas Aleatórias:** As perguntas são embaralhadas para garantir uma experiência única a cada jogo
* **Feedback Imediato:** Os jogadores recebem feedback imediato sobre suas respostas com sons e animações
* **Leitura por Voz:** Perguntas e alternativas são lidas automaticamente usando Responsive Voice
* **Ranking Persistente:** Pontuações armazenadas em banco de dados SQLite
* **API REST:** Backend Express com endpoints para scores
* **Responsividade:** O jogo é adaptável a diferentes tamanhos de tela

## Tecnologias Utilizadas
* **Frontend:**
  - React 18
  - TypeScript
  - Vite
  - Styled Components
  - React Hooks
  - Vitest (testes)

* **Backend:**
  - Node.js
  - Express
  - SQLite3 (better-sqlite3)
  - Swagger/OpenAPI (documentação)

* **Ferramentas:**
  - TypeScript
  - Prettier (formatação)
  - ESLint (linting)
  - Vitest (testes unitários e integração)

## Pré-requisitos
- Node.js 20.x, 22.x ou 24.x instalado
- npm 10+ ou yarn
- Visual Studio Build Tools (Windows) - necessário para compilar `better-sqlite3`

## Como Executar Localmente

### 1. Instalar Dependências
```bash
npm install
```

### 2. Configurar Variáveis de Ambiente
Crie um arquivo `.env` na raiz do projeto com o seguinte conteúdo:

```env
PORT=4000
CLIENT_ORIGIN=http://localhost:3000
DATABASE_PATH=./data/app.sqlite
VITE_API_URL=http://localhost:4000
```

### 3. Executar a Aplicação

#### Opção 1: Executar Frontend e Backend Juntos (Recomendado)
```bash
npm run dev:full
```

Este comando inicia:
- **Frontend** na porta `3000` (http://localhost:3000)
- **Backend** na porta `4000` (http://localhost:4000)

#### Opção 2: Executar Separadamente

**Terminal 1 - Frontend:**
```bash
npm run dev
```

**Terminal 2 - Backend:**
```bash
npm run dev:server
```

### 4. Acessar a Aplicação
Abra seu navegador e acesse: **http://localhost:3000**

## Scripts Disponíveis

### Desenvolvimento
- `npm run dev` - Inicia apenas o frontend (Vite)
- `npm run dev:server` - Inicia apenas o backend (Express com nodemon)
- `npm run dev:full` - Inicia frontend e backend simultaneamente

### Build e Deploy
- `npm run build` - Gera build de produção do frontend (TypeScript + Vite)
- `npm run preview` - Visualiza o build de produção
- `npm run start:server` - Inicia o backend em modo produção

### Qualidade de Código
- `npm run lint` - Executa o linter
- `npm run lint:fix` - Corrige automaticamente problemas do linter
- `npm run format` - Formata o código com Prettier
- `npm run format:check` - Verifica formatação sem alterar arquivos
- `npm run type-check` - Verifica tipos TypeScript sem gerar build

### Testes
- `npm test` - Executa todos os testes
- `npm run test:watch` - Executa testes em modo watch
- `npm run test:ui` - Executa testes com interface gráfica
- `npm run test:coverage` - Executa testes com relatório de cobertura

## Estrutura do Projeto

```
├── src/                          # Código fonte do frontend
│   ├── features/                 # Features organizadas por domínio
│   │   ├── game/               # Feature do jogo
│   │   │   ├── components/     # QuizScreen, GameOverScreen
│   │   │   ├── hooks/         # useGame, useQuiz, useVoiceReading
│   │   │   └── services/      # QuestionService
│   │   ├── scores/            # Feature de pontuações
│   │   │   ├── components/   # HighScoresTable
│   │   │   ├── hooks/        # useScores
│   │   │   └── services/     # ScoreService
│   │   └── welcome/          # Feature de boas-vindas
│   │       └── components/  # WelcomeScreen
│   ├── shared/                # Código compartilhado
│   │   ├── api/              # Cliente API
│   │   ├── components/       # Componentes reutilizáveis (UI)
│   │   ├── constants/        # Constantes
│   │   ├── data/            # Dados do quiz
│   │   ├── types/           # Tipos TypeScript
│   │   └── utils/            # Utilitários
│   ├── assets/              # Assets estáticos
│   ├── styles/              # Tema e estilos globais
│   ├── test/                # Configuração de testes
│   ├── types/               # Definições de tipos
│   ├── App.tsx              # Componente principal
│   └── main.tsx            # Entry point
├── server/                    # Código fonte do backend
│   ├── config/              # Configurações
│   ├── db/                  # Banco de dados SQLite
│   │   ├── sqlite3.js       # Implementação SQLite3
│   │   └── schema.sql       # Schema do banco
│   ├── repositories/        # Camada de dados
│   ├── routes/              # Rotas da API
│   └── swagger.js           # Configuração Swagger
├── data/                     # Banco de dados SQLite (gerado automaticamente)
├── tsconfig.json            # Configuração TypeScript
├── vite.config.ts           # Configuração Vite
├── vitest.config.ts         # Configuração Vitest
└── package.json             # Dependências e scripts
```

### Arquitetura

O projeto segue uma arquitetura moderna baseada em **features** (funcionalidades), com separação clara de responsabilidades:

- **Features**: Organização por domínio/funcionalidade (game, scores, welcome)
- **Hooks Customizados**: Lógica de negócio reutilizável
- **Services Layer**: Abstração de lógica de negócio e comunicação com API
- **Shared Code**: Componentes UI, utilitários, constantes compartilhados

Veja mais detalhes em `ARCHITECTURE.md`.

## API Endpoints

### Health Check
- `GET /api/health` - Verifica status do servidor e banco de dados

### Scores
- `POST /api/scores` - Registra uma nova pontuação
  ```json
  {
    "name": "Nome do Jogador",
    "location": "Cidade",
    "state": "Estado",
    "scorePercentage": 85,
    "correctAnswers": 17,
    "totalQuestions": 20
  }
  ```

- `GET /api/scores/top?limit=10` - Retorna o ranking (top N pontuações)

## Deploy Separado (Frontend + Backend)

Este projeto está configurado para deploy separado:
- **Frontend**: Netlify
- **Backend**: Render (com SQLite3)

### Deploy do Backend no Render

#### 1. Criar Conta no Render
1. Acesse [render.com](https://render.com) e crie uma conta (pode usar GitHub)
2. Conecte seu repositório GitHub

#### 2. Criar Novo Web Service (Backend)
1. No dashboard do Render, clique em "New +" → "Web Service"
2. Conecte o repositório `semiarid_show_game`
3. Configure o serviço:
   - **Name**: `show-semiarido-api` (ou o nome que preferir)
   - **Root Directory**: Deixe vazio (raiz do projeto)
   - **Environment**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Plan**: Escolha o plano gratuito ou pago

#### 3. Configurar Volume Persistente (IMPORTANTE)
Para garantir que os dados não sejam perdidos quando o container reiniciar:

1. No painel do serviço, vá em "Settings" → "Disk"
2. Clique em "Add Disk"
3. Configure:
   - **Name**: `database-storage`
   - **Mount Path**: `/opt/render/project/src/data`
   - **Size**: 1 GB (suficiente para o banco SQLite)

**⚠️ IMPORTANTE**: Sem o volume persistente, os dados serão perdidos a cada reinicialização do container!

#### 4. Configurar Variáveis de Ambiente
No painel do serviço, vá em "Environment" e adicione:

```
NODE_ENV=production
PORT=10000
DATABASE_PATH=/opt/render/project/src/data/app.sqlite
CLIENT_ORIGIN=https://seu-app.netlify.app
```

**Importante**: 
- Substitua `seu-app.netlify.app` pela URL do Netlify que você receberá após o deploy do frontend
- Você pode atualizar essa variável depois do deploy do frontend
- O `DATABASE_PATH` deve apontar para o caminho do volume persistente

#### 5. Deploy
1. Clique em "Create Web Service"
2. O Render irá:
   - Instalar as dependências
   - Criar o volume persistente
   - Inicializar o banco de dados no volume
   - Iniciar o servidor

3. **Anote a URL do backend** (ex: `https://show-semiarido-api.onrender.com`)

**Nota**: Se você já tem um serviço criado sem volume persistente:
- Vá em "Settings" → "Disk" e adicione o volume
- Atualize a variável `DATABASE_PATH` para o caminho do volume
- Faça um redeploy

### Deploy do Frontend no Netlify

#### 1. Criar Conta no Netlify
1. Acesse [netlify.com](https://netlify.com) e crie uma conta (pode usar GitHub)
2. Conecte seu repositório GitHub

#### 2. Criar Novo Site
1. No dashboard do Netlify, clique em "Add new site" → "Import an existing project"
2. Selecione o repositório `semiarid_show_game`
3. Configure o build:
   - **Build command**: `npm run build`
   - **Publish directory**: `dist`
   - **Base directory**: (deixe vazio)

#### 3. Configurar Variáveis de Ambiente
No painel do site, vá em "Site settings" → "Environment variables" e adicione:

```
VITE_API_URL=https://show-semiarido-api.onrender.com
```

**Importante**: Substitua `show-semiarido-api.onrender.com` pela URL real do seu backend no Render.

#### 4. Deploy
1. Clique em "Deploy site"
2. O Netlify irá:
   - Instalar as dependências
   - Fazer o build do frontend
   - Publicar o site

3. **Anote a URL do frontend** (ex: `https://show-semiarido.netlify.app`)

#### 5. Atualizar CLIENT_ORIGIN no Render
Após obter a URL do Netlify, volte ao Render e atualize a variável `CLIENT_ORIGIN`:
- Vá em "Environment" do serviço backend
- Atualize `CLIENT_ORIGIN` para a URL do Netlify
- O Render fará um redeploy automaticamente

## Como Jogar
1. Acesse a URL do Netlify no navegador
2. Digite seu nome, cidade e estado nos campos solicitados
3. Clique no botão "Iniciar Quiz"
4. As perguntas e alternativas serão lidas automaticamente
5. Responda às perguntas clicando nas opções de resposta
6. Ao acertar, você ouvirá palmas e poderá avançar para a próxima pergunta
7. Ao errar ou finalizar todas as perguntas, sua pontuação será exibida
8. Sua pontuação será automaticamente salva no ranking
9. Veja o ranking na tela inicial
10. Clique em "Jogar novamente" para reiniciar

## Banco de Dados

O banco de dados SQLite é criado automaticamente na primeira execução em `./data/app.sqlite`. As tabelas são criadas automaticamente através de migrations.

### Estrutura do Banco:
- **players**: Armazena informações dos jogadores
- **scores**: Armazena pontuações dos jogadores
- **answers**: (Reservado para futuras funcionalidades)

**Nota sobre persistência no Render**: 
- ✅ **Com volume persistente**: Os dados são mantidos mesmo após reinicializações e novos deploys
- ⚠️ **Sem volume persistente**: O sistema de arquivos é efêmero e os dados serão perdidos quando o container reiniciar
- 📝 **Configuração**: Veja a seção "Deploy do Backend no Render" acima para configurar o volume persistente
- 💡 **Alternativa**: Para aplicações críticas, considere migrar para PostgreSQL (banco gerenciado pelo Render)

## Desenvolvimento

### Adicionar Novas Perguntas
Edite o arquivo `src/shared/data/questions.ts` e adicione novas perguntas no formato:

```typescript
{
  question: 'Sua pergunta aqui?',
  answers: [
    { text: 'Resposta A', correct: false },
    { text: 'Resposta B', correct: true },
    { text: 'Resposta C', correct: false },
    { text: 'Resposta D', correct: false }
  ]
}
```

**Nota:** O `id` é gerado automaticamente. Veja `ARCHITECTURE.md` para mais detalhes sobre a estrutura do projeto.

## Testes

O projeto inclui testes unitários e de integração usando Vitest e Testing Library:

```bash
# Executar todos os testes
npm test

# Executar testes em modo watch
npm run test:watch

# Executar testes com UI
npm run test:ui

# Ver cobertura de testes
npm run test:coverage
```

## Documentação Adicional

- **Arquitetura**: Veja `ARCHITECTURE.md` para detalhes sobre a estrutura do projeto

## Contribuição
Contribuições são bem-vindas! Se você tiver sugestões de melhorias ou correções de bugs, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Autor
Ernane Nogueira Nunes

## Licença
Este projeto é privado.
