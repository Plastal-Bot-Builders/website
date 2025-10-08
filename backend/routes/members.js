import { Router } from 'express';
import Member from '../models/Member.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

/**
 * POST /api/members/register
 * Register a new member
 */
const authMiddleware = requireAuth; // Apply authentication middleware for protected routes
router.put('/:id', authMiddleware, async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;
    
    // Validate status value
    if (status !== 'approved' && status !== 'rejected') {
      return res.status(400).json({
        status: 'error',
        message: 'Invalid status value'
      });
    }
    
    const member = await Member.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    
    if (!member) {
      return res.status(404).json({
        status: 'error',
        message: 'Member not found'
      });
    }
    
    res.json({
      status: 'success',
      data: member
    });
  } catch (error) {
    console.error('Update member status error:', error);
    res.status(500).json({
      status: 'error',
      message: 'Server error updating member status'
    });
  }
});

router.post('/register', async (req, res) => {
  try {
    // Check for existing member with the same email
    const existingMember = await Member.findOne({ email: req.body.email });
    if (existingMember) {
      return res.status(409).json({
        status: 'error',
        message: 'A member with this email already exists'
      });
    }

    // Create new member from request body
    const memberData = {
      // Personal Information
      fullName: req.body.fullName,
      dateOfBirth: new Date(req.body.dateOfBirth),
      gender: req.body.gender,
      email: req.body.email,
      phoneNumber: req.body.phoneNumber,
      cityCountry: req.body.cityCountry,
      occupation: req.body.occupation,
      
      // Social Media
      socialMedia: {
        linkedin: req.body.linkedin,
        facebook: req.body.facebook,
        instagram: req.body.instagram,
        twitter: req.body.twitter,
        other: req.body.otherSocial
      },
      
      // Membership Type
      membershipType: {
        type: req.body.membershipType,
        educationalBackground: req.body.educationalBackground,
        expertise: {
          engineering: req.body.expertise?.includes('Engineering'),
          programming: req.body.expertise?.includes('Programming/Coding'),
          environmentalSciences: req.body.expertise?.includes('Environmental Sciences'),
          education: req.body.expertise?.includes('Education'),
          projectManagement: req.body.expertise?.includes('Project Management'),
          other: req.body.otherExpertise
        }
      },
      
      // Interest & Motivation
      interest: {
        inspiration: {
          robotics: req.body.inspiration?.includes('Interest in Robotics'),
          stemEducation: req.body.inspiration?.includes('Passion for STEM Education'),
          environmentalAdvocacy: req.body.inspiration?.includes('Environmental Advocacy'),
          mentoring: req.body.inspiration?.includes('Desire to Mentor Young People'),
          networking: req.body.inspiration?.includes('Networking and Professional Growth'),
          other: req.body.otherInspiration
        },
        motivation: req.body.motivation,
        previousExperience: {
          hasExperience: req.body.hasExperience === 'Yes',
          description: req.body.experienceDescription
        }
      },
      
      // Commitments
      commitments: {
        timeAvailability: req.body.timeAvailability,
        contribution: req.body.contribution,
        eventParticipation: req.body.eventParticipation === 'Yes'
      },
      
      // Additional Info
      additionalInfo: {
        referralSource: req.body.referralSource,
        comments: req.body.comments
      },
      
      // Consents
      consents: {
        informationAccuracy: req.body.informationAccuracy || false,
        rulesAgreement: req.body.rulesAgreement || false,
        dataProcessing: req.body.dataProcessing || false
      }
    };

    // Save the member
    const member = new Member(memberData);
    await member.save();

    // Return success response
    res.status(201).json({
      status: 'success',
      message: 'Member registered successfully',
      data: {
        memberId: member._id,
        email: member.email,
        status: member.status
      }
    });
  } catch (error) {
    console.error('Member registration error:', error);
    
    // Handle validation errors
    if (error.name === 'ValidationError') {
      const errors = Object.values(error.errors).map(err => err.message);
      return res.status(400).json({
        status: 'error',
        message: 'Validation error',
        errors
      });
    }
    
    res.status(500).json({
      status: 'error',
      message: 'Failed to register member',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/members
 * Get all members (admin only)
 */
router.get('/', async (req, res) => {
  try {
    // Optional filtering by status
    const { status, type, search } = req.query;
    const filter = {};
    
    if (status) {
      filter.status = status;
    }
    
    if (type) {
      filter['membershipType.type'] = type;
    }
    
    if (search) {
      filter.$or = [
        { fullName: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } }
      ];
    }
    
    // Get members with pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const members = await Member.find(filter)
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);
    
    const total = await Member.countDocuments(filter);
    const totalPages = Math.ceil(total / limit);
    
    res.json({
      status: 'success',
      data: members,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit
      }
    });
  } catch (error) {
    console.error('Error fetching members:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch members',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/members/:id
 * Get member by ID
 */
router.get('/:id', async (req, res) => {
  try {
    const member = await Member.findById(req.params.id);
    
    if (!member) {
      return res.status(404).json({
        status: 'error',
        message: 'Member not found'
      });
    }
    
    res.json({
      status: 'success',
      data: member
    });
  } catch (error) {
    console.error('Error fetching member:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to fetch member details',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * PATCH /api/members/:id/approve
 * Approve a member's application
 */
router.patch('/:id/approve', async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      { status: 'approved', updatedAt: new Date() },
      { new: true }
    );
    
    if (!member) {
      return res.status(404).json({
        status: 'error',
        message: 'Member not found'
      });
    }
    
    res.json({
      status: 'success',
      message: 'Member approved successfully',
      data: {
        memberId: member._id,
        status: member.status
      }
    });
  } catch (error) {
    console.error('Error approving member:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to approve member',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * PATCH /api/members/:id/reject
 * Reject a member's application
 */
router.patch('/:id/reject', async (req, res) => {
  try {
    const member = await Member.findByIdAndUpdate(
      req.params.id,
      {
        status: 'rejected',
        updatedAt: new Date(),
        rejectionReason: req.body.reason || 'No reason provided'
      },
      { new: true }
    );
    
    if (!member) {
      return res.status(404).json({
        status: 'error',
        message: 'Member not found'
      });
    }
    
    res.json({
      status: 'success',
      message: 'Member rejected successfully',
      data: {
        memberId: member._id,
        status: member.status
      }
    });
  } catch (error) {
    console.error('Error rejecting member:', error);
    res.status(500).json({
      status: 'error',
      message: 'Failed to reject member',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;