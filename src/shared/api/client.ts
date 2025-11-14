import type { ScoreFilters, SaveScoreData, ApiResponse, Score } from '../types';

// Use VITE_API_URL from environment variables
// In production (Netlify), this should be set to the Render backend URL
// In development, defaults to localhost
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:4000';

class ApiClient {
  private baseUrl: string;

  constructor(baseUrl: string) {
    this.baseUrl = baseUrl;
  }

  async request<T>(endpoint: string, options: RequestInit = {}): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`;
    const config: RequestInit = {
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
        throw new Error((error as { error?: string }).error || `HTTP ${response.status}`);
      }

      return (await response.json()) as T;
    } catch (error) {
      // Log mais detalhado para debug
      console.error(`Erro na requisição ${endpoint}:`, {
        url,
        baseUrl: this.baseUrl,
        error: error instanceof Error ? error.message : 'Erro desconhecido',
        fullError: error,
      });

      // Se for erro de rede (CORS, conexão), mostrar mensagem mais clara
      if (error instanceof Error) {
        if (error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
          console.warn('Erro de conexão com a API. Verifique se VITE_API_URL está configurado corretamente.');
        }
      }

      throw error;
    }
  }

  async saveScore(scoreData: SaveScoreData): Promise<{ id: number; playerId: number; scorePercentage: number; message: string }> {
    return this.request('/api/scores', {
      method: 'POST',
      body: JSON.stringify(scoreData),
    });
  }

  async getTopScores(limit = 10, filters: ScoreFilters = {}): Promise<ApiResponse<Score>> {
    const params = new URLSearchParams({ limit: limit.toString() });

    if (filters.state) params.append('state', filters.state);
    if (filters.location) params.append('location', filters.location);
    if (filters.days) params.append('days', filters.days.toString());

    return this.request<ApiResponse<Score>>(`/api/scores/top?${params.toString()}`);
  }

  async getStates(): Promise<ApiResponse<string>> {
    return this.request<ApiResponse<string>>('/api/scores/filters/states');
  }

  async getLocations(state: string | null = null): Promise<ApiResponse<string>> {
    const url = state
      ? `/api/scores/filters/locations?state=${encodeURIComponent(state)}`
      : '/api/scores/filters/locations';
    return this.request<ApiResponse<string>>(url);
  }

  async getHealth(): Promise<{ status: string; database: boolean; environment: string }> {
    return this.request('/api/health');
  }
}

export const apiClient = new ApiClient(API_BASE_URL);

