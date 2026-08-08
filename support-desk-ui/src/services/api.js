export async function fetchApiDocs() {
  const response = await fetch('/api/docs');

  if (!response.ok) {
    throw new Error(`API docs request failed with status ${response.status}`);
  }

  return response.json();
}