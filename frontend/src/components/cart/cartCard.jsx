import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem } from '../../store/cartSlice';
import navigate from 'navigate';

const CartCard = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemoveItem = (id) => {
    dispatch(removeItem(id));
  };

  const handleClick = () => {
    if (cartItems.length > 0) {
      // Save course IDs and total price to local storage
      const courseIDs = cartItems.map(item => item._id);
      const total = cartItems.reduce((acc, item) => acc + item.course_price * item.quantity, 0);
      localStorage.setItem('courseIDs', JSON.stringify(courseIDs));
      localStorage.setItem('totalPrice', total);
  
      // Navigate to payments page
      navigate('/payment');
  
      // Automatically refresh the page after a short delay (e.g., 500 milliseconds)
      setTimeout(() => {
        window.location.reload();
      }, 500);
    } else {
      alert('Cart is empty');
    }
  };
  
  

  // Calculate subtotal and shipping
  const subtotal = cartItems.reduce((acc, item) => acc + item.course_price * item.quantity, 0);
  const shipping = subtotal > 100 ? subtotal * 0.05 : 0;

  return (
    <div className="h-screen bg-gray-100 pt-10">
      <h1 className="mb-10 text-center text-3xl font-bold">CART ITEMS</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        {/* Cart Items */}
        <div className="rounded-lg md:w-2/3">
          {cartItems.map((item) => (
            <div key={item._id} className="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
              <img src="https://www.srisrimadhara.com/wp-content/uploads/2020/12/Muhurath_1.png" alt="product-image" className="w-full rounded-lg sm:w-40" />
              <div className="sm:ml-4 sm:flex sm:w-full sm:justify-between">
                <div className="mt-5 sm:mt-0">
                  <h2 className="text-lg font-bold text-gray-900">{item.course_name}</h2>
                </div>
                <div className="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
                  <div className="flex items-center border-gray-100">
                    <input className="h-8 w-10 border bg-white text-center text-xs outline-none" type="number" value={item.quantity} min={1} readOnly />
                  </div>
                  <div className="flex items-center space-x-4">
                    <p className="text-md ">LKR {item.course_price}</p>
                    <button onClick={() => handleRemoveItem(item._id)}>
                      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="h-5 w-5 cursor-pointer duration-150 hover:text-red-500">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Sub total */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">LKR {subtotal}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Savings</p>
            <p className="text-gray-700">LKR {shipping}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">LKR {subtotal + shipping}</p>
            </div>
          </div>
          <button onClick={handleClick} data-toggle="modal" data-target="#staticBackdrop" className="mt-6 w-full rounded-md bg-green-800 py-1.5 font-medium text-blue-50 hover:bg-blue-600">
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartCard;
