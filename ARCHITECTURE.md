# Arquitetura do Projeto

## Estrutura de Pastas

### Frontend (`src/`)

```
src/
├── app/                    # Configuração da aplicação
│   └── providers/         # Context providers (se necessário)
├── features/              # Features organizadas por domínio
│   ├── game/              # Feature do jogo
│   │   ├── components/   # Componentes específicos do jogo
│   │   ├── hooks/        # Custom hooks do jogo
│   │   └── services/     # Services da feature
│   ├── scores/           # Feature de pontuações
│   │   ├── components/   # Componentes de pontuações
│   │   ├── hooks/        # Hooks de pontuações
│   │   └── services/     # Services de pontuações
│   └── welcome/          # Feature de boas-vindas
│       └── components/   # Componentes de boas-vindas
├── shared/                # Código compartilhado
│   ├── api/              # Cliente API
│   ├── components/       # Componentes reutilizáveis (UI)
│   │   └── ui/           # Componentes de UI base
│   ├── constants/        # Constantes
│   ├── types/            # Types/interfaces
│   └── utils/            # Utilitários
├── assets/               # Assets estáticos
├── styles/               # Estilos globais (GlobalStyle.ts, theme.ts)
├── test/                 # Configuração de testes (setup.ts)
├── types/                # Definições de tipos TypeScript
├── App.tsx               # Componente principal
└── main.tsx              # Entry point
```

### Backend (`server/`)

```
server/
├── config/               # Configurações (env.js)
├── db/                  # Banco de dados
│   ├── sqlite3.js      # Implementação SQLite3 (better-sqlite3)
│   └── schema.sql      # Schema do banco de dados
├── repositories/        # Camada de dados (scoresRepository.js)
├── routes/              # Rotas da API (scores.js)
├── swagger.js           # Configuração Swagger/OpenAPI
├── app.js               # Configuração Express
└── index.js             # Entry point
```

## Princípios Arquiteturais

### 1. Feature-Based Structure
- Organização por features/funcionalidades
- Cada feature contém seus próprios componentes, hooks e services
- Facilita manutenção e escalabilidade

### 2. Separation of Concerns
- **Components**: Apenas apresentação
- **Hooks**: Lógica de estado e efeitos
- **Services**: Lógica de negócio e comunicação com API
- **Utils**: Funções utilitárias puras

### 3. Shared Code
- Componentes UI reutilizáveis em `shared/components/ui`
- Utilitários compartilhados em `shared/utils`
- Types e constantes em `shared/types` e `shared/constants`

### 4. Custom Hooks
- Lógica de negócio extraída para hooks customizados
- Facilita reutilização e testes
- Exemplos: `useGame`, `useQuiz`, `useScores`, `useVoiceReading`

### 5. Services Layer
- Services encapsulam comunicação com API e lógica de negócio
- Exemplos: `QuestionService`, `ScoreService`

## Padrões Utilizados

- **Custom Hooks Pattern**: Para lógica reutilizável
- **Service Pattern**: Para abstrair lógica de negócio
- **Component Composition**: Componentes pequenos e focados
- **Separation of Concerns**: Cada camada com responsabilidade única

