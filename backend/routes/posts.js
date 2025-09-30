import { Router } from 'express';
import mongoose from 'mongoose';
import Post from '../models/Post.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

// GET /api/posts → all posts, newest first
router.get('/', async (_req, res) => {
  try {
    const posts = await Post.find().sort({ date: -1, createdAt: -1 });
    res.json(posts);
  } catch {
    res.status(500).json({ error: 'Failed to fetch posts' });
  }
});

// GET /api/posts/:slug → single post by slug
router.get('/:slug', async (req, res) => {
  try {
    const post = await Post.findOne({ slug: String(req.params.slug).toLowerCase() });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch {
    res.status(500).json({ error: 'Failed to fetch post' });
  }
});

// POST /api/posts → create (admin)
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, slug, content, author, coverImage, authorAvatar } = req.body || {};
    if (!title || !slug || !content) {
      return res.status(400).json({ error: 'title, slug, and content are required' });
    }
    const doc = await Post.create({
      title: String(title).trim(),
      slug: String(slug).toLowerCase().trim(),
      content: String(content),
      author: author ? String(author) : undefined,
      coverImage: coverImage ? String(coverImage) : '',
      authorAvatar: authorAvatar ? String(authorAvatar) : ''
    });
    res.status(201).json(doc);
  } catch (e) {
    if (e?.code === 11000) return res.status(409).json({ error: 'Slug already exists' });
    res.status(500).json({ error: 'Failed to create post' });
  }
});

// PUT /api/posts/:id → update (admin)
router.put('/:id', requireAuth, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    const update = { ...req.body };
    if (update.slug) update.slug = String(update.slug).toLowerCase().trim();
    if (update.title) update.title = String(update.title).trim();
    ['coverImage', 'authorAvatar'].forEach(k => {
      if (update[k] != null) update[k] = String(update[k]);
    });
    const doc = await Post.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!doc) return res.status(404).json({ error: 'Post not found' });
    res.json(doc);
  } catch (e) {
    if (e?.code === 11000) return res.status(409).json({ error: 'Slug already exists' });
    res.status(500).json({ error: 'Failed to update post' });
  }
});

// DELETE /api/posts/:id → delete (admin)
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) {
      return res.status(400).json({ error: 'Invalid id' });
    }
    const doc = await Post.findByIdAndDelete(req.params.id);
    if (!doc) return res.status(404).json({ error: 'Post not found' });
    res.json({ ok: true });
  } catch {
    res.status(500).json({ error: 'Failed to delete post' });
  }
});

export default router;