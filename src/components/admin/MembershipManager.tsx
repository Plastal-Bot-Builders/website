import React, { useState } from 'react';
import { Member, MemberStats, Pagination } from '../../api/members';
import { Panel, Button, Table, Badge, DeleteButton, Input } from './AdminStyles';
import { MemberDetails } from './MemberDetails';
import { StatusFilter } from './hooks/useMembers';

interface MembershipManagerProps {
     members: Member[];
     token: string;
     loading: boolean;
     stats: MemberStats | null;
     pagination: Pagination | null;
     page: number;
     setPage: (page: number) => void;
     search: string;
     onSearch: (value: string) => void;
     statusFilter: StatusFilter;
     onStatusFilter: (value: StatusFilter) => void;
     setError: (error: string | null) => void;
     onLoadMembers: () => Promise<void>;
     onLoadMemberDetails: (id: string) => Promise<any>;
     onUpdateMemberStatus: (id: string, status: 'approved' | 'rejected', reason?: string) => Promise<void>;
     onDeleteMember: (id: string) => Promise<void>;
}

export function MembershipManager({
     members,
     token,
     loading,
     stats,
     pagination,
     page,
     setPage,
     search,
     onSearch,
     statusFilter,
     onStatusFilter,
     setError,
     onLoadMembers,
     onLoadMemberDetails,
     onUpdateMemberStatus,
     onDeleteMember
}: MembershipManagerProps) {
     const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
     const [memberDetails, setMemberDetails] = useState<any>(null);
     const [searchInput, setSearchInput] = useState(search);

     async function handleViewMember(id: string) {
          try {
               const details = await onLoadMemberDetails(id);
               setMemberDetails(details);
               setSelectedMemberId(id);
          } catch (error) {
               // Error handling is done in the parent component
          }
     }

     function handleCloseMemberDetails() {
          setSelectedMemberId(null);
          setMemberDetails(null);
     }

     function handleSearchSubmit(e: React.FormEvent) {
          e.preventDefault();
          onSearch(searchInput.trim());
     }

     function handleReject(id: string) {
          const reason = window.prompt('Reason for rejection (optional — it will be emailed to the applicant):');
          if (reason === null) return; // cancelled
          onUpdateMemberStatus(id, 'rejected', reason.trim() || undefined);
     }

     const filterButton = (value: StatusFilter, label: string, count?: number) => (
          <Button
               onClick={() => onStatusFilter(value)}
               style={statusFilter === value ? { borderColor: 'var(--accent)', backgroundColor: 'var(--surface-hover-bg)' } : {}}
          >
               {label}{typeof count === 'number' ? ` (${count})` : ''}
          </Button>
     );

     const totalPages = pagination?.totalPages ?? 1;

     return (
          <div style={{ display: 'grid', gridTemplateColumns: selectedMemberId ? '1fr 1fr' : '1fr', gap: '20px' }}>
               <Panel>
                    <h2 style={{ marginBottom: '20px' }}>
                         Membership Applications {loading && <small>Loading…</small>}
                    </h2>

                    {/* Search (server-side, matches name or email) */}
                    <form onSubmit={handleSearchSubmit} style={{ marginBottom: '15px', display: 'flex', gap: '10px' }}>
                         <Input
                              value={searchInput}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchInput(e.target.value)}
                              placeholder="Search by name or email…"
                              style={{ maxWidth: '300px' }}
                         />
                         <Button type="submit">Search</Button>
                         {search && (
                              <Button
                                   type="button"
                                   onClick={() => { setSearchInput(''); onSearch(''); }}
                              >
                                   Clear
                              </Button>
                         )}
                    </form>

                    {/* Status filters (server-side, counts from stats) */}
                    <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
                         {filterButton('all', 'All', stats?.total)}
                         {filterButton('pending', 'Pending', stats?.pending)}
                         {filterButton('approved', 'Approved', stats?.approved)}
                         {filterButton('rejected', 'Rejected', stats?.rejected)}
                    </div>

                    {!loading && (!Array.isArray(members) || members.length === 0) && (
                         <p>{search || statusFilter !== 'all' ? 'No members match the current filters.' : 'No membership applications yet.'}</p>
                    )}

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
                                        <tr
                                             key={member._id}
                                             style={{ backgroundColor: selectedMemberId === member._id ? 'var(--selected-row-bg)' : 'inherit' }}
                                        >
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
                                                       <Button onClick={() => handleViewMember(member._id)}>
                                                            View
                                                       </Button>
                                                       {member.status === 'pending' && (
                                                            <>
                                                                 <Button onClick={() => onUpdateMemberStatus(member._id, 'approved')}>
                                                                      Approve
                                                                 </Button>
                                                                 <Button onClick={() => handleReject(member._id)}>
                                                                      Reject
                                                                 </Button>
                                                            </>
                                                       )}
                                                       <DeleteButton onClick={() => onDeleteMember(member._id)}>
                                                            Delete
                                                       </DeleteButton>
                                                  </div>
                                             </td>
                                        </tr>
                                   ))}
                              </tbody>
                         </Table>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                         <div style={{ marginTop: '15px', display: 'flex', gap: '10px', alignItems: 'center' }}>
                              <Button disabled={page <= 1} onClick={() => setPage(page - 1)}>
                                   ← Previous
                              </Button>
                              <span>Page {pagination?.currentPage ?? page} of {totalPages}</span>
                              <Button disabled={page >= totalPages} onClick={() => setPage(page + 1)}>
                                   Next →
                              </Button>
                         </div>
                    )}
               </Panel>

               {selectedMemberId && memberDetails && (
                    <MemberDetails
                         memberDetails={memberDetails}
                         onClose={handleCloseMemberDetails}
                         onStatusUpdate={onUpdateMemberStatus}
                         onDelete={onDeleteMember}
                    />
               )}
          </div>
     );
}
