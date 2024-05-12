import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom' // Import useNavigate
import './payment.css'

function Payment() {
  const navigate = useNavigate() // Get navigate function

  const current = new Date()

  const [data, setData] = useState([])
  const totalPrice = JSON.parse(localStorage.getItem('totalPrice')) || 0

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('myCart')) || []
    setData(cartData)
  }, [])

  const handleCheckout = (event) => {
    event.preventDefault()

    // Get form data
    const cardHolderEmail = document.getElementById('chEmail').value
    const cardHolderName = document.getElementById('cdName').value
    const cardNumber = document.getElementById('cdNumber').value
    const expiryDate = document.getElementById('exDate').value
    const cvv = document.getElementById('cvv').value

    // Get data from local storage
    const userId = localStorage.getItem('userId')
    const courseIds = JSON.parse(localStorage.getItem('courseIDs')) // Retrieve courseIds from local storage

    // Create payment object
    const newPayment = {
      cardHolderEmail,
      cardHolderName,
      cardNumber,
      expiryDate,
      cvv,
      courseIds,
      userId,
      totalAmount: totalPrice,
    }

    // Send payment data to the backend
    axios
      .post('http://localhost:8003/api/payments/add', newPayment)
      .then(() => {
        alert('Payment Successful')
        console.log(newPayment)

        // Clear cart items from local storage after successful payment
        localStorage.removeItem('myCart')
        localStorage.removeItem('courseIDs')
        localStorage.removeItem('totalPrice')

        // Redirect to course payment page after successful payment
        navigate('/coursepurchases') // Change '/coursepayment' to your desired route
      })
      .catch((err) => {
        alert('Error: Payment not added')
        console.log(err)
      })
  }

  return (
    <>
      <div className="my-5">
        <div className="bg-blue-900 py-10 mx-10 text-white text-4xl font-black text-center rounded-xl ">
          <h1>Proceed Payment</h1>
        </div>
      </div>
      <div className="flex justify-center my-5">
        <div className="shadow-xl rounded-lg p-10 md:w-1/4 flex justify-center">
          <div className="modal">
            <form className="form" onSubmit={handleCheckout}>
              <p className="font-light text-center">
                Total Price: <p className="text-blue-900 font-black text-2xl">{totalPrice} LKR</p>
              </p>

              <div class="inline-flex items-center justify-center w-full">
                <hr class="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
              </div>

              {/* payment methods */}
              <div className="text-center">
                <button type="button" className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2">
                  <svg class="w-4 h-4 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path
                      fill="currentColor"
                      d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"
                    ></path>
                  </svg>
                  Check out with PayPal
                </button>
                <button type="button" className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2">
                  <svg class="w-5 h-5 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path
                      fill="currentColor"
                      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                    ></path>
                  </svg>
                  Check out with Apple Pay
                </button>
                <button
                  type="button"
                  class="text-gray-900 bg-gray-200 hover:bg-gray-100 border-2 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                >
                  <svg className="w-5 h-5 me-2 -ms-1 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                    <path
                      fill-rule="evenodd"
                      d="M12.037 21.998a10.313 10.313 0 0 1-7.168-3.049 9.888 9.888 0 0 1-2.868-7.118 9.947 9.947 0 0 1 3.064-6.949A10.37 10.37 0 0 1 12.212 2h.176a9.935 9.935 0 0 1 6.614 2.564L16.457 6.88a6.187 6.187 0 0 0-4.131-1.566 6.9 6.9 0 0 0-4.794 1.913 6.618 6.618 0 0 0-2.045 4.657 6.608 6.608 0 0 0 1.882 4.723 6.891 6.891 0 0 0 4.725 2.07h.143c1.41.072 2.8-.354 3.917-1.2a5.77 5.77 0 0 0 2.172-3.41l.043-.117H12.22v-3.41h9.678c.075.617.109 1.238.1 1.859-.099 5.741-4.017 9.6-9.746 9.6l-.215-.002Z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  Check out with Google Pay
                </button>
              </div>

              <div class="inline-flex items-center justify-center w-full">
                <hr class="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                <span class="absolute px-3 font-bold text-xs text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">or</span>
              </div>

              {/* Credit card info */}
              <div className="credit-card-info--form">
                <div className="sm:col-span-3">
                  <label htmlFor="chEmail" className="block text-sm font-medium leading-6 text-gray-900">
                    Card Holder's Email
                  </label>
                  <input type="email" id="chEmail" name="chEmail" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="cdName" className="block text-sm font-medium leading-6 text-gray-900">
                    Card Holder's Name
                  </label>
                  <input type="text" id="cdName" name="cdName" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="cdNumber" className="block text-sm font-medium leading-6 text-gray-900">
                    Card Number
                  </label>
                  <input type="text" id="cdNumber" name="cdNumber" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                </div>

                <div className="grid grid-cols-2">
                  <div className="sm:col-span-3">
                    <label htmlFor="exDate" className="block text-sm font-medium leading-6 text-gray-900">
                      Expiry Date
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        id="exDate"
                        name="exDate"
                        placeholder="MM/DD"
                        className="block w-32 mr-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="cvv" className="block text-sm font-medium leading-6 text-gray-900">
                      CVV
                    </label>
                    <input type="text" id="cvv" name="cvv" className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                  </div>
                </div>
              </div>

              {/* Checkout button */}
              <button className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2" type="submit">
                Checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Payment
