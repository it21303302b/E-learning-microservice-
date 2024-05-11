import { useEffect, useState } from "react";
import "./ItemDetails.css";
import { useDispatch, useSelector } from 'react-redux';
import { addItem } from '../../store/cartSlice';
import axios from "axios";

const ItemDetails = () => {
  const [courses, setCourses] = useState([]);
  const cartItems = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();

  useEffect(() => {
    axios
      .get("http://localhost:4001/api/courses")
      .then((res) => {
        console.log(res.data);
        setCourses(res.data);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const handleAddToCart = (course) => {
    dispatch(addItem(course));
  };

  const isAddedToCart = (course) => {
    return cartItems.some((item) => item._id === course._id);
  };

  return (
    <div className="container">
      <div className="card-container">
        {courses.map((course, index) => (
          <div className="card" key={index}>
            <div className="card-content">
              <h2 className="course-name">{course.course_name}</h2>
              <img className="course-image" src={course.course_img} alt={course.course_name} />
              <p className="course-description">{course.course_description}</p>
              <p className="course-price">${course.course_price}</p>
              <p className="enrollment-details">{course.enrollment_details}</p>
              {!isAddedToCart(course) ? (
                <button
                  className="add-to-cart-btn"
                  onClick={() => handleAddToCart(course)}
                >
                  Add to Cart
                </button>
              ) : (
                <button
                  className="add-to-cart-btn added-to-cart"
                  disabled
                >
                  Added to Cart
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemDetails;
