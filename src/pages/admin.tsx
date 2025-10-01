import React from 'react';
import { login, saveToken, getToken, logout } from '../api/auth';
import { fetchPosts, createPost, deletePost, type Post, type NewPost } from '../api/posts';
import { uploadImage } from '../api/uploads';

function slugify(s: string) {
     return s
          .toLowerCase()
          .trim()
          .replace(/[\s\W-]+/g, '-')
          .replace(/^-+|-+$/g, '');
}

export default function Admin() {
     const [token, setToken] = React.useState<string | null>(getToken());
     const [posts, setPosts] = React.useState<Post[]>([]);
     const [loading, setLoading] = React.useState(false);
     const [error, setError] = React.useState<string | null>(null);


     const [coverImageUrl, setCoverImageUrl] = React.useState<string>('');     // NEW
     const [authorAvatarUrl, setAuthorAvatarUrl] = React.useState<string>(''); // NEW

     // login form state
     const [username, setUsername] = React.useState('admin');
     const [password, setPassword] = React.useState('changeMe123');

     // create form state
     const [title, setTitle] = React.useState('');
     const [slug, setSlug] = React.useState('');
     const [author, setAuthor] = React.useState('Admin');
     const [content, setContent] = React.useState('');

     React.useEffect(() => {
          // auto-generate slug from title if user hasn't typed a custom one
          setSlug((prev) => (prev ? prev : title ? slugify(title) : ''));
     }, [title]);

     async function onCoverChange(e: React.ChangeEvent<HTMLInputElement>) {    // NEW
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

     async function onAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {   // NEW
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

     async function loadPosts() {
          setError(null);
          setLoading(true);
          try {
               const data = await fetchPosts();
               setPosts(data);
          } catch (e: any) {
               setError(e?.message || 'Failed to load posts');
          } finally {
               setLoading(false);
          }
     }

     React.useEffect(() => {
          loadPosts();
     }, [token]);

     async function handleLogin(e: React.FormEvent) {
          e.preventDefault();
          setError(null);
          try {
               const { token } = await login(username, password);
               saveToken(token);
               setToken(token);
          } catch (e: any) {
               setError(e?.message || 'Login failed');
          }
     }

     async function handleCreate(e: React.FormEvent) {
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
               setTitle('');
               setSlug('');
               setAuthor('Admin');
               setContent('');
               setCoverImageUrl('');
               setAuthorAvatarUrl('');
               await loadPosts();
          } catch (e: any) {
               setError(e?.message || 'Failed to create post');
          }
     }

     async function handleDelete(id: string) {
          if (!token) {
               setError('Not authenticated');
               return;
          }
          if (!window.confirm('Delete this post?')) return;
          setError(null);
          try {
               await deletePost(id, token);
               await loadPosts();
          } catch (e: any) {
               setError(e?.message || 'Failed to delete post');
          }
     }

     function handleLogout() {
          logout();
          setToken(null);
     }

     if (!token) {
          return (
               <div style={{ maxWidth: 520, margin: '40px auto', padding: 16 }}>
                    <h1>Admin Login</h1>
                    {error && <p style={{ color: 'tomato' }}>{error}</p>}
                    <form onSubmit={handleLogin}>
                         <div style={{ marginBottom: 8 }}>
                              <label>Username</label>
                              <input value={username} onChange={(e) => setUsername(e.target.value)} required style={{ width: '100%' }} />
                         </div>
                         <div style={{ marginBottom: 8 }}>
                              <label>Password</label>
                              <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required style={{ width: '100%' }} />
                         </div>
                         <button type="submit">Log in</button>
                    </form>
               </div>
          );
     }

     return (
          <div style={{ maxWidth: 900, margin: '40px auto', padding: 16 }}>
               <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <h1>Blog Admin</h1>
                    <button onClick={handleLogout}>Log out</button>
               </header>

               {error && <p style={{ color: 'tomato' }}>{error}</p>}

               <section style={{ marginTop: 24, padding: 16, border: '1px solid #333', borderRadius: 8 }}>
                    <h2>Create Post</h2>
                    <form onSubmit={handleCreate}>
                         <div style={{ display: 'grid', gap: 8, gridTemplateColumns: '1fr 1fr' }}>
                              <div>
                                   <label>Title</label>
                                   <input value={title} onChange={(e) => setTitle(e.target.value)} required style={{ width: '100%' }} />
                              </div>
                              <div>
                                   <label>Slug</label>
                                   <input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto from title" style={{ width: '100%' }} />
                              </div>
                         </div>
                         <div style={{ marginTop: 8 }}>
                              <label>Cover Image</label>
                              <input type="file" accept="image/*" onChange={onCoverChange} />
                              {coverImageUrl && (
                                   <div style={{ marginTop: 8 }}>
                                        <img src={coverImageUrl} alt="Cover preview" style={{ maxWidth: 240, borderRadius: 4 }} />
                                   </div>
                              )}
                         </div>
                         <div style={{ marginTop: 8 }}>
                              <label>Author Avatar</label>
                              <input type="file" accept="image/*" onChange={onAvatarChange} />
                              {authorAvatarUrl && (
                                   <div style={{ marginTop: 8 }}>
                                        <img src={authorAvatarUrl} alt="Avatar preview" style={{ width: 64, height: 64, borderRadius: '50%', objectFit: 'cover' }} />
                                   </div>
                              )}
                         </div>
                         <div style={{ marginTop: 8 }}>
                              <label>Author</label>
                              <input value={author} onChange={(e) => setAuthor(e.target.value)} style={{ width: '100%' }} />
                         </div>
                         <div style={{ marginTop: 8 }}>
                              <label>Content</label>
                              <textarea value={content} onChange={(e) => setContent(e.target.value)} rows={8} style={{ width: '100%' }} />
                         </div>
                         <button type="submit" style={{ marginTop: 12 }}>Create</button>
                    </form>
               </section>

               <section style={{ marginTop: 24 }}>
                    <h2>Posts {loading && <small>Loading…</small>}</h2>
                    {!loading && posts.length === 0 && <p>No posts yet.</p>}
                    <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                         {posts.map((p) => (
                              <li key={p._id} style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #333', padding: '8px 0' }}>
                                   <div>
                                        <strong>{p.title}</strong> <span style={{ opacity: 0.7 }}>/{p.slug}</span>
                                        <div style={{ opacity: 0.7, fontSize: 12 }}>by {p.author} • {new Date(p.date).toLocaleString()}</div>
                                   </div>
                                   <div>
                                        {/* You can add an Edit flow later */}
                                        <button onClick={() => handleDelete(p._id)} style={{ color: 'tomato' }}>Delete</button>
                                   </div>
                              </li>
                         ))}
                    </ul>
               </section>
          </div>
     );
}