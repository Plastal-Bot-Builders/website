import { getJson, postJson, delJson, putJson } from './client';

export interface Member {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  membershipType: {
    type: string;
  };
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export interface MemberDetail extends Member {
  dateOfBirth: string;
  gender: string;
  cityCountry: string;
  occupation: string;
  socialMedia: {
    linkedin: string;
    facebook: string;
    instagram: string;
    twitter: string;
    other: string;
  };
  membershipType: {
    type: string;
    educationalBackground: string;
    expertise: {
      engineering: boolean;
      programming: boolean;
      environmentalSciences: boolean;
      education: boolean;
      projectManagement: boolean;
      other: string;
    };
  };
  interest: {
    inspiration: {
      robotics: boolean;
      stemEducation: boolean;
      environmentalAdvocacy: boolean;
      mentoring: boolean;
      networking: boolean;
      other: string;
    };
    motivation: string;
    previousExperience: {
      hasExperience: boolean;
      description: string;
    };
  };
  commitments: {
    timeAvailability: string;
    contribution: string;
    eventParticipation: boolean;
  };
  additionalInfo: {
    referralSource: string;
    comments: string;
  };
  consents: {
    informationAccuracy: boolean;
    rulesAgreement: boolean;
    dataProcessing: boolean;
  };
}

/**
 * Fetch all members
 */
export async function fetchMembers(token: string): Promise<Member[]> {
  return getJson<Member[]>('/members', { token });
}

/**
 * Update a member's status
 */
export async function updateMemberStatus(
  id: string, 
  status: 'approved' | 'rejected',
  token: string
): Promise<Member> {
  return putJson<Member>(`/members/${id}/status`, { status }, { token });
}

/**
 * Delete a member
 */
export async function deleteMember(id: string, token: string): Promise<void> {
  return delJson<void>(`/members/${id}`, { token });
}

/**
 * Get detailed information about a specific member
 */
export async function getMemberDetails(id: string, token: string): Promise<MemberDetail> {
  return getJson<MemberDetail>(`/members/${id}`, { token });
}

/**
 * Register a new member (used by the membership form)
 */
export async function registerMember(memberData: any): Promise<Member> {
  return postJson<Member>('/members/register', memberData);
}

/**
 * Get member statistics (for dashboard)
 */
export async function getMemberStats(token: string): Promise<{
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}> {
  return getJson<{
    total: number;
    pending: number;
    approved: number;
    rejected: number;
  }>('/members/stats', { token });
}