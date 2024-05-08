import React, { useEffect, useState } from 'react';
import './CourseDetails.css';
import axios from 'axios';

const CourseDetails = () => {
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios
      .get('http://localhost:4001/api/courses')
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
          <p>Lecture Notes: {course.course_content.lecture_notes}</p>
          <br />
          <p>Course Price: {course.course_price}</p>
        </div>
      ))}
    </div>
  );
};

export default CourseDetails;
