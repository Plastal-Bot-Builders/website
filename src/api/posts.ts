import type { StorySection } from '../components/content/Story';
import { getJson, postJson, putJson, delJson } from './client';

export type Post = {
  _id: string;
  title: string;
  slug: string;
  content: string;
  sections?: StorySection[];
  excerpt?: string;
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
  sections?: StorySection[];
  excerpt?: string;
  author?: string;
  date?: string | Date;
  coverImage?: string;     
  authorAvatar?: string; 
};

export interface PostsResponse {
  status: string;
  data: Post[];
  pagination?: {
    total: number;
    totalPages: number;
    currentPage: number;
    limit: number;
  };
};

export async function fetchPosts(): Promise<PostsResponse> {
  const first = await getJson<PostsResponse>('/posts');
  const data = [...first.data];
  for (let page = 2; page <= (first.pagination?.totalPages || 1); page++) {
    const next = await getJson<PostsResponse>('/posts', { query: { page } });
    data.push(...next.data);
  }
  return { ...first, data };
}

export async function fetchPostBySlug(slug: string): Promise<{status: string; data: Post}> {
  return getJson<{status: string; data: Post}>(`/posts/${encodeURIComponent(slug)}`);
}

export async function createPost(post: NewPost, token: string): Promise<{status: string; data: Post}> {
  return postJson<{status: string; data: Post}>('/posts', post, { token });
}

export async function updatePost(id: string, update: Partial<NewPost>, token: string): Promise<Post> {
  return putJson<Post>(`/posts/${encodeURIComponent(id)}`, update, { token }); // Keep as is
}

export async function deletePost(id: string, token: string): Promise<{ ok: true }> {
  return delJson<{ ok: true }>(`/posts/${encodeURIComponent(id)}`, { token }); // Keep as is
}