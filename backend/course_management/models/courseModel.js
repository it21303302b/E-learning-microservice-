const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const courseSchema = new Schema({
    course_name: {
        type: String,
        required: true
    },
    course_description: {
        type: String,
        required: true
    },
    course_content: {
        lecture_notes: {
            type: String,
            required: true
        },
        zip_url: {
            type: String, // Save the Cloudinary URL for the zip file
            required: true
        },
        cloudinary_zip_id: {
            type: String, // Save the public ID for the zip file on Cloudinary
            required: true
        }
    },
    course_price: {
        type: Number,
        required: true
    },
    instructor_email: {
        type: String,
        required: true
    },
    instructor_id: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    course_img: {
        type: String,  // Save the Cloudinary URL for the image file
        required: false
    },
    cloudinary_img_id: {
        type: String,  // Save the public ID for the image file on Cloudinary
        required: false
    },
    status: {
        type: String,
        enum: ['pending', 'accept', 'decline'],
        default: 'pending'
    }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
