import React, { useState } from 'react';
import { Member } from '../../api/members';
import { Panel, Button, Table, Badge } from './AdminStyles';
import { MemberDetails } from './MemberDetails';

interface MembershipManagerProps {
  members: Member[];
  token: string;
  loading: boolean;
  setError: (error: string | null) => void;
  onLoadMembers: () => Promise<void>;
  onLoadMemberDetails: (id: string) => Promise<any>;
  onUpdateMemberStatus: (id: string, status: 'approved' | 'rejected') => Promise<void>;
  onDeleteMember: (id: string) => Promise<void>;
}

export function MembershipManager({
  members,
  token,
  loading,
  setError,
  onLoadMembers,
  onLoadMemberDetails,
  onUpdateMemberStatus,
  onDeleteMember
}: MembershipManagerProps) {
  const [selectedMemberId, setSelectedMemberId] = useState<string | null>(null);
  const [memberDetails, setMemberDetails] = useState<any>(null);
  
  // Safety function for member filtering
  function filterMembers(status: 'pending' | 'approved' | 'rejected') {
    if (!Array.isArray(members)) {
      return [];
    }
    return members.filter(m => m.status === status);
  }
  
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

  return (
    <div style={{ display: 'grid', gridTemplateColumns: selectedMemberId ? '1fr 1fr' : '1fr', gap: '20px' }}>
      <Panel>
        <h2 style={{ marginBottom: '20px' }}>
          Membership Applications {loading && <small>Loading…</small>}
        </h2>

        {/* Filter buttons */}
        <div style={{ marginBottom: '20px', display: 'flex', gap: '10px' }}>
          <Button onClick={onLoadMembers}>
            All
          </Button>
          <Button onClick={() => setError(null)}>
            Pending ({Array.isArray(members) ? filterMembers('pending').length : 0})
          </Button>
          <Button onClick={() => setError(null)}>
            Approved ({Array.isArray(members) ? filterMembers('approved').length : 0})
          </Button>
          <Button onClick={() => setError(null)}>
            Rejected ({Array.isArray(members) ? filterMembers('rejected').length : 0})
          </Button>
        </div>

        {!loading && (!Array.isArray(members) || members.length === 0) && (
          <p>No membership applications yet.</p>
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
                          <Button onClick={() => onUpdateMemberStatus(member._id, 'rejected')}>
                            Reject
                          </Button>
                        </>
                      )}
                      <Button 
                        style={{ backgroundColor: '#f56565', color: 'white' }}
                        onClick={() => onDeleteMember(member._id)}
                      >
                        Delete
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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