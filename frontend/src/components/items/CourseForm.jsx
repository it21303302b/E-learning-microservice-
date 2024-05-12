import React, { useState } from 'react'
import axios from 'axios'
import Swal from 'sweetalert2'
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
    <div className="form-bg-img h-screen">
      <div className="flex justify-center ">
        <div className="text-center text-3xl font-bold p-8 shadow-md glass md:w-2/3 lg:w-2/3 rounded-lg text-white bg-blue-900 mt-5">
          <h1>Add a New Course</h1>
        </div>
      </div>

      <div className="flex justify-center">
        <div className="bg-white md:w-2/3 lg:w-2/3 m-5 h-fit rounded-lg">
          <form onSubmit={handleSubmit}>
            <div className="grid md:grid-cols-2 sm:grid-cols-1 p-5">
              <div className="lg:border-r md:border-r sm:border-none p-5">
                <div className="mb-2">
                  <label htmlFor="cName" className="block text-sm font-medium text-gray-900 dark:text-white">
                    Course Name:
                  </label>
                  <input
                    id="cName"
                    type="text"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setCourseName(e.target.value)}
                    value={courseName}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="cDescription" className="block text-sm font-medium text-gray-900 dark:text-white">
                    Course Description:
                  </label>
                  <input
                    id="cDescription"
                    type="text"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setCourseDescription(e.target.value)}
                    value={courseDescription}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="cNotes" className="block text-sm font-medium text-gray-900 dark:text-white">
                    Lecture Notes:
                  </label>
                  <input
                    id="cNotes"
                    type="text"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setLectureNotes(e.target.value)}
                    value={lectureNotes}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="cPrice" className="block text-sm font-medium text-gray-900 dark:text-white">
                    Course Price:
                  </label>
                  <input
                    id="cPrice"
                    type="number"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    min="0"
                    step="0.01"
                    onChange={(e) => setCoursePrice(e.target.value)}
                    value={coursePrice}
                    required
                  />
                </div>
                <div className="mb-2">
                  <label htmlFor="cEmail" className="block text-sm font-medium text-gray-900 dark:text-white">
                    Instructor Email:
                  </label>
                  <input
                    id="cEmail"
                    type="email"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setInstructorEmail(e.target.value)}
                    value={instructorEmail}
                    required
                  />
                </div>
              </div>
              <div className="py-5">
                <div className="mb-5">
                  <label htmlFor="zipInput">Upload Zip File with Course Videos and PDFs *</label>
                  <input
                    id="zipInput"
                    type="file"
                    accept=".zip"
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
                    aria-describedby="file_input_help"
                    onChange={(e) => setZipFile(e.target.files[0])}
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Only .zip or .rar</p>
                </div>
                <div className="mb-5">
                  <label htmlFor="cImgInput">Upload Course Picture:</label>
                  <input
                    id="cImgInput"
                    type="file"
                    className='class="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-100 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400'
                    aria-describedby="file_input_help"
                    accept="image/*"
                    onChange={(e) => setImageFile(e.target.files[0])}
                    required
                  />
                  <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">Only .jpg .jpeg or .png</p>
                </div>
                <div className="flex justify-center mt-5">
                  <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                    Add Course
                  </button>
                </div>
              </div>
            </div>

            {error && <div className="error">{error}</div>}
          </form>
        </div>
      </div>
    </div>
  )
}

export default CourseForm
