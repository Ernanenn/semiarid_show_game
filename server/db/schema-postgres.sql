-- PostgreSQL Schema for Show do Semiárido

CREATE TABLE IF NOT EXISTS players (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255),
    state VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS scores (
    id SERIAL PRIMARY KEY,
    player_id INTEGER NOT NULL,
    score_percentage INTEGER NOT NULL,
    correct_answers INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (player_id) REFERENCES players (id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS answers (
    id SERIAL PRIMARY KEY,
    score_id INTEGER NOT NULL,
    question_id VARCHAR(255) NOT NULL,
    answer_id VARCHAR(255) NOT NULL,
    answer_text TEXT,
    correct BOOLEAN NOT NULL DEFAULT false,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (score_id) REFERENCES scores (id) ON DELETE CASCADE
);

CREATE INDEX IF NOT EXISTS idx_scores_player_id ON scores (player_id);
CREATE INDEX IF NOT EXISTS idx_answers_score_id ON answers (score_id);
CREATE INDEX IF NOT EXISTS idx_scores_percentage ON scores (score_percentage DESC, created_at DESC);

