export class ScoresRepository {
  constructor(db) {
    this.db = db;
  }

  async createPlayer({ name, location, state }) {
    const result = await this.db.run(
      `INSERT INTO players (name, location, state) VALUES (?, ?, ?)`,
      [name || '', location || null, state || null]
    );
    return result.lastInsertRowid;
  }

  async createScore({ playerId, scorePercentage, correctAnswers, totalQuestions }) {
    const result = await this.db.run(
      `INSERT INTO scores (player_id, score_percentage, correct_answers, total_questions) VALUES (?, ?, ?, ?)`,
      [playerId, scorePercentage, correctAnswers, totalQuestions]
    );
    return result.lastInsertRowid;
  }

  async getTopScores(limit = 10) {
    return this.db.all(
      `SELECT 
        s.id,
        s.score_percentage,
        s.correct_answers,
        s.total_questions,
        s.created_at,
        p.name,
        p.location,
        p.state
      FROM scores s
      INNER JOIN players p ON s.player_id = p.id
      ORDER BY s.score_percentage DESC, s.created_at DESC
      LIMIT ?`,
      [limit]
    );
  }

  async getPlayerScores(playerId, limit = 10) {
    return this.db.all(
      `SELECT 
        id,
        score_percentage,
        correct_answers,
        total_questions,
        created_at
      FROM scores
      WHERE player_id = ?
      ORDER BY created_at DESC
      LIMIT ?`,
      [playerId, limit]
    );
  }
}

