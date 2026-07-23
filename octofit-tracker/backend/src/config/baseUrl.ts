const DEFAULT_PORT = 8000;

export function getBaseUrl(): string {
  const codespaceName = process.env.CODESPACE_NAME;

  if (codespaceName) {
    return `https://${codespaceName}-${DEFAULT_PORT}.app.github.dev`;
  }

  return `http://localhost:${DEFAULT_PORT}`;
}

export function getApiBaseUrl(): string {
  return `${getBaseUrl()}/api`;
}