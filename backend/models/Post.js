import mongoose from 'mongoose';

const PostSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    slug: { type: String, required: true, unique: true, lowercase: true, trim: true },
    content: { type: String, required: true },
    author: { type: String, default: 'Admin' },
    date: { type: Date, default: Date.now }
  },
  { timestamps: true }
);

export default mongoose.model('Post', PostSchema);