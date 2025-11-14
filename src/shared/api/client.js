// In production, use relative URL (same origin)
// In development, use VITE_API_URL or default to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.PROD ? '' : 'http://localhost:4000');

class ApiClient {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  async request(endpoint, options = {}) {
    const url = `${this.baseUrl}${endpoint}`;
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        const error = await response.json().catch(() => ({ error: 'Erro desconhecido' }));
        throw new Error(error.error || `HTTP ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error(`Erro na requisição ${endpoint}:`, error);
      throw error;
    }
  }

  async saveScore(scoreData) {
    return this.request('/api/scores', {
      method: 'POST',
      body: JSON.stringify(scoreData),
    });
  }

  async getTopScores(limit = 10) {
    return this.request(`/api/scores/top?limit=${limit}`);
  }

  async getHealth() {
    return this.request('/api/health');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

