const express = require('express');
const router = express.Router();
const {
  createPost,
  getAllPosts,
  getPostById,
  updatePost,
  deletePost,
} = require('../controllers/postController');
const {
  addComment,
  getCommentsByPost,
} = require('../controllers/commentController');

// Post CRUD routes
router.route('/').get(getAllPosts).post(createPost);

router
  .route('/:id')
  .get(getPostById)
  .put(updatePost)
  .delete(deletePost);

// Comment routes nested under posts
router
  .route('/:postId/comments')
  .get(getCommentsByPost)
  .post(addComment);

module.exports = router;
