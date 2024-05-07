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
    <div>
      {courses.map((course, index) => (
        <div className="course_style" key={index}>
          <b>
            <h1>Course Name: {course.course_name}</h1>
          </b>
          <br />
          <p>Course Description: {course.course_description}</p>
          <br />
          <p>Course Price: {course.course_price}</p>
          <br />
          <p>Enrollment Details: {course.enrollment_details}</p>
          <Link to={`../addreview/${course._id}`}>
            <button>Add Review</button>
          </Link>
        </div>
      ))}
    </div>
  );
};

export default ItemDetails;
