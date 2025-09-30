import { API_BASE, authHeader } from './client';

export type UploadResponse = {
  url: string;
  filename: string;
  size: number;
  mime: string;
};

export async function uploadImage(file: File, token: string): Promise<UploadResponse> {
  const fd = new FormData();
  fd.append('file', file);

  const res = await fetch(`${API_BASE}/uploads`, {
    method: 'POST',
    headers: { ...authHeader(token) }, // do not set Content-Type manually
    body: fd
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Upload failed');
    throw new Error(text);
  }
  return (await res.json()) as UploadResponse;
}