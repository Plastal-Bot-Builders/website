import { apiFetch, handleJson, authHeader } from './client';

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

export async function fetchPosts(): Promise<Post[]> {
  const res = await apiFetch('/posts', { method: 'GET', headers: { Accept: 'application/json' } });
  return handleJson<Post[]>(res);
}

export async function fetchPostBySlug(slug: string): Promise<Post> {
  const res = await apiFetch(`/posts/${encodeURIComponent(slug)}`, { method: 'GET', headers: { Accept: 'application/json' } });
  return handleJson<Post>(res);
}

export async function createPost(post: NewPost, token: string): Promise<Post> {
  const res = await apiFetch('/posts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeader(token) },
    body: JSON.stringify(post)
  });
  return handleJson<Post>(res);
}

export async function updatePost(id: string, update: Partial<NewPost>, token: string): Promise<Post> {
  const res = await apiFetch(`/posts/${encodeURIComponent(id)}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json', ...authHeader(token) },
    body: JSON.stringify(update)
  });
  return handleJson<Post>(res);
}

export async function deletePost(id: string, token: string): Promise<{ ok: true }> {
  const res = await apiFetch(`/posts/${encodeURIComponent(id)}`, {
    method: 'DELETE',
    headers: { ...authHeader(token) }
  });
  return handleJson<{ ok: true }>(res);
}

