import { getJson, postJson, putJson, delJson } from './client';

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
  return getJson<PostsResponse>('/posts'); // Remove /api prefix
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