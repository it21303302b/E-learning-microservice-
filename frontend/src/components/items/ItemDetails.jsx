import { useEffect, useState } from "react";
import "./ItemDetails.css";
import { Link } from "react-router-dom";
import axios from "axios";

const ItemDetails = () => {
  const [courses, setCourses] = useState([]);

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

  return (
    <div className="container">
      <div className="card-container">
        {courses.map((course, index) => (
          <div className="card" key={index}>
            <div className="card-content">
              <h2 className="course-name">{course.course_name}</h2>
              <p className="course-description">{course.course_description}</p>
              <p className="course-price">${course.course_price}</p>
              <p className="enrollment-details">{course.enrollment_details}</p>
              <Link to={`../addreview/${course._id}`}>
                <button className="add-review-btn">Add Review</button>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemDetails;
