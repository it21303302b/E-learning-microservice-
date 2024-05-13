import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { removeItem } from '../../store/cartSlice'
import navigate from 'navigate'
import { Divider } from '../common'

const CartCard = () => {
  const dispatch = useDispatch()
  const cartItems = useSelector((state) => state.cart.items)

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id))
  }

  const handleClick = () => {
    if (cartItems.length > 0) {
      // Save course IDs and total price to local storage
      const courseIDs = cartItems.map((item) => item._id)
      const total = cartItems.reduce((acc, item) => acc + item.course_price * item.quantity, 0)
      localStorage.setItem('courseIDs', JSON.stringify(courseIDs))
      localStorage.setItem('totalPrice', total)

      // Navigate to payments page
      navigate('/payment')

      // Automatically refresh the page after a short delay (e.g., 500 milliseconds)
      setTimeout(() => {
        window.location.reload()
      }, 500)
    } else {
      alert('Cart is empty')
    }

    // Clear cart items from local storage when user clicks "OK"
    localStorage.removeItem('myCart');
  }

  // Calculate subtotal
  const subtotal = cartItems.reduce((acc, item) => acc + item.course_price * item.quantity, 0)

  return (
    <div className="h-screen form-bg-img p-10">
      <div className="bg-blue-900 py-10 mx-10 text-white text-4xl font-black text-center rounded-xl ">
        <h1>My Cart</h1>
      </div>
      <div className=" m-10 justify-center px-6 md:flex md:space-x-6 xl:px-0">
        {/* Cart Items */}
        <div className="rounded-lg md:w-2/3">
          {cartItems.map((item) => (
            <div key={item._id} className="justify-between mb-6 rounded-lg bg-white shadow-md hover:shadow-md hover:shadow-blue-500 sm:flex sm:justify-start border-2">
              <div className="flex overflow-hidden w-full">
                <div className="w-2/6 h-52">
                  <img src={item.course_img} alt="product-img" className="w-full h-full object-cover border-r" />
                </div>
                <div className="w-3/6 py-10 px-5">
                  <h2 className="text-xl font-bold text-blue-900">{item.course_name}</h2>

                  <p className="text-2xl font-black text-red-700 py-5">{item.course_price}LKR</p>
                </div>
                <div className="w-1/6 content-evenly text-center">
                  <button onClick={() => handleRemoveItem(item._id)} className="p-3 rounded-full bg-red-600 hover:shadow-md hover:shadow-red-600">
                    <svg className="w-6 h-6 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 7h14m-9 3v8m4-8v8M10 3h4a1 1 0 0 1 1 1v3H9V4a1 1 0 0 1 1-1ZM6 7h12v13a1 1 0 0 1-1 1H7a1 1 0 0 1-1-1V7Z" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sub total */}
        <div className="mt-6 h-full rounded-lg border bg-gray-800 p-6 text-white shadow-md md:mt-0 md:w-1/3 text-center">
          <div>
            <p className="text-2xl font-bold">Total</p>
          </div>
          <Divider />
          <div className="my-10 text-4xl">
            <p className="font-bold">{subtotal} LKR</p>
          </div>
          <button
            onClick={handleClick}
            data-toggle="modal"
            data-target="#staticBackdrop"
            className="w-full text-gray-900 bg-gradient-to-r from-teal-200 to-lime-200 hover:bg-gradient-to-l hover:from-teal-200 hover:to-lime-200 focus:ring-4 focus:outline-none focus:ring-lime-200 dark:focus:ring-teal-700 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
          >
            Check out
          </button>
        </div>
      </div>
    </div>
  )
}

export default CartCard
