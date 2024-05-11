import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import './CourseForm.css'

const CourseForm = () => {
  const [courseName, setCourseName] = useState('')
  const [courseDescription, setCourseDescription] = useState('')
  const [lectureNotes, setLectureNotes] = useState('')
  const [coursePrice, setCoursePrice] = useState('')
  const [instructorEmail, setInstructorEmail] = useState('')
  const [zipFile, setZipFile] = useState(null) // State for zip file
  const [imageFile, setImageFile] = useState(null) // State for image file
  const [error, setError] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    // Validation checks
    if (!courseName || !courseDescription || !lectureNotes || !coursePrice || !instructorEmail || !zipFile || !imageFile) {
      Swal.fire({
        title: 'Validation Error',
        text: 'Please fill in all fields and upload both the zip file and image.',
        icon: 'error',
      })
      return
    }

    const instructorId = localStorage.getItem('instructorID')

    const formData = new FormData()
    formData.append('course_name', courseName)
    formData.append('course_description', courseDescription)
    formData.append('course_content[lecture_notes]', lectureNotes)
    formData.append('course_price', coursePrice)
    formData.append('instructor_email', instructorEmail)
    formData.append('instructor_id', instructorId)
    formData.append('zip', zipFile) // Append zip file to form data
    formData.append('image', imageFile) // Append image file to form data

    try {
      await axios.post('http://localhost:4001/api/courses', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      await Swal.fire({
        title: 'Success!',
        text: 'Course successfully added.',
        icon: 'success',
      })
      window.location.href = '/instructorDash'
    } catch (err) {
      console.error(err)
      Swal.fire({
        title: 'Error',
        text: 'Course not added. Please try again later.',
        icon: 'error',
      })
    }
  }

  return (
    <div>
      <Link to="/instructorDash">Back to Instructor Dashboard</Link>
      <form className="create" onSubmit={handleSubmit}>
        <h3>Add a New Course</h3>

        <label>Course Name:</label>
        <input type="text" onChange={(e) => setCourseName(e.target.value)} value={courseName} required />

        <label>Course Description:</label>
        <input type="text" onChange={(e) => setCourseDescription(e.target.value)} value={courseDescription} required />

        <label>Lecture Notes:</label>
        <input type="text" onChange={(e) => setLectureNotes(e.target.value)} value={lectureNotes} required />

        <label>Course Price:</label>
        <input type="number" min="0" step="0.01" onChange={(e) => setCoursePrice(e.target.value)} value={coursePrice} required />

        <label>Instructor Email:</label>
        <input type="email" onChange={(e) => setInstructorEmail(e.target.value)} value={instructorEmail} required />

        <label>Upload Zip File with course videos and pdfs(Mandatory):</label>
        <input type="file" accept=".zip" onChange={(e) => setZipFile(e.target.files[0])} required />

        <label>Upload Course Picture:</label>
        <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} required />

        <button type="submit">Add Course</button>

        {error && <div className="error">{error}</div>}
      </form>
    </div>
  )
}

export default CourseForm
