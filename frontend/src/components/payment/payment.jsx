import React, { useEffect, useState } from 'react'
import axios from 'axios'
import './payment.css'

function Payment() {
  const current = new Date()

  const [data, setData] = useState([])
  const totalPrice = JSON.parse(localStorage.getItem('totalPrice')) || 0

  const [shippingAddress, setAddress] = useState('')
  const [cardNumber, setCardNumber] = useState('')
  const [cvcNumber, setCvcNumber] = useState('')
  const [expDate, setExpDate] = useState('')
  const [cardHolderName, setCardHolderName] = useState('')

  const [payMethod, setPayMethod] = useState('creditCard')

  const [email, setEmail] = useState('')
  const [purchasedItems, setPurchasedItems] = useState('')
  const [buyerId, setBuyerId] = useState('64639d4a4502095bc3368854')
  const [totalWeight, setWeight] = useState(0)
  const [deliveryDate, setDate] = useState(`${current.getFullYear()}-${current.getMonth() + 1}-${current.getDate()}`)
  const [deliveryStatus, setStatus] = useState('pending')

  const cartData = JSON.parse(localStorage.getItem('myCart'))

  useEffect(() => {
    setData(cartData || [])
  }, [])

  const [deliveryOption, setDeliveryOption] = useState('dhl')

  const handleDeliveryChange = (event) => {
    setDeliveryOption(event.target.value)
  }

  const deliveryFee = 0 // Shipping fee removed

  const subtotal = data.reduce((accumulator, currentValue) => accumulator + currentValue.product_price * currentValue.quantity, 0)
  const shipping = subtotal * 1.5 * deliveryFee

  const total = subtotal + shipping

  function sendData(event) {
    event.preventDefault()

    //Creating creditCard
    const creditCardData = {
      cardNumber,
      cvcNumber,
      cardHolderName,
      amount: total,
    }

    //creating payment
    const newPayment = {
      amount: total,
      shippingAddress,
      shippingMethod: deliveryOption,
      creditCard: creditCardData,
      paymentMethod: 'creditCard', // Set to credit card
      buyerEmail: email,
      purchasedItems: cartData,

    }

    // const newDelivery = {
    //   buyerId,
    //   orderedItems: cartData,
    //   totalWeight,
    //   deliveryService: deliveryOption,
    //   deliveryAddress: shippingAddress,
    //   deliveryDate,
    //   deliveryFee: shipping,
    //   deliveryStatus,
    // }

    // console.log(newDelivery)

    // axios
    //   .post('http://localhost:8004/api/v1/deliveries', newDelivery)
    //   .then(() => {
    //     alert('Delivery added Successfully')
    //     console.log(newDelivery)
    //   })
    //   .catch((err) => {
    //     alert('Error: Delivery not added')
    //     console.log(err)
    //   })


    axios
      .post('http://localhost:8003/api/v1/payments', newPayment)
      .then(() => {
        alert('Payment Successful')
        console.log(newPayment)
      })
      .catch((err) => {
        alert('Error: Payment not added')

        console.log(err)
      })
  }

  return (
    <>
      <div>
        <div className="payment">
          <div className="modal">
            <form className="form" onSubmit={sendData}>
              {/* payment options */}
              <div className="payment--options text-center">
                {/* paypal */}
                <button type="button" class="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2">
                  <svg class="w-4 h-4 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="paypal" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path
                      fill="currentColor"
                      d="M111.4 295.9c-3.5 19.2-17.4 108.7-21.5 134-.3 1.8-1 2.5-3 2.5H12.3c-7.6 0-13.1-6.6-12.1-13.9L58.8 46.6c1.5-9.6 10.1-16.9 20-16.9 152.3 0 165.1-3.7 204 11.4 60.1 23.3 65.6 79.5 44 140.3-21.5 62.6-72.5 89.5-140.1 90.3-43.4 .7-69.5-7-75.3 24.2zM357.1 152c-1.8-1.3-2.5-1.8-3 1.3-2 11.4-5.1 22.5-8.8 33.6-39.9 113.8-150.5 103.9-204.5 103.9-6.1 0-10.1 3.3-10.9 9.4-22.6 140.4-27.1 169.7-27.1 169.7-1 7.1 3.5 12.9 10.6 12.9h63.5c8.6 0 15.7-6.3 17.4-14.9 .7-5.4-1.1 6.1 14.4-91.3 4.6-22 14.3-19.7 29.3-19.7 71 0 126.4-28.8 142.9-112.3 6.5-34.8 4.6-71.4-23.8-92.6z"
                    ></path>
                  </svg>
                  Check out with PayPal
                </button>

                {/* apple pay */}
                <button type="button" class="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2">
                  <svg class="w-5 h-5 me-2 -ms-1" aria-hidden="true" focusable="false" data-prefix="fab" data-icon="apple" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512">
                    <path
                      fill="currentColor"
                      d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-26.9-47.2-41.7-84.7-44.6-35.5-2.8-74.3 20.7-88.5 20.7-15 0-49.4-19.7-76.4-19.7C63.3 141.2 4 184.8 4 273.5q0 39.3 14.4 81.2c12.8 36.7 59 126.7 107.2 125.2 25.2-.6 43-17.9 75.8-17.9 31.8 0 48.3 17.9 76.4 17.9 48.6-.7 90.4-82.5 102.6-119.3-65.2-30.7-61.7-90-61.7-91.9zm-56.6-164.2c27.3-32.4 24.8-61.9 24-72.5-24.1 1.4-52 16.4-67.9 34.9-17.5 19.8-27.8 44.3-25.6 71.9 26.1 2 49.9-11.4 69.5-34.3z"
                    ></path>
                  </svg>
                  Check out with Apple Pay
                </button>

                {/* g-pay */}
                <button
                  type="button"
                  class="text-gray-900 bg-gray-100 hover:bg-gray-50 border border-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-800 dark:bg-white dark:border-gray-700 dark:text-gray-900 dark:hover:bg-gray-200 me-2 mb-2"
                >

                  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 me-2 -ms-1" viewBox="0 0 48 48">
                    <path
                      fill="#fbc02d"
                      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
                    ></path>
                    <path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path>
                    <path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path>
                    <path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                  </svg>
                  Checkout with Google Pay
                </button>
              </div>
              
              <div className="separator">
                <hr className="line" />
                <p>or pay using credit card</p>
                <hr className="line" />
              </div>
              <div className="credit-card-info--form">
                <div className="sm:col-span-3">
                  <label htmlFor="chEmail" className="block text-sm font-medium leading-6 text-gray-900">
                    Card Holder's Email
                  </label>
                  <div>
                    <input
                      type="email"
                      name="chEmail"
                      id="chEmail"
                      autoComplete="email"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="cdName" className="block text-sm font-medium leading-6 text-gray-900">
                    Card Holder's Name
                  </label>
                  <div>
                    <input name="cdName" id="cdName" autoComplete="name" className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />

                  </div>
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="cdNumber" className="block text-sm font-medium leading-6 text-gray-900">
                    Card Number
                  </label>
                  <div>
                    <input
                      type="text"
                      name="cdNumber"
                      id="cdNumber"
                      autoComplete="cd-number"
                      className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2">
                  <div className="sm:col-span-3">
                    <label htmlFor="exDate" className="block text-sm font-medium leading-6 text-gray-900">
                      Expiry Date
                    </label>
                    <div className="flex">
                      <input
                        type="text"
                        name="exMonth"
                        id="exDate"
                        placeholder="MM"
                        autoComplete="ex-month"
                        className="block w-20 mr-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                      <input
                        type="text"
                        name="exDay"
                        id="exDate"
                        placeholder="DD"
                        autoComplete="ex-day"
                        className="block w-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                      />
                    </div>
                  </div>

                  <div className="sm:col-span-3">
                    <label htmlFor="cvv" className="block text-sm font-medium leading-6 text-gray-900">
                      CVV
                    </label>
                    <div>
                      <input type="text" name="cvv" id="cvv" autoComplete="cvv" className="block w-20 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                    </div>
                  </div>
                </div>

                <p>Total Price: LKR {totalPrice}</p>

              </div>
              <button class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">Checkout</button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}

export default Payment
