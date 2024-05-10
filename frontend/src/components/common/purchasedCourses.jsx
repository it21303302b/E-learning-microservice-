import React, { useState, useEffect } from 'react';
import axios from 'axios';

function PurchasedCourses() {
  const [purchasedCourses, setPurchasedCourses] = useState([]);

  useEffect(() => {
    // Fetch user's purchased courses from the backend
    const fetchPurchasedCourses = async () => {
      try {
        // Make an API request to retrieve the user's purchased courses
        const response = await axios.get('http://localhost:8003/api/user/purchasedCourses', {
          headers: {
            Authorization: `Bearer ${localStorage.getItem('accessToken')}`, // Send access token in headers for authentication
          },
        });

        // Update the state with the fetched data
        setPurchasedCourses(response.data.purchasedCourses);
      } catch (error) {
        console.error('Error fetching purchased courses:', error);
      }
    };

    // Call the function to fetch purchased courses when the component mounts
    fetchPurchasedCourses();
  }, []); // Empty dependency array ensures the effect runs only once

  return (
    <div>
      <h2>Purchased Courses</h2>
      <ul>
        {/* Render the list of purchased courses */}
        {purchasedCourses.map((course) => (
          <li key={course._id}>{course.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default PurchasedCourses;
