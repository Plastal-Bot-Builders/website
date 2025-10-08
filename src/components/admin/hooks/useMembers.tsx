import { useState, useCallback } from 'react';
import { fetchMembers, getMemberDetails, updateMemberStatus, deleteMember, Member } from '../../../api/members';

export function useMembers(token: string | null) {
     const [members, setMembers] = useState<Member[]>([]);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);

     const loadMembers = useCallback(async () => {
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
     }, [token]);

     const loadMemberDetails = useCallback(async (id: string) => {
          if (!token) throw new Error('Not authenticated');
          setError(null);
          setLoading(true);
          try {
               const details = await getMemberDetails(id, token);
               return details;
          } catch (e: any) {
               console.error('Load member details error:', e);
               setError(e?.message || 'Failed to load member details');
               throw e;
          } finally {
               setLoading(false);
          }
     }, [token]);

     const handleUpdateMemberStatus = useCallback(async (id: string, status: 'approved' | 'rejected') => {
          if (!token) {
               setError('Not authenticated');
               return;
          }

          setError(null);
          try {
               await updateMemberStatus(id, status, token);
               await loadMembers();
          } catch (e: any) {
               setError(e?.message || 'Failed to update member status');
          }
     }, [token, loadMembers]);

     const handleDeleteMember = useCallback(async (id: string) => {
          if (!token) {
               setError('Not authenticated');
               return;
          }
          if (!window.confirm('Delete this member? This action cannot be undone.')) return;

          setError(null);
          try {
               await deleteMember(id, token);

               // Also update local state to immediately remove the member
               setMembers(prevMembers =>
                    Array.isArray(prevMembers)
                         ? prevMembers.filter(member => member._id !== id)
                         : []
               );

               await loadMembers(); // Reload the full list from server
          } catch (e: any) {
               console.error('Delete member error:', e);

               // Handle 404 specifically
               if (e.response?.status === 404) {
                    setError('Member not found. The list will be refreshed.');
                    // Refresh the member list if we get a 404
                    await loadMembers();
               } else {
                    setError(e?.message || 'Failed to delete member');
               }
          }
     }, [token, loadMembers]);

     return {
          members,
          loading,
          error,
          loadMembers,
          loadMemberDetails,
          handleUpdateMemberStatus,
          handleDeleteMember,
          setError
     };
}