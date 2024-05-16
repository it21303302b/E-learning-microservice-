import React, { useEffect, useState } from 'react'
import './ItemDetails.css'
import { useDispatch, useSelector } from 'react-redux'
import { addItem } from '../../store/cartSlice'
import axios from 'axios'
import { Button, Divider } from '../common'

const ItemDetails = () => {
  const [courses, setCourses] = useState([])
  const [purchasedCourses, setPurchasedCourses] = useState([])
  const cartItems = useSelector((state) => state.cart.items) // Retrieve cart items from Redux store
  const dispatch = useDispatch()

  useEffect(() => {
    axios
      .get('http://localhost:4001/api/courses')
      .then((res) => {
        setCourses(res.data.map((course) => ({ ...course, addedToCart: false }))) // Initialize addedToCart to false for each course
      })
      .catch((err) => {
        alert(err.message)
      })

    axios
      .get(`http://localhost:8003/api/payments/user/${localStorage.getItem('userId')}/payments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => {
        const payments = res.data.data || []
        const purchasedCourses = payments.flatMap((payment) => payment.courseIds)
        setPurchasedCourses(purchasedCourses)
      })
      .catch((err) => {
        console.error('Error fetching purchased courses:', err)
      })
  }, [])

  const handleAddToCart = (course) => {
    dispatch(addItem(course))
  }

  const isAddedToCart = (course) => {
    return cartItems.some((item) => item._id === course._id)
  }

  const isAlreadyPurchased = (course) => {
    return purchasedCourses.includes(course._id)
  }

  return (
    <div>
      <div className="grid md:grid-cols-2 lg:grid-cols-2 sm:grid-cols-1 px-10 mb-10">
        {courses.map((course, index) => (
          <div className="md:w-full h-56 flex overflow-hidden border shadow-lg rounded-xl bg-white hover:bg-gray-100 hover:shadow-lg hover:shadow-blue-700" key={index}>
            <div className="md:w-2/5 object-cover">
              <img className="h-full w-full object-cover" src={course.course_img} alt={course.course_name} />
            </div>
            <div className="md:w-3/5 p-5">
              <h2 className="w-full font-semibold text-lg text-blue-900">{course.course_name}</h2>
              <Divider />
              <p className="text-blue-900 italic text-sm">{course.course_description}</p>
              <p className="font-bold text-3xl text-center tracking-tighter text-red-700">{course.course_price} LKR</p>
              <div>
                {isAlreadyPurchased(course) ? (
                  <Button className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full" disabled>
                    <svg className="mr-2 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                      <path fillRule="evenodd" d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z" clipRule="evenodd" />
                    </svg>
                    Already Purchased
                  </Button>
                ) : (
                  <Button
                    onClick={() => handleAddToCart(course)}
                    className={`text-white ${
                      isAddedToCart(course) ? 'bg-gray-400' : 'bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'
                    } font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full`}
                    disabled={isAddedToCart(course)}
                  >
                    <svg className="mr-2 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="white" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                    </svg>
                    {isAddedToCart(course) ? 'Added to Cart' : 'Add to Cart'}
                  </Button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ItemDetails
