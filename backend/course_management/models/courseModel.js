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
    }
}, { timestamps: true });

module.exports = mongoose.model('Course', courseSchema);
