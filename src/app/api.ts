export async function checkHealth(): Promise<boolean> {
  try {
    const res = await fetch('/api/health')
    return res.ok
  } catch {
    return false
  }
}

export async function getUploadToken(): Promise<{ token: string; cdnUrl: string }> {
  const res = await fetch('/api/upload-token', { method: 'POST' })
  if (!res.ok) {
    const body = await res.json().catch(() => ({}))
    throw new Error((body as { error?: string }).error ?? 'Failed to get upload token')
  }
  return res.json()
}
