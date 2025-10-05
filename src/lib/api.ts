/**
 * API client for backend communication
 */

const API_BASE = import.meta.env.DEV ? '' : '';

interface ApiResponse<T> {
  data?: T;
  error?: string;
}

async function fetchApi<T>(
  endpoint: string,
  options?: RequestInit
): Promise<ApiResponse<T>> {
  try {
    const response = await fetch(`${API_BASE}${endpoint}`, {
      ...options,
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
        ...options?.headers,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      return { error: errorData.error || `HTTP ${response.status}` };
    }

    const data = await response.json();
    return { data };
  } catch (error) {
    console.error('API error:', error);
    return { error: 'Network error' };
  }
}

export interface User {
  userId: string;
  country: string | null;
}

export interface ClickResponse {
  globalTotal: number;
  userTotal: number;
  source?: string;
}

export interface StatsResponse {
  globalTotal: number;
  userTotal?: number;
  topUsers: Array<{ id: string; total: number }>;
  todayTopUsers: Array<{ id: string; total: number }>;
  topCountries?: Array<{ code: string; total: number }>;
}

export interface HealthResponse {
  ok: boolean;
  backend: 'redis' | 'sqlite';
  redis?: 'up' | 'down';
  sqlite?: 'up' | 'down';
}

/**
 * Get or create user
 */
export async function getUser(): Promise<ApiResponse<User>> {
  return fetchApi<User>('/api/user');
}

/**
 * Register a click
 */
export async function registerClick(source: 'page-load' | 'click' = 'click'): Promise<ApiResponse<ClickResponse>> {
  return fetchApi<ClickResponse>('/api/click', {
    method: 'POST',
    body: JSON.stringify({ source }),
  });
}

/**
 * Get statistics
 */
export async function getStats(): Promise<ApiResponse<StatsResponse>> {
  return fetchApi<StatsResponse>('/api/stats');
}

/**
 * Health check
 */
export async function healthCheck(): Promise<ApiResponse<HealthResponse>> {
  return fetchApi<HealthResponse>('/api/health/clicks');
}

/**
 * Create SSE connection
 */
export function createEventSource(onUpdate: (data: { globalTotal: number }) => void): EventSource {
  const eventSource = new EventSource(`${API_BASE}/api/stream`, {
    withCredentials: true,
  });

  eventSource.addEventListener('update', (event) => {
    try {
      const data = JSON.parse(event.data);
      onUpdate(data);
    } catch (error) {
      console.error('Failed to parse SSE update:', error);
    }
  });

  eventSource.onerror = (error) => {
    console.error('SSE error:', error);
  };

  return eventSource;
}

