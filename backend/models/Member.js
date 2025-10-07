import mongoose from 'mongoose';

const memberSchema = new mongoose.Schema({
  // Personal Information
  fullName: { 
    type: String, 
    required: [true, 'Full name is required'] 
  },
  dateOfBirth: { 
    type: Date, 
    required: [true, 'Date of birth is required'] 
  },
  gender: { 
    type: String, 
    enum: ['Male', 'Female', 'Prefer not to say'],
    required: [true, 'Gender is required'] 
  },
  email: { 
    type: String, 
    required: [true, 'Email address is required'], 
    unique: true,
    trim: true,
    lowercase: true,
    match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please provide a valid email address']
  },
  phoneNumber: { 
    type: String, 
    required: [true, 'Phone number is required'] 
  },
  cityCountry: { 
    type: String, 
    required: [true, 'City and country are required'] 
  },
  occupation: { 
    type: String, 
    required: [true, 'Occupation is required'] 
  },
  
  // Social Media Links (Optional)
  socialMedia: {
    linkedin: { type: String },
    facebook: { type: String },
    instagram: { type: String },
    twitter: { type: String },
    other: { type: String }
  },
  
  // Membership Type
  membershipType: {
    type: { 
      type: String, 
      enum: ['Student', 'Professional', 'Mentor/Volunteer', 'Partner/Supporter'],
      required: [true, 'Membership type is required']
    },
    educationalBackground: { type: String },
    expertise: {
      engineering: { type: Boolean, default: false },
      programming: { type: Boolean, default: false },
      environmentalSciences: { type: Boolean, default: false },
      education: { type: Boolean, default: false },
      projectManagement: { type: Boolean, default: false },
      other: { type: String }
    }
  },
  
  // Interest & Motivation
  interest: {
    inspiration: {
      robotics: { type: Boolean, default: false },
      stemEducation: { type: Boolean, default: false },
      environmentalAdvocacy: { type: Boolean, default: false },
      mentoring: { type: Boolean, default: false },
      networking: { type: Boolean, default: false },
      other: { type: String }
    },
    motivation: { type: String },
    previousExperience: {
      hasExperience: { type: Boolean, default: false },
      description: { type: String }
    }
  },
  
  // Membership Commitments
  commitments: {
    timeAvailability: { 
      type: String, 
      enum: ['1-2 hours', '3-5 hours', '5-10 hours', '10+ hours'] 
    },
    contribution: { type: String },
    eventParticipation: { type: Boolean, default: false }
  },
  
  // Additional Information
  additionalInfo: {
    referralSource: { 
      type: String, 
      enum: ['Website', 'Social Media', 'Friend/Colleague', 'Event/Workshop', 'Other'] 
    },
    comments: { type: String }
  },
  
  // Consents
  consents: {
    informationAccuracy: { type: Boolean, default: false },
    rulesAgreement: { type: Boolean, default: false },
    dataProcessing: { type: Boolean, default: false }
  },
  
  // Application Status
  status: { 
    type: String, 
    enum: ['pending', 'approved', 'rejected'],
    default: 'pending' 
  },
  
  // Timestamps
  createdAt: { 
    type: Date, 
    default: Date.now 
  },
  updatedAt: { 
    type: Date,
    default: Date.now
  }
});

// Add pre-save hook to update 'updatedAt' field
memberSchema.pre('save', function(next) {
  this.updatedAt = new Date();
  next();
});

// Add index for efficient querying
memberSchema.index({ email: 1 });
memberSchema.index({ status: 1 });
memberSchema.index({ 'membershipType.type': 1 });

export default mongoose.model('Member', memberSchema);