# Guia de Migração - Nova Arquitetura

## Resumo das Mudanças

A aplicação foi reorganizada seguindo uma arquitetura moderna baseada em **features** (funcionalidades), com separação clara de responsabilidades.

## Nova Estrutura

### Frontend

```
src/
├── app/                          # Configuração da aplicação
│   └── providers/               # Context providers
├── features/                     # Features organizadas por domínio
│   ├── game/                    # Feature do jogo
│   │   ├── components/          # QuizScreen, GameOverScreen
│   │   ├── hooks/              # useGame, useQuiz, useVoiceReading
│   │   └── services/           # QuestionService
│   ├── scores/                  # Feature de pontuações
│   │   ├── components/         # HighScoresTable
│   │   ├── hooks/              # useScores
│   │   └── services/           # ScoreService
│   └── welcome/                # Feature de boas-vindas
│       └── components/         # WelcomeScreen
├── shared/                       # Código compartilhado
│   ├── api/                    # Cliente API
│   ├── components/             # Componentes reutilizáveis
│   │   ├── ui/                # Button, Input, Panel, Modal
│   │   └── ErrorBoundary.jsx
│   ├── constants/             # Constantes (GAME_STATES, etc.)
│   ├── data/                  # Dados (questions.js)
│   ├── types/                 # Types/interfaces
│   └── utils/                 # Utilitários (shuffle, audios, responsiveVoice)
├── assets/                     # Assets estáticos
├── styles/                     # Estilos globais
└── main.jsx                    # Entry point
```

## Mudanças Principais

### 1. Componentes Movidos

- `components/WelcomeScreen.jsx` → `features/welcome/components/WelcomeScreen.jsx`
- `components/QuizScreen.jsx` → `features/game/components/QuizScreen.jsx`
- `components/HighScoresTable.jsx` → `features/scores/components/HighScoresTable.jsx`
- `components/ErrorBoundary.jsx` → `shared/components/ErrorBoundary.jsx`
- `components/ui/*` → `shared/components/ui/*`

### 2. Utilitários Movidos

- `utils/shuffle.js` → `shared/utils/shuffle.js`
- `utils/audios.js` → `shared/utils/audios.js`
- `utils/responsiveVoice.js` → `shared/utils/responsiveVoice.js`
- `utils/index.js` → `shared/utils/index.js` (barrel export)

### 3. API Client Movido

- `api/client.js` → `shared/api/client.js`

### 4. Dados Movidos

- `data/questions.js` → `shared/data/questions.js`

### 5. Novos Hooks Customizados

- `features/game/hooks/useGame.js` - Gerencia estado do jogo
- `features/game/hooks/useQuiz.js` - Gerencia lógica do quiz
- `features/game/hooks/useVoiceReading.js` - Gerencia leitura por voz
- `features/scores/hooks/useScores.js` - Gerencia pontuações

### 6. Novos Services

- `features/game/services/questionService.js` - Lógica de questões
- `features/scores/services/scoreService.js` - Lógica de pontuações

### 7. Novos Componentes

- `features/game/components/GameOverScreen.jsx` - Tela de fim de jogo (extraída do App.jsx)

### 8. Constantes e Types

- `shared/constants/index.js` - Constantes centralizadas
- `shared/types/index.js` - Types/interfaces compartilhadas

## Benefícios da Nova Arquitetura

1. **Organização por Features**: Fácil localizar código relacionado
2. **Separation of Concerns**: Cada camada com responsabilidade única
3. **Reutilização**: Hooks e services reutilizáveis
4. **Manutenibilidade**: Código mais fácil de manter e testar
5. **Escalabilidade**: Fácil adicionar novas features

## Próximos Passos (Opcional)

- [ ] Refatorar backend seguindo clean architecture
- [ ] Adicionar testes unitários
- [ ] Adicionar documentação JSDoc completa
- [ ] Implementar Context API se necessário para estado global

