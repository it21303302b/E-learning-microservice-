import React, { useState, useEffect } from 'react';
import axios from 'axios';

const PurchasedCourses = () => {
  const [purchasedCourses, setPurchasedCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem('userId'); // Get user ID from local storage

  useEffect(() => {
    const fetchUserPayments = async () => {
      try {
        const response = await axios.get(`http://localhost:8003/api/payments/user/${userId}/payments`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
          },
        });

        console.log('Payments:', response.data.data);

        const payments = response?.data?.data || [];

        const courses = [];
        for (const payment of payments) {
          for (const courseId of payment.courseIds) {
            const courseResponse = await axios.get(`http://localhost:4001/api/courses/${courseId}`, {
              headers: {
                Authorization: `Bearer ${localStorage.getItem('accessToken')}`,
              },
            });
            courses.push(courseResponse?.data);
          }
        }

        const updatedPayments = payments.map((payment, index) => {
          return {
            ...payment,
            courses: courses.filter(course => course && course._id && payment.courseIds.includes(course._id)),
          };
        });

        console.log('Updated Payments:', updatedPayments);

        setPurchasedCourses(updatedPayments);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching user payments:', error);
      }
    };

    fetchUserPayments();
  }, [userId]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Purchased Courses</h2>
      <div className="course-cards">
        {purchasedCourses.map(({ _id, cardHolderName, courses }) => (
          <div key={_id} className="payment-card">
            <h3>Card Holder Name: {cardHolderName}</h3>
            {courses.map(course => (
              <div key={course?._id} className="course-card">
                <h4>Course Name: {course?.course_name}</h4>
                <p>Description: {course?.course_description}</p>
                <p>Price: ${course?.course_price}</p>
                <p>Instructor Email: {course?.instructor_email}</p>
                <img src={course?.course_img} alt={course?.course_name} />
                {/* Render other course details as needed */}
              </div>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PurchasedCourses;