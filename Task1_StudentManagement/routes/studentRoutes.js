const express = require('express');
const router = express.Router();
const {
  createStudent,
  getAllStudents,
  searchStudents,
  getStudentById,
  updateStudent,
  patchStudent,
  deleteStudent,
  deactivateStudent,
} = require('../controllers/studentController');

// Search route must come before :id routes
router.get('/search', searchStudents);

// Main CRUD routes
router.route('/').get(getAllStudents).post(createStudent);

// Individual student routes
router
  .route('/:id')
  .get(getStudentById)
  .put(updateStudent)
  .patch(patchStudent)
  .delete(deleteStudent);

// Special route for deactivation (soft delete)
router.patch('/:id/deactivate', deactivateStudent);

module.exports = router;
