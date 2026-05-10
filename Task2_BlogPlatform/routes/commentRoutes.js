const express = require('express');
const router = express.Router();
const { deleteComment } = require('../controllers/commentController');

// Delete comment by ID
router.delete('/:id', deleteComment);

module.exports = router;
