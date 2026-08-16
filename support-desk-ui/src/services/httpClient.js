export async function apiRequest(path, options = {}) {
  const { method = 'GET', token, body } = options;

  const headers = {};

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  if (body !== undefined) {
    headers['Content-Type'] = 'application/json';
  }

  const response = await fetch(path, {
    method,
    headers,
    body: body !== undefined ? JSON.stringify(body) : undefined
  });

  const contentType = response.headers.get('content-type') ?? '';
  const responseBody = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    if (response.status === 401 && token) {
      localStorage.removeItem('supportDeskAuth');
      window.location.href = '/login';
    }

    const message = responseBody?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return responseBody;
}

export function buildQueryString(params) {
  const searchParams = new URLSearchParams();

  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.set(key, value);
    }
  });

  return searchParams.toString();
}
