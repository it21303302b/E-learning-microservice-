import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PurchasedCourses = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId'); // Get user ID from local storage

  useEffect(() => {
    const fetchPurchasedCourses = async () => {
      try {
        const response = await axios.get(`http://localhost:8003/api/payments/user/${userId}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        setPurchasedCourses(response?.data?.data || []);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
      }
    };

    fetchPurchasedCourses();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Purchased Courses</h2>
      <div className="course-cards">
        {purchasedCourses.map(({ _id, course_name, course_img, course_description, instructor_email, course_price, course_content }) => (
          <div key={_id} className="course-card">
            <h3>{course_name}</h3>
            <img src={course_img} alt={course_name} />
            <p>{course_description}</p>
            <p>Instructor: {instructor_email}</p>
            <p>Price: ${course_price}</p>
            <p>Lecture Notes: {course_content?.lecture_notes}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default PurchasedCourses;
