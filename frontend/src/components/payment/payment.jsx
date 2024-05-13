import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import './payment.css';

function Payment() {
  const navigate = useNavigate();

  const [data, setData] = useState([]);
  const totalPrice = JSON.parse(localStorage.getItem('totalPrice')) || 0;

  useEffect(() => {
    const cartData = JSON.parse(localStorage.getItem('myCart')) || [];
    setData(cartData);
  }, []);

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
    const courseIds = JSON.parse(localStorage.getItem('courseIDs'));

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
        // Send email notification
        axios
          .post('http://localhost:8003/api/send-email', {
            to: cardHolderEmail,
            subject: 'Purchase Successful',
            body: `Dear ${cardHolderName},\n\nYour purchase was successful.\n\nTotal Amount: ${totalPrice} LKR\n\nThank you for your purchase.`,
          })
          .then(() => {
            alert('Payment Successful');
            console.log(newPayment);

            // Clear cart items from local storage after successful payment
            localStorage.removeItem('myCart');
            localStorage.removeItem('courseIDs');
            localStorage.removeItem('totalPrice');

            // Redirect to course payment page after successful payment
            navigate('/coursepurchases');
          })
          .catch((error) => {
            console.error('Error sending email:', error);
            alert('Payment Successful, but failed to send email notification');
            console.log(newPayment);

            // Clear cart items from local storage after successful payment
            localStorage.removeItem('myCart');
            localStorage.removeItem('courseIDs');
            localStorage.removeItem('totalPrice');

            // Redirect to course payment page after successful payment
            navigate('/coursepurchases');
          });
      })
      .catch((err) => {
        alert('Error: Payment not added');
        console.log(err);
      });
  };

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

              <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
              </div>

              {/* payment methods */}
              <div className="text-center">
                <button
                  type="button"
                  className="text-gray-900 bg-[#F7BE38] hover:bg-[#F7BE38]/90 focus:ring-4 focus:outline-none focus:ring-[#F7BE38]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-[#F7BE38]/50 me-2 mb-2"
                >
                  Check out with PayPal
                </button>
                <button
                  type="button"
                  className="text-white bg-[#050708] hover:bg-[#050708]/80 focus:ring-4 focus:outline-none focus:ring-[#050708]/50 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:hover:bg-[#050708]/40 dark:focus:ring-gray-600 me-2 mb-2"
                >
                  Check out with Apple Pay
                </button>
                <button
                  type="button"
                  className="text-gray-900 bg-gray-200 hover:bg-gray-100 border-2 focus:ring-4 focus:outline-none focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:focus:ring-gray-600 dark:bg-gray-800 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 me-2 mb-2"
                >
                  Check out with Google Pay
                </button>
              </div>

              <div className="inline-flex items-center justify-center w-full">
                <hr className="w-64 h-px my-4 bg-gray-200 border-0 dark:bg-gray-700" />
                <span className="absolute px-3 font-bold text-xs text-gray-900 -translate-x-1/2 bg-white left-1/2 dark:text-white dark:bg-gray-900">
                  or
                </span>
              </div>

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
