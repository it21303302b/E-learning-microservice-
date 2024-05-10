import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './payment.css';

function Payment() {
  const current = new Date();

  const [data, setData] = useState([]);
  const totalPrice = JSON.parse(localStorage.getItem('totalPrice')) || 0;

  const [shippingAddress, setAddress] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cvcNumber, setCvcNumber] = useState('');
  const [expDate, setExpDate] = useState('');
  const [cardHolderName, setCardHolderName] = useState('');
  const [email, setEmail] = useState('');

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('myCart')) || [];
    setData(cartData);
  }, []);

  const [deliveryOption, setDeliveryOption] = useState('dhl');

  const handleDeliveryChange = (event) => {
    setDeliveryOption(event.target.value);
  };

  const handleCheckout = (event) => {
    event.preventDefault();

    // Get form data
    const cardHolderEmail = document.getElementById('chEmail').value;
    const cardHolderName = document.getElementById('cdName').value;
    const cardNumber = document.getElementById('cdNumber').value;
    const expiryDate = document.getElementById('exDate').value;
    const cvv = document.getElementById('cvv').value;

    // Get data from local storage
    const userId = localStorage.getItem('userId');
    const courseIds = JSON.parse(localStorage.getItem('courseIDs')); // Retrieve courseIds from local storage

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
    };

    // Send payment data to the backend
    axios
      .post('http://localhost:8003/api/payments/add', newPayment)
      .then(() => {
        alert('Payment Successful');
        console.log(newPayment);
      })
      .catch((err) => {
        alert('Error: Payment not added');
        console.log(err);
      });
  };

  return (
    <>
      <div>
        <div className="payment">
          <div className="modal">
            <form className="form" onSubmit={handleCheckout}>
              {/* Credit card info */}
              <div className="credit-card-info--form">
                <div className="sm:col-span-3">
                  <label htmlFor="chEmail" className="block text-sm font-medium leading-6 text-gray-900">
                    Card Holder's Email
                  </label>
                  <input
                    type="email"
                    id="chEmail"
                    name="chEmail"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="cdName" className="block text-sm font-medium leading-6 text-gray-900">
                    Card Holder's Name
                  </label>
                  <input
                    type="text"
                    id="cdName"
                    name="cdName"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
                </div>

                <div className="sm:col-span-3">
                  <label htmlFor="cdNumber" className="block text-sm font-medium leading-6 text-gray-900">
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cdNumber"
                    name="cdNumber"
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  />
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
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      className="block w-32 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    />
                  </div>
                </div>

                <p>Total Price: LKR {totalPrice}</p>
              </div>

              {/* Checkout button */}
              <button
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
                type="submit"
              >
                Checkout
              </button>
            </form>
          </div>
        </div>
      </div>
    </>
  );
}

export default Payment;
