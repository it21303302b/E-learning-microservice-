const Course = require('../models/courseModel');
const mongoose = require('mongoose');

// Get single course
const getCourse = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({ error: 'Invalid course ID' });
    }

    try {
        const course = await Course.findById(id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Get all courses
const getAllCourses = async (req, res) => {
    try {
        const courses = await Course.find({}).sort({ createdAt: -1 });
        res.status(200).json(courses);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Create new course
const createCourse = async (req, res) => {
    const { course_name, course_description, course_content, course_price } = req.body;

    try {
        const course = await Course.create({ 
            course_name, 
            course_description, 
            course_content, 
            course_price
        });
        res.status(201).json(course);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};


// Delete course
const deleteCourse = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid course ID' });
    }

    try {
        const course = await Course.findByIdAndDelete(id);
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update course
const updateCourse = async (req, res) => {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).json({ error: 'Invalid course ID' });
    }

    try {
        const course = await Course.findByIdAndUpdate(id, req.body, { new: true });
        if (!course) {
            return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(course);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

module.exports = {
    getAllCourses,
    getCourse,
    createCourse, 
    deleteCourse,
    updateCourse
};
