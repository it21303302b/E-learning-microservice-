import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../store/cartSlice';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Button from './button';

const ItemCard = (props) => {
  const [courses, setCourses] = useState([]);
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const cartItems = useSelector((state) => state.cart.items);

  useEffect(() => {
    function getCourses() {
      axios
        .get('http://localhost:4001/api/courses')
        .then((res) => {
          setCourses(res.data);
        })
        .catch((err) => {
          alert(err.message);
        });
    }

    getCourses();

    axios
      .get(`http://localhost:8003/api/payments/user/${localStorage.getItem('userId')}/payments`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
        },
      })
      .then((res) => {
        const payments = res.data.data || [];
        const purchasedCourses = payments.flatMap((payment) => payment.courseIds);
        setPurchasedCourses(purchasedCourses);
      })
      .catch((err) => {
        console.error('Error fetching purchased courses:', err);
      });
  }, []);

  const dispatch = useDispatch();

  const handleAddToCart = (course) => {
    dispatch(addItem(course));
  };

  const isAddedToCart = (course) => {
    return cartItems.some((item) => item._id === course._id);
  };

  const isAlreadyPurchased = (course) => {
    return purchasedCourses.includes(course._id);
  };

  return (
    <div className="grid md:grid-cols-4 items-center">
      {courses.map((course, index) => (
        <div key={index} className="m-3">
          <div className="w-72 flex flex-col overflow-hidden rounded-t-lg border bg-white shadow-md">
            <div className="flex w-full h-64 shadow-lg overflow-hidden">
              <img className="object-cover " src={course.course_img} alt="course" />
            </div>
            <div className="m-5">
              <h5 className="text-md tracking-tight text-blue-900">{course.course_name}</h5>

              <div>
                <p>
                  <span className="text-lg font-bold text-gray-900">{course.course_price} LKR</span>
                </p>
              </div>
              {isAlreadyPurchased(course) ? (
                <Button className="text-white bg-gradient-to-r from-teal-400 via-teal-500 to-teal-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-teal-300 dark:focus:ring-teal-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full" disabled>
                  <svg class="mr-2 w-6 h-6 text-gray-800 dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="white" viewBox="0 0 24 24">
                    <path fill-rule="evenodd" d="M4 4a1 1 0 0 1 1-1h1.5a1 1 0 0 1 .979.796L7.939 6H19a1 1 0 0 1 .979 1.204l-1.25 6a1 1 0 0 1-.979.796H9.605l.208 1H17a3 3 0 1 1-2.83 2h-2.34a3 3 0 1 1-4.009-1.76L5.686 5H5a1 1 0 0 1-1-1Z" clip-rule="evenodd" />
                  </svg>
                  Already Purchased
                </Button>
              ) : (
                <Button
                  onClick={() => {
                    handleAddToCart(course);
                  }}
                  className={`text-white ${isAddedToCart(course) ? 'bg-gray-400' : 'bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:ring-4 focus:outline-none focus:ring-pink-200 dark:focus:ring-pink-800'} font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 w-full`}
                  style={{ width: '100%' }} // Set width to match the button dimensions
                >
                  <svg class="mr-2 w-6 h-6 text-gray-800 dark:text-white " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                    <path stroke="white" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4h1.5L8 16m0 0h8m-8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm8 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm.75-3H7.5M11 7H6.312M17 4v6m-3-3h6" />
                  </svg>
                  {isAddedToCart(course) ? 'Added to Cart' : 'Add to Cart'}
                </Button>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ItemCard;
