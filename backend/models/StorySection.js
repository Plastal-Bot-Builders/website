import mongoose from 'mongoose';
export const storyFields = {
 sections: { type: [new mongoose.Schema({
  type: { type: String, enum: ['text','image','quote','list'], required: true },
  heading: { type: String, maxlength: 200 }, text: { type: String, maxlength: 20000 },
  image: { type: String, maxlength: 2048, validate: { validator: v => !v || /^https?:\/\//i.test(v) || /^\/(?!\/)/.test(v), message: 'Use an HTTP(S) or site-relative image URL' } },
  alt: { type: String, maxlength: 500 }, caption: { type: String, maxlength: 1000 }
 }, { _id: false })], default: [], validate: { validator: v => v.length <= 40, message: 'Maximum 40 sections' } }
};
