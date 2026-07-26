import mongoose from 'mongoose';

const postSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    trim: true
  },
  slug: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  content: {
    type: String,
    required: true
  },
  // New SEO fields
  description: {
    type: String,
    trim: true,
    maxlength: 160
  },
  keywords: [String],
  thumbnail: {
    type: String,
    trim: true
  },
  author: {
    type: String,
    default: 'Admin'
  },
  published: {
    type: Boolean,
    default: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: true
});

export default mongoose.model('Post', postSchema);