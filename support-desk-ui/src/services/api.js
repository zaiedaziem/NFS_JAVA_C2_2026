async function parseJsonResponse(response) {
  const contentType = response.headers.get('content-type') ?? '';
  const body = contentType.includes('application/json') ? await response.json() : null;

  if (!response.ok) {
    const message = body?.message || `Request failed with status ${response.status}`;
    throw new Error(message);
  }

  return body;
}

function authHeaders(token, extraHeaders = {}) {
  return {
    Authorization: `Bearer ${token}`,
    ...extraHeaders
  };
}

export async function fetchApiDocs() {
  const response = await fetch('/api/docs');
  return parseJsonResponse(response);
}

export async function loginRequest(email, password) {
  const response = await fetch('/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  });

  return parseJsonResponse(response);
}

export async function fetchTickets(token) {
  const response = await fetch('/api/v1/tickets', {
    headers: authHeaders(token)
  });

  return parseJsonResponse(response);
}

export async function createTicket(token, payload) {
  const response = await fetch('/api/v1/tickets', {
    method: 'POST',
    headers: authHeaders(token, {
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(payload)
  });

  return parseJsonResponse(response);
}

export async function updateTicket(id, token, payload) {
  const response = await fetch(`/api/v1/tickets/${id}`, {
    method: 'PUT',
    headers: authHeaders(token, {
      'Content-Type': 'application/json'
    }),
    body: JSON.stringify(payload)
  });

  return parseJsonResponse(response);
}