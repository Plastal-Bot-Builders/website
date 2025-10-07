import { Router } from 'express';
import mongoose from 'mongoose';
import Post from '../models/Post.js';
import { requireAuth } from '../middleware/auth.js';

const router = Router();

/**
 * GET /api/posts
 * Retrieve all posts with pagination, filtering and sorting
 */
router.get('/', async (req, res) => {
  try {
    // Parse query parameters
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortField = req.query.sortBy || 'date';
    const sortOrder = req.query.order === 'asc' ? 1 : -1;
    const category = req.query.category;
    const search = req.query.search;

    // Build query
    const query = {};
    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: 'i' } },
        { content: { $regex: search, $options: 'i' } }
      ];
    }

    // Create sort object
    const sort = {};
    sort[sortField] = sortOrder;
    // Always include createdAt as secondary sort for consistency
    if (sortField !== 'createdAt') sort.createdAt = -1;

    // Execute query with pagination
    const skip = (page - 1) * limit;
    const posts = await Post.find(query)
      .sort(sort)
      .skip(skip)
      .limit(limit);

    // Get total count for pagination
    const total = await Post.countDocuments(query);
    const totalPages = Math.ceil(total / limit);

    res.json({
      status: 'success',
      data: posts,
      pagination: {
        total,
        totalPages,
        currentPage: page,
        limit
      }
    });
  } catch (error) {
    console.error('Error fetching posts:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to fetch posts',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * GET /api/posts/:slug
 * Retrieve a single post by its slug
 */
router.get('/:slug', async (req, res) => {
  try {
    const slug = String(req.params.slug).toLowerCase();
    const post = await Post.findOne({ slug });
    
    if (!post) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Post not found'
      });
    }
    
    res.json({
      status: 'success',
      data: post
    });
  } catch (error) {
    console.error('Error fetching post:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to fetch post',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * POST /api/posts
 * Create a new post (admin only)
 */
router.post('/', requireAuth, async (req, res) => {
  try {
    const { title, slug, content, author, category, coverImage } = req.body || {};
    
    // Validate required fields
    if (!title || !slug || !content) {
      return res.status(400).json({ 
        status: 'error',
        message: 'title, slug, and content are required fields'
      });
    }
    
    // Create post document
    const post = new Post({
      title: String(title).trim(),
      slug: String(slug).toLowerCase().trim(),
      content: String(content),
      author: author ? String(author) : undefined,
      category,
      coverImage
    });
    
    // Save to database
    const savedPost = await post.save();
    
    res.status(201).json({
      status: 'success',
      data: savedPost
    });
  } catch (error) {
    // Handle duplicate slug error
    if (error.code === 11000) {
      return res.status(409).json({ 
        status: 'error',
        message: 'A post with this slug already exists'
      });
    }
    
    console.error('Error creating post:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to create post',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * PUT /api/posts/:id
 * Update an existing post (admin only)
 */
router.put('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ 
        status: 'error',
        message: 'Invalid post ID format'
      });
    }
    
    const update = { ...req.body };
    
    // Format fields if present
    if (update.slug) update.slug = String(update.slug).toLowerCase().trim();
    if (update.title) update.title = String(update.title).trim();
    
    // Add updatedAt timestamp
    update.updatedAt = new Date();
    
    // Find and update document
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      update,
      { new: true, runValidators: true }
    );
    
    if (!updatedPost) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Post not found'
      });
    }
    
    res.json({
      status: 'success',
      data: updatedPost
    });
  } catch (error) {
    // Handle duplicate slug error
    if (error.code === 11000) {
      return res.status(409).json({ 
        status: 'error',
        message: 'A post with this slug already exists'
      });
    }
    
    console.error('Error updating post:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to update post',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

/**
 * DELETE /api/posts/:id
 * Delete a post (admin only)
 */
router.delete('/:id', requireAuth, async (req, res) => {
  try {
    const { id } = req.params;
    
    // Validate ObjectId
    if (!mongoose.isValidObjectId(id)) {
      return res.status(400).json({ 
        status: 'error',
        message: 'Invalid post ID format'
      });
    }
    
    const deletedPost = await Post.findByIdAndDelete(id);
    
    if (!deletedPost) {
      return res.status(404).json({ 
        status: 'error',
        message: 'Post not found'
      });
    }
    
    res.json({
      status: 'success',
      message: 'Post deleted successfully',
      data: { id }
    });
  } catch (error) {
    console.error('Error deleting post:', error);
    res.status(500).json({ 
      status: 'error',
      message: 'Failed to delete post',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
});

export default router;