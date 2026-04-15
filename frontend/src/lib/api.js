const API_BASE_URL = (import.meta.env.VITE_API_BASE_URL || '').trim().replace(/\/$/, '');
const WS_BASE_URL = (import.meta.env.VITE_WS_BASE_URL || '').trim().replace(/\/$/, '');

export const ARTICLE_STREAM_ENABLED =
  import.meta.env.VITE_ENABLE_ARTICLE_STREAM === 'true' && Boolean(WS_BASE_URL);

export function apiUrl(path) {
  return API_BASE_URL ? `${API_BASE_URL}${path}` : path;
}

export function wsUrl(path) {
  return WS_BASE_URL ? `${WS_BASE_URL}${path}` : path;
}
