import { useState, useCallback, useEffect } from 'react';
import {
     fetchMembers,
     getMemberDetails,
     getMemberStats,
     updateMemberStatus,
     deleteMember,
     Member,
     MemberStats,
     MemberStatus,
     Pagination
} from '../../../api/members';

export type StatusFilter = 'all' | MemberStatus;

export function useMembers(token: string | null) {
     const [members, setMembers] = useState<Member[]>([]);
     const [loading, setLoading] = useState(false);
     const [error, setError] = useState<string | null>(null);

     // Server-side query state
     const [search, setSearch] = useState('');
     const [statusFilter, setStatusFilter] = useState<StatusFilter>('all');
     const [page, setPage] = useState(1);
     const [pagination, setPagination] = useState<Pagination | null>(null);
     const [stats, setStats] = useState<MemberStats | null>(null);

     const loadMembers = useCallback(async () => {
          if (!token) return;
          setError(null);
          setLoading(true);
          try {
               const result = await fetchMembers(token, {
                    search: search || undefined,
                    status: statusFilter === 'all' ? undefined : statusFilter,
                    page,
                    limit: 10
               });
               setMembers(result.members);
               setPagination(result.pagination);
          } catch (e: any) {
               console.error('Load members error:', e);
               setError(e?.message || 'Failed to load members');
               setMembers([]);
          } finally {
               setLoading(false);
          }
     }, [token, search, statusFilter, page]);

     const loadStats = useCallback(async () => {
          if (!token) return;
          try {
               setStats(await getMemberStats(token));
          } catch (e) {
               // Stats are non-critical; keep the last known values on failure
               console.error('Load member stats error:', e);
          }
     }, [token]);

     useEffect(() => {
          if (!token) return;

          // Initial load
          loadMembers();
          loadStats();

          // Set up auto-refresh every 30 seconds
          const refreshInterval = setInterval(() => {
               if (document.visibilityState === 'visible') {
                    loadMembers();
                    loadStats();
               }
          }, 30000);

          // Clean up interval
          return () => clearInterval(refreshInterval);
     }, [token, loadMembers, loadStats]);

     // Changing search or status filter should restart from page 1
     const applySearch = useCallback((value: string) => {
          setSearch(value);
          setPage(1);
     }, []);

     const applyStatusFilter = useCallback((value: StatusFilter) => {
          setStatusFilter(value);
          setPage(1);
     }, []);

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

     const handleUpdateMemberStatus = useCallback(async (id: string, status: 'approved' | 'rejected', reason?: string) => {
          if (!token) {
               setError('Not authenticated');
               return;
          }

          setError(null);
          try {
               await updateMemberStatus(id, status, token, reason);

               // Optimistically update local state
               setMembers(prevMembers =>
                    Array.isArray(prevMembers)
                         ? prevMembers.map(m => m._id === id ? { ...m, status } : m)
                         : []
               );

               // Reload members to ensure we have the latest data
               await loadMembers();
               await loadStats();
          } catch (e: any) {
               console.error('Update member status error:', e);

               if (e.status === 404) {
                    setError('Member not found or API endpoint incorrect. The list will be refreshed.');
                    // Remove the member from local state if we get a 404
                    setMembers(prevMembers =>
                         Array.isArray(prevMembers)
                              ? prevMembers.filter(m => m._id !== id)
                              : []
                    );
                    await loadMembers();
               } else {
                    setError(e?.message || `Failed to update member status: ${e}`);
               }
          }
     }, [token, loadMembers, loadStats]);

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
               await loadStats();
          } catch (e: any) {
               console.error('Delete member error:', e);

               // Handle 404 specifically
               if (e.status === 404) {
                    setError('Member not found. The list will be refreshed.');
                    // Refresh the member list if we get a 404
                    await loadMembers();
               } else {
                    setError(e?.message || 'Failed to delete member');
               }
          }
     }, [token, loadMembers, loadStats]);

     return {
          members,
          loading,
          error,
          stats,
          pagination,
          page,
          setPage,
          search,
          applySearch,
          statusFilter,
          applyStatusFilter,
          loadMembers,
          loadStats,
          loadMemberDetails,
          handleUpdateMemberStatus,
          handleDeleteMember,
          setError
     };
}
