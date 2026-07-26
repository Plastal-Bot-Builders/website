import React from 'react';
import { Panel, Badge, Button, DeleteButton } from './AdminStyles';

interface MemberDetailsProps {
  memberDetails: any;
  onClose: () => void;
  onStatusUpdate: (id: string, status: 'approved' | 'rejected') => Promise<void>;
  onDelete: (id: string) => Promise<void>;
}

export function MemberDetails({ 
  memberDetails, 
  onClose, 
  onStatusUpdate, 
  onDelete 
}: MemberDetailsProps) {
  return (
    <Panel>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>Member Details</h2>
        <Button onClick={onClose}>Close</Button>
      </div>
      
      <div style={{ marginBottom: '20px' }}>
        <h3 style={{ marginBottom: '10px' }}>Status</h3>
        <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
          <Badge type={memberDetails?.status || 'pending'}>
            {memberDetails?.status || 'pending'}
          </Badge>
          
          {memberDetails?.status === 'pending' && (
            <div style={{ display: 'flex', gap: '5px' }}>
              <Button onClick={() => onStatusUpdate(memberDetails._id, 'approved')}>
                Approve
              </Button>
              <Button onClick={() => onStatusUpdate(memberDetails._id, 'rejected')}>
                Reject
              </Button>
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
        <p>
          <strong>Application Date:</strong> 
          {memberDetails?.createdAt ? new Date(memberDetails.createdAt).toLocaleString() : 'N/A'}
        </p>
      </div>
      
      <h3 style={{ marginBottom: '10px' }}>Membership Type</h3>
      <div style={{ marginBottom: '20px' }}>
        <p><strong>Type:</strong> {memberDetails?.membershipType?.type || 'N/A'}</p>
        {memberDetails?.membershipType?.educationalBackground && (
          <p>
            <strong>Educational Background:</strong> 
            {memberDetails.membershipType.educationalBackground}
          </p>
        )}
        
        <p><strong>Expertise:</strong></p>
        <ul style={{ listStyleType: 'disc', paddingLeft: '20px' }}>
          {memberDetails?.membershipType?.expertise?.engineering && <li>Engineering</li>}
          {memberDetails?.membershipType?.expertise?.programming && <li>Programming</li>}
          {memberDetails?.membershipType?.expertise?.environmentalSciences && <li>Environmental Sciences</li>}
          {memberDetails?.membershipType?.expertise?.education && <li>Education</li>}
          {memberDetails?.membershipType?.expertise?.projectManagement && <li>Project Management</li>}
          {memberDetails?.membershipType?.expertise?.other && (
            <li>Other: {memberDetails.membershipType.expertise.other}</li>
          )}
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
          {memberDetails?.interest?.inspiration?.other && (
            <li>Other: {memberDetails.interest.inspiration.other}</li>
          )}
        </ul>
        
        <p><strong>Motivation:</strong> {memberDetails?.interest?.motivation || 'N/A'}</p>
        
        <p>
          <strong>Previous Experience:</strong> 
          {memberDetails?.interest?.previousExperience?.hasExperience ? 'Yes' : 'No'}
        </p>
        {memberDetails?.interest?.previousExperience?.hasExperience && 
          memberDetails.interest.previousExperience.description && (
            <p>{memberDetails.interest.previousExperience.description}</p>
        )}
      </div>
      
      <h3 style={{ marginBottom: '10px' }}>Commitments</h3>
      <div>
        <p><strong>Time Availability:</strong> {memberDetails?.commitments?.timeAvailability || 'N/A'}</p>
        <p><strong>Contribution:</strong> {memberDetails?.commitments?.contribution || 'N/A'}</p>
        <p>
          <strong>Event Participation:</strong> 
          {memberDetails?.commitments?.eventParticipation ? 'Yes' : 'No'}
        </p>
      </div>
      
      <div style={{ marginTop: '30px' }}>
        <DeleteButton onClick={() => onDelete(memberDetails._id)}>
          Delete Member
        </DeleteButton>
      </div>
    </Panel>
  );
}