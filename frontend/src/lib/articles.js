import { apiUrl, ARTICLE_STREAM_ENABLED, wsUrl } from './api';

export async function fetchArticles() {
  const response = await fetch(apiUrl('/api/articles/'));
  if (!response.ok) {
    throw new Error('No se pudieron cargar los articulos');
  }
  return response.json();
}

export async function fetchArticleById(id) {
  const response = await fetch(apiUrl(`/api/articles/${id}`));
  if (!response.ok) {
    throw new Error('No se pudo cargar el articulo');
  }
  return response.json();
}

export function subscribeToArticles(onArticle, onError) {
  if (!ARTICLE_STREAM_ENABLED) {
    return () => {};
  }

  const socket = new WebSocket(wsUrl('/ws/articles'));
  socket.onmessage = (event) => {
    try {
      onArticle(JSON.parse(event.data));
    } catch (error) {
      if (onError) {
        onError(error);
      }
    }
  };

  if (onError) {
    socket.onerror = onError;
  }

  return () => socket.close();
}
