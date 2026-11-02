import React from 'react';
import { Panel, Table, Badge, StatsCard, Button } from './AdminStyles';
import { Member, MemberStats } from '../../api/members';
import { Post } from '../../api/posts';

interface DashboardPanelProps {
     posts: Post[];
     members: Member[];
     stats: MemberStats | null;
     loading: boolean;
     error: boolean;
     onRefresh: () => void;
     onNavigate: (tab: 'blog' | 'members' | 'events' | 'subscribers') => void;
}

export function DashboardPanel({ posts, members, stats, loading, error, onRefresh, onNavigate }: DashboardPanelProps) {
     return (
          <Panel aria-busy={loading}>
               <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, flexWrap: 'wrap', marginBottom: 24 }}>
                    <div><h2 style={{ margin: 0 }}>Community overview</h2><p role="status" style={{ marginTop: 8 }}>{loading ? 'Updating your overview…' : error ? 'Some information is unavailable. Try refreshing.' : 'A snapshot of your community and published stories.'}</p></div>
                    <Button onClick={onRefresh} disabled={loading}>{loading ? 'Refreshing…' : 'Refresh overview'}</Button>
               </div>

               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <StatsCard>
                         <h3>Blog Posts</h3>
                         <p>{loading || error ? '—' : posts.length}</p>
                    </StatsCard>

                    <StatsCard>
                         <h3>Members</h3>
                         <p>{loading || error ? '—' : stats?.total ?? '—'}</p>
                    </StatsCard>

                    <StatsCard>
                         <h3>Pending Applications</h3>
                         <p>{loading || error ? '—' : stats?.pending ?? '—'}</p>
                    </StatsCard>

                    <StatsCard>
                         <h3>Approved Members</h3>
                         <p>{loading || error ? '—' : stats?.approved ?? '—'}</p>
                    </StatsCard>
               </div>

               <div style={{ marginTop: 28 }}>
                    <h3 style={{ marginBottom: 12 }}>What would you like to do?</h3>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                         <Button onClick={() => onNavigate('members')}>Review pending applications</Button>
                         <Button onClick={() => onNavigate('blog')}>Manage blog posts</Button>
                         <Button onClick={() => onNavigate('events')}>Manage events</Button>
                         <Button onClick={() => onNavigate('subscribers')}>View subscribers</Button>
                    </div>
               </div>
               <div style={{ marginTop: '30px' }}>
                    <h3 style={{ marginBottom: '15px' }}>Applications in your current view</h3>

                    {Array.isArray(members) && members.length > 0 ? (
                         <div role="region" aria-label="Membership applications" tabIndex={0} style={{ overflowX: 'auto' }}><Table>
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
                         </Table></div>
                    ) : (
                         <p>{loading ? 'Loading applications…' : error ? 'Applications could not be displayed. Refresh to try again.' : 'No applications in this view. Open Membership to search or change filters.'}</p>
                    )}
               </div>
          </Panel>
     );
}