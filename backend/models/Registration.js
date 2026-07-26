import mongoose from 'mongoose';

const registrationSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: [true, 'Full name is required'],
    trim: true
  },
  email: {
    type: String,
    required: [true, 'Email is required'],
    trim: true,
    lowercase: true
  },
  phone: {
    type: String,
    trim: true
  },
  institution: {
    type: String,
    trim: true
  },
  event: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Event',
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Create a compound index to prevent duplicate registrations
registrationSchema.index({ email: 1, event: 1 }, { unique: true });

const Registration = mongoose.model('Registration', registrationSchema);

export default Registration;