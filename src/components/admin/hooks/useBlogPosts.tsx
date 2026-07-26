import { useState, useCallback } from 'react';
import { fetchPosts, Post } from '../../../api/posts';

export function useBlogPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const loadPosts = useCallback(async () => {
    setError(null);
    setLoading(true);
    try {
      const response = await fetchPosts();

      if (Array.isArray(response)) {
        setPosts(response);
      } else if (response && typeof response === 'object') {
        const postsData = response.data;
        if (Array.isArray(postsData)) {
          setPosts(postsData);
        } else {
          console.error('Invalid posts data format:', postsData);
          setPosts([]);
          setError('Invalid data format received from API');
        }
      } else {
        console.error('Unexpected response format:', response);
        setPosts([]);
        setError('Invalid response from API');
      }
    } catch (e: any) {
      console.error('Load posts error:', e);
      setError(e?.message || 'Failed to load posts');
      setPosts([]);
    } finally {
      setLoading(false);
    }
  }, []);

  return { posts, loading, error, loadPosts, setError };
}