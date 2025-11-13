import React, { useState, useEffect } from 'react';
import { getToken, logout } from '../api/auth';
import { AdminContainer, Header, TabContainer, Tab, ErrorMessage } from '../components/admin/AdminStyles';
import { LoginForm } from '../components/admin/LoginForm';
import { DashboardPanel } from '../components/admin/DashboardPanel';
import { BlogManager } from '../components/admin/BlogManager';
import { MembershipManager } from '../components/admin/MembershipManager';
import { useBlogPosts } from '../components/admin/hooks/useBlogPosts';
import { useMembers } from '../components/admin/hooks/useMembers';
import { EventManager } from '../components/admin/EventManager';
import { SEOConfig } from '../components/SEO';

// Update type definition to include 'events'
type TabType = 'dashboard' | 'blog' | 'members' | 'events';

export default function Admin() {
  // Auth state
  const [token, setToken] = useState<string | null>(getToken());
  // Correctly initialize the activeTab
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');

  // Add events state
  const [events, setEvents] = useState<any[]>([]);
  const [eventsLoading, setEventsLoading] = useState(false);

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
    loadMembers,
    loadMemberDetails,
    handleUpdateMemberStatus,
    handleDeleteMember,
    setError: setMembersError
  } = useMembers(token);

  // Get consolidated error state
  const error = postsError || membersError;

  // Handle setting errors
  const setError = (e: string | null) => {
    setPostsError(e);
    setMembersError(e);
  };

  // Function to load events
  const loadEvents = async () => {
    if (!token) return;
    setEventsLoading(true);
    try {
      // Replace with your actual API call
      const response = await fetch('/api/events', {
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await response.json();
      setEvents(data.data || []);
    } catch (err) {
      setError('Failed to load events');
    } finally {
      setEventsLoading(false);
    }
  };

  // Load initial data
  useEffect(() => {
    if (token) {
      loadPosts();
      loadMembers();
      loadEvents();
    }
  }, [token, loadPosts, loadMembers, loadEvents]);

  function handleLogout() {
    logout();
    setToken(null);
  }

  // If not authenticated, show login form
  if (!token) {
    return <LoginForm onLoginSuccess={setToken} />;
  }

  return (
    <>
      <SEOConfig
        title="About | Plastal-Bot Builders"
        description="Learn more about Plastal-Bot Builders, our mission, and the team behind our innovative programs."
        image="/resources/Photos/fredmpelembe.jpeg"
      />
      <AdminContainer>
        <Header>
          <h1>Admin Dashboard</h1>
          <button
            onClick={handleLogout}
            style={{
              backgroundColor: '#0CFFBB',
              color: '#000',
              border: 'none',
              padding: '10px 15px',
              borderRadius: '4px',
              cursor: 'pointer',
              fontWeight: 'bold'
            }}
          >
            Log out
          </button>
        </Header>

        {error && <ErrorMessage>{error}</ErrorMessage>}

        <TabContainer>
          <Tab
            $active={activeTab === 'dashboard'}
            onClick={() => setActiveTab('dashboard')}
          >
            Dashboard
          </Tab>
          <Tab
            $active={activeTab === 'blog'}
            onClick={() => setActiveTab('blog')}
          >
            Blog Posts
          </Tab>
          <Tab
            $active={activeTab === 'members'}
            onClick={() => setActiveTab('members')}
          >
            Membership
          </Tab>
          {/* Add the Events tab here */}
          <Tab
            $active={activeTab === 'events'}
            onClick={() => setActiveTab('events')}
          >
            Events
          </Tab>
        </TabContainer>

        {activeTab === 'dashboard' && (
          <DashboardPanel posts={posts} members={members} />
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
            setError={setError}
            onLoadMembers={loadMembers}
            onLoadMemberDetails={loadMemberDetails}
            onUpdateMemberStatus={handleUpdateMemberStatus}
            onDeleteMember={handleDeleteMember}
          />
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