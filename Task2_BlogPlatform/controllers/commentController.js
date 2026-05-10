const Comment = require('../models/Comment');

// @desc    Add a comment to a post
// @route   POST /api/posts/:postId/comments
// @access  Public
exports.addComment = async (req, res) => {
  try {
    const { text, user } = req.body;

    // Validate required fields
    if (!text || !user) {
      return res.status(400).json({
        success: false,
        error: 'Please provide text and user',
      });
    }

    const comment = await Comment.create({
      text,
      post: req.params.postId,
      user,
    });

    // Populate user info before returning
    await comment.populate('user', 'username email');

    res.status(201).json({
      success: true,
      message: 'Comment added successfully',
      data: comment,
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
        error: 'Invalid post or user ID format',
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};

// @desc    Get all comments for a specific post
// @route   GET /api/posts/:postId/comments
// @access  Public
exports.getCommentsByPost = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (pageNum < 1 || limitNum < 1) {
      return res.status(400).json({
        success: false,
        error: 'Page and limit must be positive integers',
      });
    }

    const skip = (pageNum - 1) * limitNum;

    const comments = await Comment.find({ post: req.params.postId })
      .populate('user', 'username email')
      .skip(skip)
      .limit(limitNum)
      .sort({ createdAt: -1 });

    const total = await Comment.countDocuments({ post: req.params.postId });

    res.status(200).json({
      success: true,
      count: comments.length,
      total,
      page: pageNum,
      pages: Math.ceil(total / limitNum),
      data: comments,
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(400).json({
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

// @desc    Delete a comment by ID
// @route   DELETE /api/comments/:id
// @access  Public
exports.deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findByIdAndDelete(req.params.id);

    if (!comment) {
      return res.status(404).json({
        success: false,
        error: 'Comment not found',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Comment deleted successfully',
      data: {},
    });
  } catch (error) {
    if (error.kind === 'ObjectId') {
      return res.status(404).json({
        success: false,
        error: 'Invalid comment ID format',
      });
    }
    res.status(500).json({
      success: false,
      error: 'Server Error',
    });
  }
};
