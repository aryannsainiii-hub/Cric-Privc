// Thin simulated-network wrapper. Every service function returns a Promise
// so that swapping in a real `fetch(...)` call in Phase 2 requires no
// changes to any component that already calls the service layer.

export const MOCK_LATENCY_MS = 350;

export function simulateRequest<T>(payload: T, latency: number = MOCK_LATENCY_MS): Promise<T> {
  return new Promise((resolve) => {
    setTimeout(() => resolve(payload), latency);
  });
}

// Placeholder for a future real client, e.g.:
// export const apiClient = axios.create({ baseURL: import.meta.env.VITE_API_BASE_URL });
