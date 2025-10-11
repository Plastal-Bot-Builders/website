import React, { useState, useEffect } from 'react';
import { getToken, logout } from '../api/auth';
import { AdminContainer, Header, TabContainer, Tab, ErrorMessage } from '../components/admin/AdminStyles';
import { LoginForm } from '../components/admin/LoginForm';
import { DashboardPanel } from '../components/admin/DashboardPanel';
import { BlogManager } from '../components/admin/BlogManager';
import { MembershipManager } from '../components/admin/MembershipManager';
import { useBlogPosts } from '../components/admin/hooks/useBlogPosts';
import { useMembers } from '../components/admin/hooks/useMembers';
import { EventManager } from '../components/EventRegistration/admin/EventManager';

type TabType = 'blog' | 'members' | 'dashboard';

export default function Admin() {

  // Add a state for events
const [activeTab, setActiveTab] = useState<TabType>('dashboard' | 'blog' | 'members' | 'events');

// Add a new Tab in the TabContainer
<Tab 
  $active={activeTab === 'events'} 
  onClick={() => setActiveTab('events')}
>
  Events
</Tab>

// Add the EventManager component
{activeTab === 'events' && (
  <EventManager
    events={events}
    token={token}
    onEventsChange={loadEvents}
    loading={eventsLoading}
    setError={setError}
  />
)}

  // Auth state
  const [token, setToken] = useState<string | null>(getToken());
  
  // UI state
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  
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

  // Load initial data
  useEffect(() => {
    if (token) {
      loadPosts();
      loadMembers();
    }
  }, [token, loadPosts, loadMembers]);

  function handleLogout() {
    logout();
    setToken(null);
  }

  // If not authenticated, show login form
  if (!token) {
    return <LoginForm onLoginSuccess={setToken} />;
  }

  return (
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
    </AdminContainer>
  );
}