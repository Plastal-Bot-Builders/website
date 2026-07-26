import React from 'react';
import { Panel, Table, Badge, StatsCard } from './AdminStyles';
import { Member, MemberStats } from '../../api/members';
import { Post } from '../../api/posts';

interface DashboardPanelProps {
     posts: Post[];
     members: Member[];
     stats: MemberStats | null;
}

export function DashboardPanel({ posts, members, stats }: DashboardPanelProps) {
     return (
          <Panel>
               <h2 style={{ marginBottom: '20px' }}>Dashboard Overview</h2>

               <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px' }}>
                    <StatsCard>
                         <h3>Blog Posts</h3>
                         <p>{Array.isArray(posts) ? posts.length : 0}</p>
                    </StatsCard>

                    <StatsCard>
                         <h3>Members</h3>
                         <p>{stats?.total ?? (Array.isArray(members) ? members.length : 0)}</p>
                    </StatsCard>

                    <StatsCard>
                         <h3>Pending Applications</h3>
                         <p>{stats?.pending ?? 0}</p>
                    </StatsCard>

                    <StatsCard>
                         <h3>Approved Members</h3>
                         <p>{stats?.approved ?? 0}</p>
                    </StatsCard>
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
     );
}