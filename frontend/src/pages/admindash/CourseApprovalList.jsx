import React, { useState, useEffect } from 'react'
import axios from 'axios'
import NavbarAdmin from '../../components/layout/header/NavbarAdmin'

const CourseApprovalList = () => {
  const [pendingCourses, setPendingCourses] = useState([])

  useEffect(() => {
    const fetchPendingCourses = async () => {
      try {
        const response = await axios.get('http://localhost:4001/api/courses/admin/pending') // Fetch pending courses
        setPendingCourses(response.data)
      } catch (error) {
        console.error('Error fetching pending courses:', error)
      }
    }

    fetchPendingCourses()
  }, [])

  const handleUpdateStatus = async (id, newStatus) => {
    try {
      await axios.patch(`http://localhost:4001/api/courses/${id}/status`, { status: newStatus })
      // Update the local state to reflect the change
      setPendingCourses((prevCourses) => prevCourses.map((course) => (course._id === id ? { ...course, status: newStatus } : course)))
    } catch (error) {
      console.error(`Error updating status of course ${id}:`, error)
    }
  }

  return (
    <div>
      <NavbarAdmin />
      <div className="text-center text-3xl font-bold p-8 shadow-md my-5 glass md:w-2/3 lg:w-2/3 rounded-lg text-white bg-blue-900 mx-auto">
        <h1>Pending Courses</h1>
      </div>
      <div className="border shadow-md w-2/3 mx-auto rounded-lg">
        <div className="rounded-lg">
          {pendingCourses.map((course) => (
            <div key={course._id} className="flex h-36">
              <div className="rounded-lg">
                <img src={course.course_img} alt="course" className="w-full h-full object-cover rounded-l-lg" />
              </div>
              <div className="w-2/4 p-5">
                <h2 className="text-blue-900 text-center text-lg">{course.course_name}</h2>
                <p className="text-blue-900 text-center italic">{course.course_description}</p>
                <p className="text-center py-5">
                  Status: <span className="uppercase text-red-700 text-xl font-black">{course.status}</span>
                </p>
              </div>
              <div className="content-evenly">
                <button onClick={() => handleUpdateStatus(course._id, 'accept')} className="p-3 m-2 rounded-full bg-green-500 hover:shadow-md hover:shadow-green-400 hover:bg-green-400">
                  <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 11.917 9.724 16.5 19 7.5" />
                  </svg>
                </button>
                <button onClick={() => handleUpdateStatus(course._id, 'decline')} className="p-3 m-2 rounded-full bg-red-600 hover:shadow-md hover:shadow-red-500 hover:bg-red-500">
                  <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18 17.94 6M18 18 6.06 6" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default CourseApprovalList
