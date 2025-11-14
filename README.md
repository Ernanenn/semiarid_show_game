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
  - Vite
  - Styled Components
  - React Hooks

* **Backend:**
  - Node.js
  - Express
  - SQLite (sql.js)

## Pré-requisitos
- Node.js 18+ instalado
- npm ou yarn

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

- `npm run dev` - Inicia apenas o frontend (Vite)
- `npm run dev:server` - Inicia apenas o backend (Express com nodemon)
- `npm run dev:full` - Inicia frontend e backend simultaneamente
- `npm run build` - Gera build de produção do frontend
- `npm run preview` - Visualiza o build de produção
- `npm run start:server` - Inicia o backend em modo produção
- `npm run lint` - Executa o linter
- `npm run lint:fix` - Corrige automaticamente problemas do linter

## Estrutura do Projeto

```
├── src/                          # Código fonte do frontend
│   ├── app/                     # Configuração da aplicação
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
│   │   ├── types/           # Types/interfaces
│   │   └── utils/            # Utilitários
│   ├── assets/              # Assets estáticos
│   ├── styles/              # Tema e estilos globais
│   └── main.jsx             # Entry point
├── server/                    # Código fonte do backend
│   ├── config/              # Configurações
│   ├── db/                  # Banco de dados SQLite
│   ├── repositories/        # Camada de dados
│   └── routes/              # Rotas da API
├── data/                     # Banco de dados SQLite (gerado automaticamente)
└── package.json             # Dependências e scripts
```

### Arquitetura

O projeto segue uma arquitetura moderna baseada em **features** (funcionalidades), com separação clara de responsabilidades:

- **Features**: Organização por domínio/funcionalidade (game, scores, welcome)
- **Hooks Customizados**: Lógica de negócio reutilizável
- **Services Layer**: Abstração de lógica de negócio e comunicação com API
- **Shared Code**: Componentes UI, utilitários, constantes e types compartilhados

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

## Como Jogar
1. Acesse http://localhost:3000 no navegador
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

## Desenvolvimento

### Adicionar Novas Perguntas
Edite o arquivo `src/data/questions.js` e adicione novas perguntas no formato:

```javascript
{
  id: 'pergunta-1',
  question: 'Sua pergunta aqui?',
  answers: [
    { id: 'a', text: 'Resposta A', correct: false },
    { id: 'b', text: 'Resposta B', correct: true },
    { id: 'c', text: 'Resposta C', correct: false },
    { id: 'd', text: 'Resposta D', correct: false }
  ]
}
```

## Contribuição
Contribuições são bem-vindas! Se você tiver sugestões de melhorias ou correções de bugs, sinta-se à vontade para abrir uma issue ou enviar um pull request.

## Autor
Ernane Nogueira Nunes

## Licença
Este projeto é privado.
