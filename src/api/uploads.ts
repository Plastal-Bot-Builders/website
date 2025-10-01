import { getJson, postJson, putJson, delJson } from './client';
import { API_BASE, authHeader } from './client';

export type Post = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  author: string;
  date: string;
  createdAt?: string;
  updatedAt?: string;
  coverImage?: string;
  authorAvatar?: string;
};

export type NewPost = {
  title: string;
  slug: string;
  content: string;
  author?: string;
  date?: string | Date;
  coverImage?: string;
  authorAvatar?: string;
};

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
    headers: { ...authHeader(token) }, // do not set Content-Type for FormData
    body: fd
  });

  if (!res.ok) {
    const text = await res.text().catch(() => 'Upload failed');
    throw new Error(text);
  }
  return (await res.json()) as UploadResponse;
}

export async function fetchPosts(): Promise<Post[]> {
  return getJson<Post[]>('/posts');
}

export async function fetchPostBySlug(slug: string): Promise<Post> {
  return getJson<Post>(`/posts/${encodeURIComponent(slug)}`);
}

export async function createPost(post: NewPost, token: string): Promise<Post> {
  return postJson<Post>('/posts', post, { token });
}

export async function updatePost(id: string, update: Partial<NewPost>, token: string): Promise<Post> {
  return putJson<Post>(`/posts/${encodeURIComponent(id)}`, update, { token });
}

export async function deletePost(id: string, token: string): Promise<{ ok: true }> {
  return delJson<{ ok: true }>(`/posts/${encodeURIComponent(id)}`, { token });
}