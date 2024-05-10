const Course = require('../models/courseModel');
const mongoose = require('mongoose');
const cloudinary = require("../utils/cloudinary");
const upload = require("../utils/multer");

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

const createCourse = async (req, res) => {
    const { course_name, course_description, course_content, course_price, instructor_email, instructor_id } = req.body;

    try {
        let courseData = {
            course_name,
            course_description,
            course_content,
            course_price,
            instructor_email,
            instructor_id
        };

        if (req.files && req.files.image) {
            // Upload image file to Cloudinary if it exists
            const result = await cloudinary.uploader.upload(req.files.image[0].path);
            courseData.course_img = result.secure_url;
            courseData.cloudinary_img_id = result.public_id;
        }
        
        if (req.files['zip']) {
            // Upload zip file to Cloudinary if it exists
            const zipResult = await cloudinary.uploader.upload(req.files['zip'][0].path, { resource_type: "auto" });
            courseData.course_content.zip_url = zipResult.secure_url;
            courseData.course_content.cloudinary_zip_id = zipResult.public_id;
        }
        

        const course = await Course.create(courseData);
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
