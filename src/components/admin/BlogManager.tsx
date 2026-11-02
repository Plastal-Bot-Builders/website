import { formatPostDate } from '../../utils/postDate';
import { Story, StorySection } from '../content/Story';
import { SectionEditor } from './SectionEditor';
import React, { useState, useEffect } from 'react';
import { createPost, updatePost, deletePost, type Post, type NewPost } from '../../api/posts';
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
  const [slugEdited, setSlugEdited] = useState(false);
  const [author, setAuthor] = useState('Admin');
  const [content, setContent] = useState('');
  const [sections, setSections] = useState<StorySection[]>([]);
  const [excerpt, setExcerpt] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [notice, setNotice] = useState('');
  function resetEditor() { setEditingId(null); setTitle(''); setSlugEdited(false); setSlug(''); setContent(''); setExcerpt(''); setSections([]); setCoverImageUrl(''); setAuthorAvatarUrl(''); setAuthor('Admin'); }
  function editPost(post: Post) { setEditingId(post._id); setSlugEdited(true); setTitle(post.title); setSlug(post.slug); setContent(post.content); setExcerpt(post.excerpt || ''); setSections(post.sections || []); setCoverImageUrl(post.coverImage || ''); setAuthorAvatarUrl(post.authorAvatar || ''); setAuthor(post.author); setNotice('Editing selected post. Save to publish your changes.'); }


  // Update slug when title changes
  useEffect(() => {
    if (!slugEdited && !editingId) setSlug(slugify(title));
  }, [title, slugEdited, editingId]);

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
    
    if (saving) return;
    setSaving(true);
    try {
      const payload: NewPost = {
        title: title.trim(),
        slug: (slug || slugify(title)).trim(),
        content, sections, excerpt,
        author: author.trim() || undefined,
        coverImage: coverImageUrl || undefined,
        authorAvatar: authorAvatarUrl || undefined
      };
      
      if (editingId) await updatePost(editingId, payload, token);
      else await createPost(payload, token);
      resetEditor();
      setNotice('Post saved and published.');
      
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
      setError(e?.message || 'Failed to save post');
    } finally { setSaving(false); }
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
        <h2 style={{ marginBottom: '20px' }}>{editingId ? 'Edit post' : 'Create new post'}</h2>
        {notice && <p role="status">{notice}</p>}
        <form onSubmit={handleCreatePost}><fieldset disabled={saving} style={{border:0,padding:0,minWidth:0}}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
            <FormGroup>
              <Label>Title</Label>
              <Input 
                value={title} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)}
                required 
              />
            </FormGroup>
            <FormGroup>
              <Label>Slug</Label>
              <Input 
                value={slug} 
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => { setSlugEdited(true); setSlug(e.currentTarget.value); }}
                placeholder="auto from title" 
              />
            </FormGroup>
          </div>
          
          <FormGroup>
            <label>Hosted cover image URL<Input value={coverImageUrl} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCoverImageUrl(e.currentTarget.value)} placeholder="https://…" /></label>
            <p>Use a permanently hosted image URL for production. Local server uploads need persistent storage to survive redeployments.</p>
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
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setAuthor(e.currentTarget.value)}
            />
          </FormGroup>
          
          <FormGroup>
            <Label>Content</Label>
               <TextArea
                    aria-label="Introduction" required value={content}
                    onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setContent(e.target.value)}
                    rows={8}
               />
          </FormGroup>
          
          <label>Card summary (up to 600 characters)<TextArea value={excerpt} maxLength={600} onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => setExcerpt(e.target.value)} /></label>
          <SectionEditor value={sections} onChange={setSections} />
          <details style={{margin:'24px 0'}}><summary>Preview public layout</summary><Story title={title} summary={excerpt} image={coverImageUrl} content={content} sections={sections} /></details>
          <p>Saving publishes this post on the blog. Existing page URLs stay the same unless you change the slug.</p>
          <Button type="submit">{saving ? 'Saving…' : editingId ? 'Save changes' : 'Publish post'}</Button>
          <Button type="button" onClick={resetEditor}>Start a new post</Button></fieldset>
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
                  <td>{formatPostDate(post)}</td>
                  <td>
                    <Button onClick={() => editPost(post)}>Edit</Button>
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