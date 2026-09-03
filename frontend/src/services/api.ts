import { ApiEnvelope } from '../types/api';

// Thin simulated-network wrapper, still used by services/pages that
// intentionally remain on mock data in Phase 2 (analytics/advanced
// features — see each service file for what's still mock and why).
export const MOCK_LATENCY_MS = 350;

export function simulateRequest<T>(payload: T, latency: number = MOCK_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(payload), latency);
  });
}

// ---------------------------------------------------------------------
// Real backend client. Every function below hits the FastAPI backend
// (see backend/main.py) via fetch and unwraps its { success, data,
// message } envelope. On failure it throws an ApiRequestError with a
// human-readable message — callers (services) propagate this to pages,
// which render a proper error state rather than silently falling back
// to mock data.
// ---------------------------------------------------------------------

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8000/api';

export class ApiRequestError extends Error {
  status?: number;
  constructor(message: string, status?: number) {
    super(message);
    this.name = 'ApiRequestError';
    this.status = status;
  }
}

async function request<T>(path: string, init?: RequestInit): Promise<T> {
  let response: Response;
  try {
    response = await fetch(`${API_BASE_URL}${path}`, {
      ...init,
      headers: {
        'Content-Type': 'application/json',
        ...(init?.headers ?? {}),
      },
    });
  } catch {
    throw new ApiRequestError(
      'Could not reach the Cric Privé backend. Confirm the API is running and VITE_API_BASE_URL is set correctly.'
    );
  }

  let body: ApiEnvelope<T> | { success: false; message: string } | null = null;
  try {
    body = await response.json();
  } catch {
    // No JSON body — fall through to the status-based error below.
  }

  if (!response.ok || !body || body.success === false) {
    const message = (body && 'message' in body && body.message) || `Request failed with status ${response.status}`;
    throw new ApiRequestError(message, response.status);
  }

  return (body as ApiEnvelope<T>).data;
}

export const apiGet = <T>(path: string): Promise<T> => request<T>(path, { method: 'GET' });

export const apiPost = <T>(path: string, body: unknown): Promise<T> =>
  request<T>(path, { method: 'POST', body: JSON.stringify(body) });
