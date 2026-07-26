import mongoose from 'mongoose';
import slugify from 'slugify';

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Event title is required'],
    trim: true
  },
  slug: {
    type: String,
    unique: true,
    lowercase: true
  },
  description: {
    type: String,
    required: [true, 'Event description is required']
  },
  date: {
    type: Date,
    required: [true, 'Event date is required']
  },
  location: {
    type: String,
    required: [true, 'Event location is required']
  },
  image: {
    type: String
  },
  capacity: {
    type: Number
  },
  registrations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Registration'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Generate slug before saving
eventSchema.pre('save', function(next) {
  if (!this.slug || this.isModified('title')) {
    this.slug = slugify(this.title, { lower: true });
  }
  next();
});

const Event = mongoose.model('Event', eventSchema);

export default Event;