import React, { useState, useEffect } from 'react';
import { login, saveToken, getToken, logout } from '../api/auth';
import { fetchPosts, createPost, deletePost, type Post, type NewPost } from '../api/posts';
import { uploadImage } from '../api/uploads';
import { fetchMembers, updateMemberStatus, deleteMember, getMemberDetails, type Member } from '../api/members';
import styled from 'styled-components';

// Styled components for the new admin UI
const AdminContainer = styled.div`
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
`;

const Header = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
`;

const TabContainer = styled.div`
  display: flex;
  margin-bottom: 20px;
  border-bottom: 1px solid #e2e8f0;
`;

const Tab = styled.button<{ $active: boolean }>`
  padding: 10px 20px;
  background: transparent;
  border: none;
  border-bottom: 2px solid ${props => props.$active ? '#0CFFBB' : 'transparent'};
  color: ${props => props.$active ? '#0CFFBB' : 'inherit'};
  cursor: pointer;
  font-weight: ${props => props.$active ? 'bold' : 'normal'};
  margin-right: 10px;
  transition: all 0.2s;
  
  &:hover {
    color: #0CFFBB;
  }
`;

const Panel = styled.div`
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  border: 1px solid #e2e8f0;
  border-radius: 4px;
  font-size: 16px;
`;

const Button = styled.button`
  background-color: #0CFFBB;
  color: #000;
  border: none;
  padding: 10px 15px;
  border-radius: 4px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s;
  
  &:hover {
    background-color: #0ae0a3;
  }
  
  &:disabled {
    background-color: #cbd5e0;
    cursor: not-allowed;
  }
`;

const DeleteButton = styled(Button)`
  background-color: #f56565;
  color: white;
  
  &:hover {
    background-color: #e53e3e;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  
  th, td {
    padding: 12px 15px;
    border-bottom: 1px solid #e2e8f0;
    text-align: left;
  }
  
  th {
    background-color: #f8f9fa;
    font-weight: bold;
  }
  
  tr:hover {
    background-color: #f1f5f9;
  }
`;

const Badge = styled.span<{ type: 'pending' | 'approved' | 'rejected' }>`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 14px;
  font-weight: 500;
  
  ${props => {
          switch (props.type) {
               case 'pending':
                    return 'background-color: #fef3c7; color: #92400e;';
               case 'approved':
                    return 'background-color: #d1fae5; color: #065f46;';
               case 'rejected':
                    return 'background-color: #fee2e2; color: #b91c1c;';
               default:
                    return '';
          }
     }}
`;

function slugify(s: string) {
     return s
          .toLowerCase()
          .trim()
          .replace(/[\s\W-]+/g, '-')
          .replace(/^-+|-+$/g, '');
}

type TabType = 'blog' | 'members' | 'dashboard';

export default function Admin() {
     // Auth state
     const [token, setToken] = useState<string | null>(getToken());
     const [username, setUsername] = useState('admin');
     const [password, setPassword] = useState('changeMe123');

     // UI state
     const [activeTab, setActiveTab] = useState<TabType>('dashboard');
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);
     const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
     const [memberDetails, setMemberDetails] = useState<any>(null);

     // Blog state
     const [posts, setPosts] = useState<Post[]>([]);
     const [coverImageUrl, setCoverImageUrl] = useState<string>('');
     const [authorAvatarUrl, setAuthorAvatarUrl] = useState<string>('');
     const [title, setTitle] = useState('');
     const [slug, setSlug] = useState('');
     const [author, setAuthor] = useState('Admin');
     const [content, setContent] = useState('');

     // Members state - ensure it's initialized as an empty array
     const [members, setMembers] = useState<Member[]>([]);

     // Auto-generate slug from title
     useEffect(() => {
          setSlug((prev) => (prev ? prev : title ? slugify(title) : ''));
     }, [title]);

     // Load initial data
     useEffect(() => {
          if (token) {
               loadPosts();
               loadMembers();
          }
     }, [token]);

     // Fetch data functions
     async function loadPosts() {
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
     }

     async function loadMembers() {
       if (!token) return;
       setError(null);
       setLoading(true);
       try {
         const response = await fetchMembers(token);
         
         // Check if response has a data property (structured response)
         if (response && typeof response === 'object' && 'data' in response) {
           setMembers(Array.isArray(response.data) ? response.data : []);
         } else {
           // Fallback to direct array response
           setMembers(Array.isArray(response) ? response : []);
         }
       } catch (e: any) {
         console.error('Load members error:', e);
         setError(e?.message || 'Failed to load members');
         setMembers([]);
       } finally {
         setLoading(false);
       }
     }

     async function loadMemberDetails(id: string) {
          if (!token) return;
          setError(null);
          setLoading(true);
          try {
               const details = await getMemberDetails(id, token);
               setMemberDetails(details);
               setSelectedMemberId(id);
          } catch (e: any) {
               console.error('Load member details error:', e);
               setError(e?.message || 'Failed to load member details');
               setMemberDetails(null);
          } finally {
               setLoading(false);
          }
     }

     // Blog handlers
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

     async function handleDeletePost(id: string) {
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

     // Member handlers
     async function handleUpdateMemberStatus(id: string, status: 'approved' | 'rejected') {
          if (!token) {
               setError('Not authenticated');
               return;
          }

          setError(null);
          try {
               await updateMemberStatus(id, status, token);
               await loadMembers();
               if (selectedMemberId === id) {
                    await loadMemberDetails(id);
               }
          } catch (e: any) {
               setError(e?.message || 'Failed to update member status');
          }
     }

     async function handleDeleteMember(id: string) {
          if (!token) {
               setError('Not authenticated');
               return;
          }
          if (!window.confirm('Delete this member? This action cannot be undone.')) return;
          setError(null);
          try {
               await deleteMember(id, token);
               setSelectedMemberId(null);
               setMemberDetails(null);
               await loadMembers();
          } catch (e: any) {
               setError(e?.message || 'Failed to delete member');
          }
     }

     // Auth handlers
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

     function handleLogout() {
          logout();
          setToken(null);
     }

     // Safety function for member filtering
     function filterMembers(status: 'pending' | 'approved' | 'rejected') {
          if (!Array.isArray(members)) {
               return [];
          }
          return members.filter(m => m.status === status);
     }

     if (!token) {
          return (
               <AdminContainer>
                    <Panel>
                         <h1 style={{ marginBottom: '20px' }}>Admin Login</h1>
                         {error && <p style={{ color: '#e53e3e', marginBottom: '15px' }}>{error}</p>}
                         <form onSubmit={handleLogin}>
                              <FormGroup>
                                   <Label>Username</Label>
                                   <Input value={username} onChange={(e) => setUsername(e.target.value)} required />
                              </FormGroup>
                              <FormGroup>
                                   <Label>Password</Label>
                                   <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                              </FormGroup>
                              <Button type="submit">Log in</Button>
                         </form>
                    </Panel>
               </AdminContainer>
          );
     }

     return (
          <AdminContainer>
               <Header>
                    <h1>Admin Dashboard</h1>
                    <Button onClick={handleLogout}>Log out</Button>
               </Header>

               {error && <div style={{ color: '#e53e3e', padding: '10px', marginBottom: '15px', backgroundColor: '#fee2e2', borderRadius: '4px' }}>{error}</div>}

               <TabContainer>
                    <Tab $active={activeTab === 'dashboard'} onClick={() => setActiveTab('dashboard')}>Dashboard</Tab>
                    <Tab $active={activeTab === 'blog'} onClick={() => setActiveTab('blog')}>Blog Posts</Tab>
                    <Tab $active={activeTab === 'members'} onClick={() => setActiveTab('members')}>Membership</Tab>
               </TabContainer>

               {activeTab === 'dashboard' && (
                    <Panel>
                         <h2 style={{ marginBottom: '20px' }}>Dashboard Overview</h2>
                         <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                              <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
                                   <h3>Blog Posts</h3>
                                   <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#0CFFBB' }}>{Array.isArray(posts) ? posts.length : 0}</p>
                              </div>
                              <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
                                   <h3>Members</h3>
                                   <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#0CFFBB' }}>{Array.isArray(members) ? members.length : 0}</p>
                              </div>
                              <div style={{ padding: '20px', backgroundColor: '#f8fafc', borderRadius: '8px', textAlign: 'center' }}>
                                   <h3>Pending Applications</h3>
                                   <p style={{ fontSize: '32px', fontWeight: 'bold', color: '#0CFFBB' }}>
                                        {Array.isArray(members) ? filterMembers('pending').length : 0}
                                   </p>
                              </div>
                         </div>

                         <div style={{ marginTop: '30px' }}>
                              <h3 style={{ marginBottom: '15px' }}>Recent Applications</h3>
                              {Array.isArray(members) && members.length > 0 ? (
                                   <Table>
                                        <thead>
                                             <tr>
                                                  <th>Name</th>
                                                  <th>Email</th>
                                                  <th>Type</th>
                                                  <th>Status</th>
                                                  <th>Date</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {members.slice(0, 5).map((member) => (
                                                  <tr key={member._id}>
                                                       <td>{member.fullName}</td>
                                                       <td>{member.email}</td>
                                                       <td>{member.membershipType?.type || 'N/A'}</td>
                                                       <td>
                                                            <Badge type={member.status as 'pending' | 'approved' | 'rejected'}>
                                                                 {member.status}
                                                            </Badge>
                                                       </td>
                                                       <td>{new Date(member.createdAt).toLocaleDateString()}</td>
                                                  </tr>
                                             ))}
                                        </tbody>
                                   </Table>
                              ) : (
                                   <p>No membership applications yet.</p>
                              )}
                         </div>
                    </Panel>
               )}

               {activeTab === 'blog' && (
                    <>
                         <Panel style={{ marginBottom: '20px' }}>
                              <h2 style={{ marginBottom: '20px' }}>Create New Post</h2>
                              <form onSubmit={handleCreatePost}>
                                   <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
                                        <FormGroup>
                                             <Label>Title</Label>
                                             <Input value={title} onChange={(e) => setTitle(e.target.value)} required />
                                        </FormGroup>
                                        <FormGroup>
                                             <Label>Slug</Label>
                                             <Input value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="auto from title" />
                                        </FormGroup>
                                   </div>
                                   <FormGroup>
                                        <Label>Cover Image</Label>
                                        <Input type="file" accept="image/*" onChange={onCoverChange} />
                                        {coverImageUrl && (
                                             <div style={{ marginTop: '10px' }}>
                                                  <img src={coverImageUrl} alt="Cover preview" style={{ maxWidth: '240px', borderRadius: '4px' }} />
                                             </div>
                                        )}
                                   </FormGroup>
                                   <FormGroup>
                                        <Label>Author Avatar</Label>
                                        <Input type="file" accept="image/*" onChange={onAvatarChange} />
                                        {authorAvatarUrl && (
                                             <div style={{ marginTop: '10px' }}>
                                                  <img src={authorAvatarUrl} alt="Avatar preview" style={{ width: '64px', height: '64px', borderRadius: '50%', objectFit: 'cover' }} />
                                             </div>
                                        )}
                                   </FormGroup>
                                   <FormGroup>
                                        <Label>Author</Label>
                                        <Input value={author} onChange={(e) => setAuthor(e.target.value)} />
                                   </FormGroup>
                                   <FormGroup>
                                        <Label>Content</Label>
                                        <textarea
                                             value={content}
                                             onChange={(e) => setContent(e.target.value)}
                                             rows={8}
                                             style={{ width: '100%', padding: '10px', border: '1px solid #e2e8f0', borderRadius: '4px', fontSize: '16px' }}
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
                                                            <DeleteButton onClick={() => handleDeletePost(post._id)}>Delete</DeleteButton>
                                                       </td>
                                                  </tr>
                                             ))}
                                        </tbody>
                                   </Table>
                              )}
                         </Panel>
                    </>
               )}

               {activeTab === 'members' && (
                    <div style={{ display: 'grid', gridTemplateColumns: selectedMemberId ? '1fr 1fr' : '1fr', gap: '20px' }}>
                         <Panel>
                              <h2 style={{ marginBottom: '20px' }}>Membership Applications {loading && <small>Loading…</small>}</h2>

                              {/* Filter buttons */}
                              <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                                   <Button onClick={() => loadMembers()}>All</Button>
                                   <Button onClick={() => setMembers(Array.isArray(members) ? filterMembers('pending') : [])}>
                                        Pending ({Array.isArray(members) ? filterMembers('pending').length : 0})
                                   </Button>
                                   <Button onClick={() => setMembers(Array.isArray(members) ? filterMembers('approved') : [])}>
                                        Approved ({Array.isArray(members) ? filterMembers('approved').length : 0})
                                   </Button>
                                   <Button onClick={() => setMembers(Array.isArray(members) ? filterMembers('rejected') : [])}>
                                        Rejected ({Array.isArray(members) ? filterMembers('rejected').length : 0})
                                   </Button>
                              </div>

                              {!loading && (!Array.isArray(members) || members.length === 0) && <p>No membership applications yet.</p>}
                              {Array.isArray(members) && members.length > 0 && (
                                   <Table>
                                        <thead>
                                             <tr>
                                                  <th>Name</th>
                                                  <th>Type</th>
                                                  <th>Status</th>
                                                  <th>Date</th>
                                                  <th>Actions</th>
                                             </tr>
                                        </thead>
                                        <tbody>
                                             {members.map((member) => (
                                                  <tr key={member._id} style={{ backgroundColor: selectedMemberId === member._id ? '#f0f9ff' : 'inherit' }}>
                                                       <td>{member.fullName}</td>
                                                       <td>{member.membershipType?.type || 'N/A'}</td>
                                                       <td>
                                                            <Badge type={member.status as 'pending' | 'approved' | 'rejected'}>
                                                                 {member.status}
                                                            </Badge>
                                                       </td>
                                                       <td>{new Date(member.createdAt).toLocaleDateString()}</td>
                                                       <td>
                                                            <div style={{ display: 'flex', gap: '5px' }}>
                                                                 <Button onClick={() => loadMemberDetails(member._id)}>View</Button>
                                                                 {member.status === 'pending' && (
                                                                      <>
                                                                           <Button onClick={() => handleUpdateMemberStatus(member._id, 'approved')}>Approve</Button>
                                                                           <Button onClick={() => handleUpdateMemberStatus(member._id, 'rejected')}>Reject</Button>
                                                                      </>
                                                                 )}
                                                                 <DeleteButton onClick={() => handleDeleteMember(member._id)}>Delete</DeleteButton>
                                                            </div>
                                                       </td>
                                                  </tr>
                                             ))}
                                        </tbody>
                                   </Table>
                              )}
                         </Panel>

                         {selectedMemberId && memberDetails && (
                              <Panel>
                                   <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                                        <h2>Member Details</h2>
                                        <Button onClick={() => { setSelectedMemberId(null); setMemberDetails(null); }}>Close</Button>
                                   </div>

                                   <div style={{ marginBottom: '20px' }}>
                                        <h3 style={{ marginBottom: '10px' }}>Status</h3>
                                        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
                                             <Badge type={memberDetails?.status || 'pending'}>
                                                  {memberDetails?.status || 'pending'}
                                             </Badge>

                                             {memberDetails?.status === 'pending' && (
                                                  <div style={{ display: 'flex', gap: '5px' }}>
                                                       <Button onClick={() => handleUpdateMemberStatus(memberDetails._id, 'approved')}>Approve</Button>
                                                       <Button onClick={() => handleUpdateMemberStatus(memberDetails._id, 'rejected')}>Reject</Button>
                                                  </div>
                                             )}
                                        </div>
                                   </div>

                                   <h3 style={{ marginBottom: '10px' }}>Personal Information</h3>
                                   <div style={{ marginBottom: '20px' }}>
                                        <p><strong>Name:</strong> {memberDetails?.fullName || 'N/A'}</p>
                                        <p><strong>Email:</strong> {memberDetails?.email || 'N/A'}</p>
                                        <p><strong>Phone:</strong> {memberDetails?.phoneNumber || 'N/A'}</p>
                                        <p><strong>Gender:</strong> {memberDetails?.gender || 'N/A'}</p>
                                        <p><strong>Location:</strong> {memberDetails?.cityCountry || 'N/A'}</p>
                                        <p><strong>Occupation:</strong> {memberDetails?.occupation || 'N/A'}</p>
                                        <p><strong>Application Date:</strong> {memberDetails?.createdAt ? new Date(memberDetails.createdAt).toLocaleString() : 'N/A'}</p>
                                   </div>

                                   <h3 style={{ marginBottom: '10px' }}>Membership Type</h3>
                                   <div style={{ marginBottom: '20px' }}>
                                        <p><strong>Type:</strong> {memberDetails?.membershipType?.type || 'N/A'}</p>
                                        {memberDetails?.membershipType?.educationalBackground && (
                                             <p><strong>Educational Background:</strong> {memberDetails.membershipType.educationalBackground}</p>
                                        )}

                                        <p><strong>Expertise:</strong></p>
                                        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                             {memberDetails?.membershipType?.expertise?.engineering && <li>Engineering</li>}
                                             {memberDetails?.membershipType?.expertise?.programming && <li>Programming</li>}
                                             {memberDetails?.membershipType?.expertise?.environmentalSciences && <li>Environmental Sciences</li>}
                                             {memberDetails?.membershipType?.expertise?.education && <li>Education</li>}
                                             {memberDetails?.membershipType?.expertise?.projectManagement && <li>Project Management</li>}
                                             {memberDetails?.membershipType?.expertise?.other && <li>Other: {memberDetails.membershipType.expertise.other}</li>}
                                        </ul>
                                   </div>

                                   <h3 style={{ marginBottom: '10px' }}>Interests & Motivation</h3>
                                   <div style={{ marginBottom: '20px' }}>
                                        <p><strong>Inspiration:</strong></p>
                                        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
                                             {memberDetails?.interest?.inspiration?.robotics && <li>Interest in Robotics</li>}
                                             {memberDetails?.interest?.inspiration?.stemEducation && <li>Passion for STEM Education</li>}
                                             {memberDetails?.interest?.inspiration?.environmentalAdvocacy && <li>Environmental Advocacy</li>}
                                             {memberDetails?.interest?.inspiration?.mentoring && <li>Desire to Mentor Young People</li>}
                                             {memberDetails?.interest?.inspiration?.networking && <li>Networking and Professional Growth</li>}
                                             {memberDetails?.interest?.inspiration?.other && <li>Other: {memberDetails.interest.inspiration.other}</li>}
                                        </ul>

                                        <p><strong>Motivation:</strong> {memberDetails?.interest?.motivation || 'N/A'}</p>

                                        <p><strong>Previous Experience:</strong> {memberDetails?.interest?.previousExperience?.hasExperience ? 'Yes' : 'No'}</p>
                                        {memberDetails?.interest?.previousExperience?.hasExperience && memberDetails.interest.previousExperience.description && (
                                             <p>{memberDetails.interest.previousExperience.description}</p>
                                        )}
                                   </div>

                                   <h3 style={{ marginBottom: '10px' }}>Commitments</h3>
                                   <div>
                                        <p><strong>Time Availability:</strong> {memberDetails?.commitments?.timeAvailability || 'N/A'}</p>
                                        <p><strong>Contribution:</strong> {memberDetails?.commitments?.contribution || 'N/A'}</p>
                                        <p><strong>Event Participation:</strong> {memberDetails?.commitments?.eventParticipation ? 'Yes' : 'No'}</p>
                                   </div>

                                   <div style={{ marginTop: '30px' }}>
                                        <DeleteButton onClick={() => handleDeleteMember(memberDetails._id)}>Delete Member</DeleteButton>
                                   </div>
                              </Panel>
                         )}
                    </div>
               )}
          </AdminContainer>
     );
}