import React, { useEffect, useState } from 'react'
import './CourseDetails.css'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Divider } from '../common'

const CourseDetails = () => {
  const [courses, setCourses] = useState([])
  const [editingCourseId, setEditingCourseId] = useState(null)
  const [updatedCourseName, setUpdatedCourseName] = useState('')
  const [updatedCourseDescription, setUpdatedCourseDescription] = useState('')
  const [updatedCourseLectureNotes, setUpdatedCourseLectureNotes] = useState('')
  const [updatedCoursePrice, setUpdatedCoursePrice] = useState('')

  useEffect(() => {
    const instructorId = localStorage.getItem('instructorID') // Fetch instructor ID from local storage
    axios
      .get(`http://localhost:4001/api/courses`)
      .then((res) => {
        const instructorCourses = res.data.filter((course) => course.instructor_id === instructorId)
        setCourses(instructorCourses)
      })
      .catch((err) => {
        alert(err.message)
      })
  }, [])

  const handleEdit = (courseId, courseName, courseDescription, lectureNotes, coursePrice) => {
    setEditingCourseId(courseId)
    setUpdatedCourseName(courseName)
    setUpdatedCourseDescription(courseDescription)
    setUpdatedCourseLectureNotes(lectureNotes)
    setUpdatedCoursePrice(coursePrice)
  }

  const handleUpdate = (courseId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to update this course!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        updateCourse(courseId)
      }
    })
  }

  const updateCourse = async (courseId) => {
    try {
      await axios.patch(`http://localhost:4001/api/courses/${courseId}`, {
        course_name: updatedCourseName,
        course_description: updatedCourseDescription,
        course_content: {
          lecture_notes: updatedCourseLectureNotes,
        },
        course_price: updatedCoursePrice,
      })
      // Refresh courses after update
      const instructorId = localStorage.getItem('instructorID')
      const response = await axios.get(`http://localhost:4001/api/courses`)
      const instructorCourses = response.data.filter((course) => course.instructor_id === instructorId)
      setCourses(instructorCourses)
      // Reset editing state
      setEditingCourseId(null)
      Swal.fire('Updated!', 'Your course has been updated.', 'success')
    } catch (error) {
      alert('Failed to update course. Please try again.')
      console.error(error)
    }
  }

  const handleDelete = (courseId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this course!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it',
    }).then((result) => {
      if (result.isConfirmed) {
        axios
          .delete(`http://localhost:4001/api/courses/${courseId}`)
          .then(() => {
            // Refresh courses after deletion
            const instructorId = localStorage.getItem('instructorID')
            const updatedCourses = courses.filter((course) => course._id !== courseId)
            setCourses(updatedCourses)
            Swal.fire('Deleted!', 'Your course has been deleted.', 'success')
          })
          .catch((error) => {
            alert('Failed to delete course. Please try again.')
            console.error(error)
          })
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your course is safe :)', 'error')
      }
    })
  }

  const handleCancel = () => {
    // Reset editing state
    setEditingCourseId(null)
    // Reset updated course data
    setUpdatedCourseName('')
    setUpdatedCourseDescription('')
    setUpdatedCourseLectureNotes('')
    setUpdatedCoursePrice('')
  }

  return (
    <div className="mx-24 my-5 grid md:grid-cols-2 sm:grid-cols-1 md:gap-3">
      {courses.map((course, index) => (
        <div className="rounded-xl shadow-xl border" key={index}>
          {editingCourseId === course._id ? (
            <div className="p-5 w-full">
              <p className="text-center text-lg font-semibold italic">Edit Course Details</p>
              <Divider />
              <p className="mt-3 block text-sm font-medium text-gray-900 dark:text-white">Course Name</p>
              <input
                type="text"
                value={updatedCourseName}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setUpdatedCourseName(e.target.value)}
              />

              <p className="mt-3 block text-sm font-medium text-gray-900 dark:text-white">Course Description:</p>
              <input
                type="text"
                value={updatedCourseDescription}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setUpdatedCourseDescription(e.target.value)}
              />

              <p className="mt-3 block text-sm font-medium text-gray-900 dark:text-white">Lecture Notes:</p>
              <input
                type="text"
                value={updatedCourseLectureNotes}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setUpdatedCourseLectureNotes(e.target.value)}
              />
              <p className="mt-3 block text-sm font-medium text-gray-900 dark:text-white">Course Price:</p>
              <input
                type="number"
                value={updatedCoursePrice}
                className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                onChange={(e) => setUpdatedCoursePrice(e.target.value)}
              />
              <div className="my-3 text-center">
                <button className="p-3 m-2 rounded-full bg-green-500 hover:bg-green-400 hover:shadow-md hover:shadow-green-300" onClick={() => handleUpdate(course._id)}>
                  <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                  </svg>
                </button>
                <button className="p-3 m-2 rounded-full bg-blue-400 hover:bg-blue-300 hover:shadow-md hover:shadow-blue-200" onClick={handleCancel}>
                  <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                  </svg>
                </button>
              </div>
            </div>
          ) : (
            <div className=" w-full h-72 flex rounded-xl overflow-hidden hover:bg-gray-100 duration-500">
              <div className="w-2/5 object-cover">
                <img src={course.course_img} alt="CourseImg" className="h-full w-full object-cover" />
              </div>
              <div className="w-3/5 p-5">
                <h1 className="text-xl text-blue-900 font-semibold">{course.course_name}</h1>
                <Divider />
                <p className="text-sm font-light text-justify">{course.course_description}</p>

                <p className="my-2">
                  <span className="font-thin">Lecture Notes: </span>
                  <span className="text-sm italic text-blue-900 font-medium">{course.course_content.lecture_notes}</span>
                </p>

                <p className="text-4xl font-black text-red-700">{course.course_price}LKR</p>

                <div className="flex justify-end my-1">
                  <button onClick={() => handleEdit(course._id, course.course_name, course.course_description, course.course_content.lecture_notes, course.course_price)} className="bg-blue-900 p-3 mx-2 rounded-full hover:bg-blue-800 hover:shadow-md">
                    <svg className="w-[24px] h-[24px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="m14.304 4.844 2.852 2.852M7 7H4a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h11a1 1 0 0 0 1-1v-4.5m2.409-9.91a2.017 2.017 0 0 1 0 2.853l-6.844 6.844L8 14l.713-3.565 6.844-6.844a2.015 2.015 0 0 1 2.852 0Z"
                      />
                    </svg>
                  </button>
                  <button onClick={() => handleDelete(course._id)} className="bg-red-700 p-3 mx-2 rounded-full hover:bg-red-600 hover:shadow-md">
                    <svg className="w-[24px] h-[24px] text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

export default CourseDetails
