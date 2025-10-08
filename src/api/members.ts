import { getJson, postJson, delJson, putJson } from './client';

// Base URL for all member endpoints
const BASE_PATH = '/members';

/**
 * Member status types
 */
export type MemberStatus = 'pending' | 'approved' | 'rejected';

/**
 * Basic member information returned in list views
 */
export interface Member {
  _id: string;
  fullName: string;
  email: string;
  phoneNumber: string;
  membershipType: {
    type: string;
  };
  status: MemberStatus;
  createdAt: string;
}

/**
 * Social media links for a member
 */
export interface SocialMedia {
  linkedin: string;
  facebook: string;
  instagram: string;
  twitter: string;
  other: string;
}

/**
 * Areas of expertise
 */
export interface Expertise {
  engineering: boolean;
  programming: boolean;
  environmentalSciences: boolean;
  education: boolean;
  projectManagement: boolean;
  other: string;
}

/**
 * Sources of inspiration for joining
 */
export interface Inspiration {
  robotics: boolean;
  stemEducation: boolean;
  environmentalAdvocacy: boolean;
  mentoring: boolean;
  networking: boolean;
  other: string;
}

/**
 * Previous experience information
 */
export interface PreviousExperience {
  hasExperience: boolean;
  description: string;
}

/**
 * Member commitments to the organization
 */
export interface Commitments {
  timeAvailability: string;
  contribution: string;
  eventParticipation: boolean;
}

/**
 * Additional member information
 */
export interface AdditionalInfo {
  referralSource: string;
  comments: string;
}

/**
 * Required consent flags
 */
export interface Consents {
  informationAccuracy: boolean;
  rulesAgreement: boolean;
  dataProcessing: boolean;
}

/**
 * Detailed member information with all fields
 */
export interface MemberDetail extends Member {
  dateOfBirth: string;
  gender: string;
  cityCountry: string;
  occupation: string;
  socialMedia: SocialMedia;
  membershipType: {
    type: string;
    educationalBackground: string;
    expertise: Expertise;
  };
  interest: {
    inspiration: Inspiration;
    motivation: string;
    previousExperience: PreviousExperience;
  };
  commitments: Commitments;
  additionalInfo: AdditionalInfo;
  consents: Consents;
}

/**
 * Response for statistical data about members
 */
export interface MemberStats {
  total: number;
  pending: number;
  approved: number;
  rejected: number;
}

/**
 * API response structure for member operations
 */
export interface MemberResponse<T> {
  status: 'success' | 'error';
  data?: T;
  message?: string;
}

/**
 * Fetch all members
 * 
 * @param token - Authentication token
 * @returns Promise resolving to an array of members
 */
export async function fetchMembers(token: string): Promise<Member[]> {
  try {
    const response = await getJson<MemberResponse<Member[]>>(BASE_PATH, { token });
    return response.data || [];
  } catch (error) {
    console.error('Error fetching members:', error);
    throw error;
  }
}

/**
 * Update a member's status
 * 
 * @param id - Member ID
 * @param status - New status ('approved' or 'rejected')
 * @param token - Authentication token
 * @returns Promise resolving to the updated member
 */
export async function updateMemberStatus(
  id: string, 
  status: 'approved' | 'rejected', 
  token: string
): Promise<Member> {
  try {
    const response = await putJson<MemberResponse<Member>>(
      `${BASE_PATH}/${id}`, 
      { status }, 
      { token }
    );
    
    if (!response.data) {
      throw new Error(response.message || 'Failed to update member status');
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error updating member ${id} status to ${status}:`, error);
    throw error;
  }
}

/**
 * Delete a member
 * 
 * @param id - Member ID
 * @param token - Authentication token
 * @returns Promise resolving when the deletion is complete
 */
export async function deleteMember(id: string, token: string): Promise<void> {
  try {
    await delJson<MemberResponse<void>>(`${BASE_PATH}/${id}`, { token });
  } catch (error: any) {
    // Special handling for 404s - member might have been deleted already
    if (error.response?.status === 404) {
      console.warn(`Member ${id} not found - might have been deleted already`);
      return; // Return successfully since the member doesn't exist anyway
    }
    console.error(`Error deleting member ${id}:`, error);
    throw error;
  }
}

/**
 * Get detailed information about a specific member
 * 
 * @param id - Member ID
 * @param token - Authentication token
 * @returns Promise resolving to detailed member information
 */
export async function getMemberDetails(id: string, token: string): Promise<MemberDetail> {
  try {
    const response = await getJson<MemberResponse<MemberDetail>>(
      `${BASE_PATH}/${id}`, 
      { token }
    );
    
    if (!response.data) {
      throw new Error(response.message || 'Failed to get member details');
    }
    
    return response.data;
  } catch (error) {
    console.error(`Error getting details for member ${id}:`, error);
    throw error;
  }
}

/**
 * Registration data for new member signup
 */
export interface MemberRegistrationData {
  fullName: string;
  email: string;
  phoneNumber: string;
  [key: string]: any; // Allow additional fields for the complete form
}

/**
 * Register a new member (used by the membership form)
 * 
 * @param memberData - New member registration data
 * @returns Promise resolving to the created member
 */
export async function registerMember(memberData: MemberRegistrationData): Promise<Member> {
  try {
    const response = await postJson<MemberResponse<Member>>(
      `${BASE_PATH}/register`, 
      memberData
    );
    
    if (!response.data) {
      throw new Error(response.message || 'Failed to register member');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error registering new member:', error);
    throw error;
  }
}

/**
 * Get member statistics for dashboard
 * 
 * @param token - Authentication token
 * @returns Promise resolving to member statistics
 */
export async function getMemberStats(token: string): Promise<MemberStats> {
  try {
    const response = await getJson<MemberResponse<MemberStats>>(
      `${BASE_PATH}/stats`, 
      { token }
    );
    
    if (!response.data) {
      throw new Error(response.message || 'Failed to get member statistics');
    }
    
    return response.data;
  } catch (error) {
    console.error('Error getting member statistics:', error);
    throw error;
  }
}