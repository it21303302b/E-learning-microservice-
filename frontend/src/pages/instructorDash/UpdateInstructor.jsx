import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';

export default function UpdateInstructor() {
  const [editMode, setEditMode] = useState(false);
  const [instructor, setInstructor] = useState({
    firstName: '',
    lastName: '',
    mobileNumber: '',
    email: '',
    role: 'instructor',
  });
  const [originalInstructor, setOriginalInstructor] = useState({});

  useEffect(() => {
    const instructorID = localStorage.getItem('instructorID');
    axios.get(`http://localhost:8070/api/auth/user/${instructorID}`)
      .then(response => {
        setInstructor(response.data);
        setOriginalInstructor(response.data);
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

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleCancel = async () => {
    await setEditMode(false);
    setInstructor(originalInstructor);
  };

  const handleSubmit = e => {
    e.preventDefault();
    const instructorID = localStorage.getItem('instructorID');
    axios.patch(`http://localhost:8070/api/auth/user/${instructorID}`, instructor)
      .then(response => {
        console.log('Instructor updated successfully:', response.data);
        setEditMode(false);
        // Fetch updated instructor details
        return axios.get(`http://localhost:8070/api/auth/user/${instructorID}`);
      })
      .then(response => {
        setInstructor(response.data);
        setOriginalInstructor(response.data);
        // Show success notification
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Instructor details updated successfully!',
        });
      })
      .catch(error => {
        console.error('Error updating instructor:', error);
        // Show error notification
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Failed to update instructor details. Please try again.',
        });
      });
  };

  return (
    <div>
      <h2>Update Instructor Details</h2>
      {editMode ? (
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
          <button type="submit">Update</button><br/>
          <button type="button" onClick={handleCancel}>Cancel</button>
        </form>
      ) : (
        <div>
          <p>First Name: {instructor.firstName}</p>
          <p>Last Name: {instructor.lastName}</p>
          <p>Mobile Number: {instructor.mobileNumber}</p>
          <p>Email: {instructor.email}</p>
          <button onClick={handleEdit}>Edit</button>
        </div>
      )}
    </div>
  );
}
