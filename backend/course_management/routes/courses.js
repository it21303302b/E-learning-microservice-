const express = require('express');
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

// POST a new course (without authentication)
router.post('/', createCourse);

// DELETE a course (without authentication)
router.delete('/:id', deleteCourse);

// UPDATE a course (without authentication)
router.patch('/:id', updateCourse);

module.exports = router;
