import React, { useState, useEffect } from 'react';
import { createPost, deletePost, type Post, type NewPost } from '../../api/posts';
import { uploadImage } from '../../api/uploads';
import { 
  Panel, 
  FormGroup, 
  Label, 
  Input, 
  Button, 
  DeleteButton, 
  Table, 
  TextArea, 
  slugify 
} from './AdminStyles';

interface BlogManagerProps {
  posts: Post[];
  token: string;
  onPostsChange: () => void;
  loading: boolean;
  setError: (error: string | null) => void;
}

export function BlogManager({ posts, token, onPostsChange, loading, setError }: BlogManagerProps) {
  // Blog form state
  const [coverImageUrl, setCoverImageUrl] = useState<string>('');
  const [authorAvatarUrl, setAuthorAvatarUrl] = useState<string>('');
  const [title, setTitle] = useState('');
  const [slug, setSlug] = useState('');
  const [author, setAuthor] = useState('Admin');
  const [content, setContent] = useState('');

  // Update slug when title changes
  useEffect(() => {
    setSlug((prev) => (prev ? prev : title ? slugify(title) : ''));
  }, [title]);

  // Image upload handlers
  async function onCoverChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!token) return setError('Please log in first');
    
    try {
      const res = await uploadImage(file, token);
      setCoverImageUrl(res.url);
    } catch (e: any) {
      setError(e?.message || 'Cover upload failed');
    }
  }

  async function onAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    if (!token) return setError('Please log in first');
    
    try {
      const res = await uploadImage(file, token);
      setAuthorAvatarUrl(res.url);
    } catch (e: any) {
      setError(e?.message || 'Avatar upload failed');
    }
  }

  // Post creation handler
  async function handleCreatePost(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return setError('Not authenticated');
    setError(null);
    
    try {
      const payload: NewPost = {
        title: title.trim(),
        slug: (slug || slugify(title)).trim(),
        content,
        author: author.trim() || undefined,
        coverImage: coverImageUrl || undefined,
        authorAvatar: authorAvatarUrl || undefined
      };
      
      await createPost(payload, token);
      
      // Reset form
      setTitle('');
      setSlug('');
      setAuthor('Admin');
      setContent('');
      setCoverImageUrl('');
      setAuthorAvatarUrl('');
      
      // Refresh posts list
      onPostsChange();
    } catch (e: any) {
      setError(e?.message || 'Failed to create post');
    }
  }

  // Post deletion handler
  async function handleDeletePost(id: string) {
    if (!token) {
      setError('Not authenticated');
      return;
    }
    
    if (!window.confirm('Delete this post?')) return;
    setError(null);
    
    try {
      await deletePost(id, token);
      onPostsChange();
    } catch (e: any) {
      setError(e?.message || 'Failed to delete post');
    }
  }

  return (
    <>
      <Panel style={{ marginBottom: '20px' }}>
        <h2 style={{ marginBottom: '20px' }}>Create New Post</h2>
        <form onSubmit={handleCreatePost}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <FormGroup>
              <Label>Title</Label>
              <Input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                required 
              />
            </FormGroup>
            <FormGroup>
              <Label>Slug</Label>
              <Input 
                value={slug} 
                onChange={(e) => setSlug(e.target.value)} 
                placeholder="auto from title" 
              />
            </FormGroup>
          </div>
          
          <FormGroup>
            <Label>Cover Image</Label>
            <Input 
              type="file" 
              accept="image/*" 
              onChange={onCoverChange} 
            />
            {coverImageUrl && (
              <div style={{ marginTop: '10px' }}>
                <img 
                  src={coverImageUrl} 
                  alt="Cover preview" 
                  style={{ maxWidth: '240px', borderRadius: '4px' }} 
                />
              </div>
            )}
          </FormGroup>
          
          <FormGroup>
            <Label>Author Avatar</Label>
            <Input 
              type="file" 
              accept="image/*" 
              onChange={onAvatarChange} 
            />
            {authorAvatarUrl && (
              <div style={{ marginTop: '10px' }}>
                <img 
                  src={authorAvatarUrl} 
                  alt="Avatar preview" 
                  style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} 
                />
              </div>
            )}
          </FormGroup>
          
          <FormGroup>
            <Label>Author</Label>
            <Input 
              value={author} 
              onChange={(e) => setAuthor(e.target.value)} 
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Content</Label>
               <TextArea
                    value={content}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                    rows={8}
               />
          </FormGroup>
          
          <Button type="submit">Create Post</Button>
        </form>
      </Panel>

      <Panel>
        <h2 style={{ marginBottom: '20px' }}>Manage Posts {loading && <small>Loading…</small>}</h2>
        {!loading && (!Array.isArray(posts) || posts.length === 0) && <p>No posts yet.</p>}
        
        {Array.isArray(posts) && posts.length > 0 && (
          <Table>
            <thead>
              <tr>
                <th>Title</th>
                <th>Author</th>
                <th>Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {posts.map((post) => (
                <tr key={post._id}>
                  <td>
                    <strong>{post.title}</strong><br />
                    <small style={{ opacity: 0.7 }}>/{post.slug}</small>
                  </td>
                  <td>{post.author}</td>
                  <td>{new Date(post.date).toLocaleDateString()}</td>
                  <td>
                    <DeleteButton onClick={() => handleDeletePost(post._id)}>
                      Delete
                    </DeleteButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
        )}
      </Panel>
    </>
  );
}