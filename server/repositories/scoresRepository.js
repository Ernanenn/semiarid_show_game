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

  async getTopScores(limit = 10, filters = {}) {
    let query = `
      SELECT 
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
      WHERE 1=1
    `;
    const params = [];

    // Filtro por estado
    if (filters.state && filters.state.trim()) {
      query += ` AND p.state LIKE ?`;
      params.push(`%${filters.state.trim()}%`);
    }

    // Filtro por cidade
    if (filters.location && filters.location.trim()) {
      query += ` AND p.location LIKE ?`;
      params.push(`%${filters.location.trim()}%`);
    }

    // Filtro por data (últimos X dias)
    if (filters.days) {
      const days = parseInt(filters.days, 10);
      if (days > 0) {
        query += ` AND datetime(s.created_at) >= datetime('now', '-' || ? || ' days')`;
        params.push(days.toString());
      }
    }

    query += ` ORDER BY s.score_percentage DESC, s.created_at DESC LIMIT ?`;
    params.push(limit);

    return this.db.all(query, params);
  }

  async getStates() {
    return this.db.all(
      `SELECT DISTINCT state FROM players WHERE state IS NOT NULL AND state != '' ORDER BY state`
    );
  }

  async getLocations(state = null) {
    if (state) {
      return this.db.all(
        `SELECT DISTINCT location FROM players WHERE location IS NOT NULL AND location != '' AND state = ? ORDER BY location`,
        [state]
      );
    }
    return this.db.all(
      `SELECT DISTINCT location FROM players WHERE location IS NOT NULL AND location != '' ORDER BY location`
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

