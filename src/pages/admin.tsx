import React, { useState, useEffect, useCallback } from 'react';
import { getToken, logout } from '../api/auth';
import { getJson } from '../api/client';
import { AdminContainer, Header, TabContainer, Tab, ErrorMessage } from '../components/admin/AdminStyles';
import { LoginForm } from '../components/admin/LoginForm';
import { DashboardPanel } from '../components/admin/DashboardPanel';
import { BlogManager } from '../components/admin/BlogManager';
import { MembershipManager } from '../components/admin/MembershipManager';
import { useBlogPosts } from '../components/admin/hooks/useBlogPosts';
import { useMembers } from '../components/admin/hooks/useMembers';
import { EventManager } from '../components/admin/EventManager';
import { SubscribersPanel } from '../components/admin/SubscribersPanel';
import { Helmet } from 'react-helmet-async';
import { Button } from '../components/admin/AdminStyles';

// Update type definition to include 'events'
type TabType = 'dashboard' | 'blog' | 'members' | 'events' | 'subscribers';

export default function Admin() {
  // Auth state
  const [token, setToken] = useState<string | null>(getToken());
  // Correctly initialize the activeTab
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Add events state
  const [events, setEvents] = useState<any[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);
  const [eventsError, setEventsError] = useState<string | null>(null);

  // Use custom hooks for data management
  const {
    posts,
    loading: postsLoading,
    error: postsError,
    loadPosts,
    setError: setPostsError
  } = useBlogPosts();

  const {
    members,
    loading: membersLoading,
    error: membersError,
    stats: memberStats,
    pagination: membersPagination,
    page: membersPage,
    setPage: setMembersPage,
    search: membersSearch,
    applySearch: applyMembersSearch,
    statusFilter: membersStatusFilter,
    applyStatusFilter: applyMembersStatusFilter,
    loadMembers,
    loadStats,
    loadMemberDetails,
    handleUpdateMemberStatus,
    handleDeleteMember,
    setError: setMembersError
  } = useMembers(token);

  // Get consolidated error state
  const error = postsError || membersError || eventsError;

  // Handle setting errors
  const setError = (e: string | null) => {
    setPostsError(e);
    setMembersError(e);
  };

  // Function to load events
  const loadEvents = useCallback(async () => {
    if (!token) return;
    setEventsLoading(true);
    setEventsError(null);
    try {
      const data = await getJson<{ data?: any[] }>('/events', { token, query: { all: true } });
      setEvents(data.data || []);
    } catch (err) {
      setEventsError('Events could not be loaded. Please try refreshing the overview.');
    } finally {
      setEventsLoading(false);
    }
  }, [token]);

  // Load initial data
  useEffect(() => {
    if (token) {
      loadPosts();
      loadEvents();
    }
  }, [token, loadPosts, loadEvents]);

  function handleLogout() {
    logout();
    setToken(null);
  }

  // If not authenticated, show login form
  if (!token) {
    return <><Helmet><title>Admin sign in | Plastal-Bot Builders</title><meta name="robots" content="noindex, nofollow" /></Helmet><LoginForm onLoginSuccess={setToken} /></>;
  }

  return (
    <>
      <Helmet><title>Admin dashboard | Plastal-Bot Builders</title><meta name="robots" content="noindex, nofollow" /></Helmet>
      <AdminContainer>
        <Header>
          <div><p style={{ margin: '0 0 6px', fontSize: 14 }}>Plastal-Bot Builders · Administration</p><h1 style={{ margin: 0 }}>Your workspace</h1><p style={{ margin: '8px 0 0' }}>Manage stories, events and the people in your community.</p></div>
          <Button onClick={handleLogout}>Log out</Button>
        </Header>

        {error && <ErrorMessage role="alert">{error}</ErrorMessage>}

        <TabContainer role="navigation" aria-label="Admin sections">
          <Tab
            $active={activeTab === 'dashboard'} aria-current={activeTab === 'dashboard' ? 'page' : undefined}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </Tab>
          <Tab
            $active={activeTab === 'blog'} aria-current={activeTab === 'blog' ? 'page' : undefined}
            onClick={() => setActiveTab('blog')}
          >
            Blog Posts
          </Tab>
          <Tab
            $active={activeTab === 'members'} aria-current={activeTab === 'members' ? 'page' : undefined}
            onClick={() => setActiveTab('members')}
          >
            Membership
          </Tab>
          {/* Add the Events tab here */}
          <Tab
            $active={activeTab === 'events'} aria-current={activeTab === 'events' ? 'page' : undefined}
            onClick={() => setActiveTab('events')}
          >
            Events
          </Tab>
          <Tab
            $active={activeTab === 'subscribers'} aria-current={activeTab === 'subscribers' ? 'page' : undefined}
            onClick={() => setActiveTab('subscribers')}
          >
            Subscribers
          </Tab>
        </TabContainer>

        {activeTab === 'dashboard' && (
          <DashboardPanel posts={posts} members={members} stats={memberStats}
            loading={postsLoading || membersLoading || eventsLoading} error={!!error}
            onRefresh={() => { loadPosts(); loadMembers(); loadStats(); loadEvents(); }}
            onNavigate={(tab) => { if (tab === 'members') { applyMembersSearch(''); applyMembersStatusFilter('pending'); } setActiveTab(tab); }} />
        )}

        {activeTab === 'blog' && (
          <BlogManager
            posts={posts}
            token={token}
            onPostsChange={loadPosts}
            loading={postsLoading}
            setError={setError}
          />
        )}

        {activeTab === 'members' && (
          <MembershipManager
            members={members}
            token={token}
            loading={membersLoading}
            stats={memberStats}
            pagination={membersPagination}
            page={membersPage}
            setPage={setMembersPage}
            search={membersSearch}
            onSearch={applyMembersSearch}
            statusFilter={membersStatusFilter}
            onStatusFilter={applyMembersStatusFilter}
            setError={setError}
            onLoadMembers={loadMembers}
            onLoadMemberDetails={loadMemberDetails}
            onUpdateMemberStatus={handleUpdateMemberStatus}
            onDeleteMember={handleDeleteMember}
          />
        )}

        {activeTab === 'subscribers' && (
          <SubscribersPanel token={token} setError={setError} />
        )}

        {/* Add the EventManager component */}
        {activeTab === 'events' && (
          <EventManager
            events={events}
            token={token}
            onEventsChange={loadEvents}
            loading={eventsLoading}
            setError={setError}
          />
        )}
      </AdminContainer>
    </>
  );
}