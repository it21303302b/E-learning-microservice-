const express = require('express');
const {
    getAllCourses,
    getCourse,
    createCourse,
    deleteCourse,
    updateCourse
} = require('../controllers/courseController');
const upload = require("../utils/multer");

const router = express.Router();

// GET all courses
router.get('/', getAllCourses);

// GET a single course
router.get('/:id', getCourse);

// POST a new course with zip file and image upload
router.post('/', upload.fields([{ name: "zip", maxCount: 1 }, { name: "image", maxCount: 1 }]), createCourse);

// DELETE a course
router.delete('/:id', deleteCourse);

// UPDATE a course
router.patch('/:id', updateCourse);

module.exports = router;
