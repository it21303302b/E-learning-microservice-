const express = require('express');
const { authenticateUser } = require('../middleware/auth');
const {
    getAllCourses,
    getCourse,
    createCourse,
    deleteCourse,
    updateCourse
} = require('../controllers/courseController');

const router = express.Router();

// GET all courses
router.get('/', getAllCourses);

// GET a single course
router.get('/:id', getCourse);

// POST a new course (with instructor role check)
router.post('/', authenticateUser, createCourse);

// DELETE a course
router.delete('/:id', authenticateUser, deleteCourse);

// UPDATE a course
router.patch('/:id', authenticateUser, updateCourse);

module.exports = router;
