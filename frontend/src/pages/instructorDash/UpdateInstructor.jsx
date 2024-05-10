import React, { useState, useEffect } from 'react';
import axios from 'axios';

export default function UpdateInstructor() {
  const [instructor, setInstructor] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    role: 'instructor',
  });

  useEffect(() => {
    // Fetch instructor details using instructorID from local storage
    const instructorID = localStorage.getItem('instructorID');
    axios.get(`/api/instructors/${instructorID}`)
      .then(response => {
        setInstructor(response.data);
      })
      .catch(error => {
        console.error('Error fetching instructor details:', error);
      });
  }, []);

  const handleChange = e => {
    const { name, value } = e.target;
    setInstructor(prevState => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = e => {
    e.preventDefault();
    // Update instructor details
    const instructorID = localStorage.getItem('instructorID');
    axios.put(`/api/instructors/${instructorID}`, instructor)
      .then(response => {
        console.log('Instructor updated successfully:', response.data);
      })
      .catch(error => {
        console.error('Error updating instructor:', error);
      });
  };

  return (
    <div>
      <h2>Update Instructor Details</h2>
      <form onSubmit={handleSubmit}>
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={instructor.firstName}
            onChange={handleChange}
          />
        </label>
        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={instructor.lastName}
            onChange={handleChange}
          />
        </label>
        <label>
          Mobile Number:
          <input
            type="text"
            name="mobileNumber"
            value={instructor.mobileNumber}
            onChange={handleChange}
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={instructor.email}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Update</button>
      </form>
    </div>
  );
}
