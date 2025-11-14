// Use VITE_API_URL from environment variables
// In production (Netlify), this should be set to the Render backend URL
// In development, defaults to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

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
      // Log mais detalhado para debug
      console.error(`Erro na requisição ${endpoint}:`, {
        url,
        baseUrl: this.baseUrl,
        error: error.message,
        fullError: error
      });
      
      // Se for erro de rede (CORS, conexão), mostrar mensagem mais clara
      if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
        console.warn('Erro de conexão com a API. Verifique se VITE_API_URL está configurado corretamente.');
      }
      
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

