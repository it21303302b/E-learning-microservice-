import React, { useState, useEffect } from 'react'
import axios from 'axios'

const PurchasedCourses = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [errorMessage, setErrorMessage] = useState('')
  const userId = localStorage.getItem('userId') // Get user ID from local storage

  useEffect(() => {
    const fetchUserPayments = async () => {
      try {
        const response = await axios.get(`http://localhost:8003/api/payments/user/${userId}/payments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        })

        console.log('Payments:', response.data.data)

        const payments = response?.data?.data || []

        if (payments.length === 0) {
          setErrorMessage('No purchased courses found.')
          setLoading(false)
          return
        }

        const courses = []
        for (const payment of payments) {
          for (const courseId of payment.courseIds) {
            const courseResponse = await axios.get(`http://localhost:4001/api/courses/${courseId}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            })
            courses.push(courseResponse?.data)
          }
        }

        const updatedPayments = payments.map((payment, index) => {
          return {
            ...payment,
            courses: courses.filter((course) => course && course._id && payment.courseIds.includes(course._id)),
          }
        })

        console.log('Updated Payments:', updatedPayments)

        setPurchasedCourses(updatedPayments)
        setLoading(false)
      } catch (error) {
        console.error('Error fetching user payments:', error)
        setErrorMessage('No payments found for this user')
        setLoading(false)
      }
    }

    fetchUserPayments()
  }, [userId])

  const handleDownload = (zipUrl) => {
    try {
      console.log('Zip URL:', zipUrl)
      window.open(zipUrl, '_blank') // Open the link in a new tab/window
    } catch (error) {
      console.error('Error opening zip file:', error)
    }
  }

  if (loading) {
    return <div>Loading...</div>
  }

  return (
    <div className="my-5">
      <div className="bg-blue-900 py-10 mx-10 text-white text-4xl font-black text-center rounded-xl ">
        <h1>Purchased Courses</h1>
      </div>
      {errorMessage ? (
        <div>{errorMessage}</div>
      ) : (
        <div className="m-10 p-10 rounded-lg">
          {purchasedCourses.map(({ _id, cardHolderName, courses }) => (
            <div key={_id} className="rounded-2xl">
              {courses.map((course) => (
                <div key={course?._id} className="mb-3 flex md:w-full md:h-52 rounded-2xl shadow-lg border overflow-hidden">
                  <img src={course?.course_img} alt={course?.course_name} className="md:w-1/5 object-cover rounded-l-2xl border-r shadow-lg shadow-blue-400 " />
                  <div className="md:w-3/5 p-5">
                    <h4 className="text-center text-blue-900 font-semibold">{course?.course_name}</h4>
                    <p className="text-center text-blue-900 font-light italic">{course?.course_description}</p>
                    <p className="text-center text-xl font-black text-red-700">{course?.course_price}LKR</p>
                    <p className="py-2 text-gray-900">
                      Instructor Email: <span className="text-blue-900 font-light italic hover:underline hover:cursor-pointer">{course?.instructor_email}</span>
                    </p>
                  </div>
                  <div className="md:w-1/5 content-evenly">
                    {/* Check if course_content exists before accessing zip_url */}
                    {course?.course_content && (
                      <button onClick={() => handleDownload(course?.course_content?.zip_url)} className="p-3 rounded-full bg-green-500 justify-center hover:bg-blue-400 hover:shadow hover:shadow-blue-600">
                        <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 13V4M7 14H5a1 1 0 0 0-1 1v4a1 1 0 0 0 1 1h14a1 1 0 0 0 1-1v-4a1 1 0 0 0-1-1h-2m-1-5-4 5-4-5m9 8h.01" />
                        </svg>
                      </button>
                    )}
                    
                  </div>
                </div>
              ))}
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default PurchasedCourses
