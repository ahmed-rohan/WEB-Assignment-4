const Post = require('../models/Post');
const Comment = require('../models/Comment');

// @desc    Create a new post
// @route   POST /api/posts
// @access  Public
exports.createPost = async (req, res) => {
  try {
    const { title, content, author, tags } = req.body;

    // Validate required fields
    if (!title || !content || !author) {
      return res.status(400).json({
        success: false,
        error: 'Please provide title, content, and author',
      });
    }

    const post = await Post.create({
      title,
      content,
      author,
      tags: tags || [],
    });

    // Populate author details before returning
    await post.populate('author', 'username email');

    res.status(201).json({
      success: true,
      message: 'Post created successfully',
      data: post,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    }
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
        success: false,
        error: 'Invalid author ID format',
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Get all posts with author details
// @route   GET /api/posts
// @access  Public
exports.getAllPosts = async (req, res) => {
  try {
    const { tag, page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (pageNum < 1 || limitNum < 1) {
      return res.status(400).json({
        success: false,
        error: 'Page and limit must be positive integers',
      });
    }

    const skip = (pageNum - 1) * limitNum;

    const filter = {};
    if (tag) {
      filter.tags = tag.toLowerCase();
    }

    const posts = await Post.find(filter)
      .populate('author', 'username email')
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const total = await Post.countDocuments(filter);

    res.status(200).json({
      success: true,
      count: posts.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: posts,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Get a single post by ID
// @route   GET /api/posts/:id
// @access  Public
exports.getPostById = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id).populate(
      'author',
      'username email'
    );

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      data: post,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Invalid post ID format',
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Update a post
// @route   PUT /api/posts/:id
// @access  Public
exports.updatePost = async (req, res) => {
  try {
    const { title, content, tags } = req.body;

    const post = await Post.findByIdAndUpdate(
      req.params.id,
      { title, content, tags },
      {
        new: true,
        runValidators: true,
      }
    ).populate('author', 'username email');

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post updated successfully',
      data: post,
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      const messages = Object.values(error.errors).map((err) => err.message);
      return res.status(400).json({
        success: false,
        error: messages,
      });
    }
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Invalid post ID format',
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Delete a post and cascade delete all comments
// @route   DELETE /api/posts/:id
// @access  Public
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    if (!post) {
      return res.status(404).json({
        success: false,
        error: 'Post not found',
      });
    }

    // Cascade delete: remove all comments associated with this post
    await Comment.deleteMany({ post: req.params.id });

    // Delete the post
    await Post.findByIdAndDelete(req.params.id);

    res.status(200).json({
      success: true,
      message: 'Post and associated comments deleted successfully',
      data: {},
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Invalid post ID format',
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
