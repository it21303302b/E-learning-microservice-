import React, { useEffect, useState } from 'react';
import './CourseDetails.css';
import axios from 'axios';
import Swal from 'sweetalert2';

const CourseDetails = () => {
  const [courses, setCourses] = useState([]);
  const [editingCourseId, setEditingCourseId] = useState(null);
  const [updatedCourseName, setUpdatedCourseName] = useState('');
  const [updatedCourseDescription, setUpdatedCourseDescription] = useState('');
  const [updatedCourseLectureNotes, setUpdatedCourseLectureNotes] = useState('');
  const [updatedCoursePrice, setUpdatedCoursePrice] = useState('');

  useEffect(() => {
    const instructorId = localStorage.getItem('instructorID'); // Fetch instructor ID from local storage
    axios
      .get(`http://localhost:4001/api/courses`)
      .then((res) => {
        const instructorCourses = res.data.filter(course => course.instructor_id === instructorId);
        setCourses(instructorCourses);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  const handleEdit = (courseId, courseName, courseDescription, lectureNotes, coursePrice) => {
    setEditingCourseId(courseId);
    setUpdatedCourseName(courseName);
    setUpdatedCourseDescription(courseDescription);
    setUpdatedCourseLectureNotes(lectureNotes);
    setUpdatedCoursePrice(coursePrice);
  };

  const handleUpdate = (courseId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to update this course!',
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Yes, update it!',
      cancelButtonText: 'No, cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        updateCourse(courseId);
      }
    });
  };

  const updateCourse = async (courseId) => {
    try {
      await axios.patch(`http://localhost:4001/api/courses/${courseId}`, {
        course_name: updatedCourseName,
        course_description: updatedCourseDescription,
        course_content: {
          lecture_notes: updatedCourseLectureNotes
        },
        course_price: updatedCoursePrice
      });
      // Refresh courses after update
      const instructorId = localStorage.getItem('instructorID');
      const response = await axios.get(`http://localhost:4001/api/courses`);
      const instructorCourses = response.data.filter(course => course.instructor_id === instructorId);
      setCourses(instructorCourses);
      // Reset editing state
      setEditingCourseId(null);
      Swal.fire(
        'Updated!',
        'Your course has been updated.',
        'success'
      );
    } catch (error) {
      alert('Failed to update course. Please try again.');
      console.error(error);
    }
  };

  const handleDelete = (courseId) => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will not be able to recover this course!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        axios.delete(`http://localhost:4001/api/courses/${courseId}`)
          .then(() => {
            // Refresh courses after deletion
            const instructorId = localStorage.getItem('instructorID');
            const updatedCourses = courses.filter(course => course._id !== courseId);
            setCourses(updatedCourses);
            Swal.fire(
              'Deleted!',
              'Your course has been deleted.',
              'success'
            );
          })
          .catch((error) => {
            alert('Failed to delete course. Please try again.');
            console.error(error);
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire(
          'Cancelled',
          'Your course is safe :)',
          'error'
        );
      }
    });
  };

  return (
    <div>
      {courses.map((course, index) => (
        <div className="course_style" key={index}>
          {editingCourseId === course._id ? (
            <div>
              <input
                type="text"
                value={updatedCourseName}
                onChange={(e) => setUpdatedCourseName(e.target.value)}
              />
              <input
                type="text"
                value={updatedCourseDescription}
                onChange={(e) => setUpdatedCourseDescription(e.target.value)}
              />
              <input
                type="text"
                value={updatedCourseLectureNotes}
                onChange={(e) => setUpdatedCourseLectureNotes(e.target.value)}
              />
              <input
                type="number"
                value={updatedCoursePrice}
                onChange={(e) => setUpdatedCoursePrice(e.target.value)}
              />
              <button onClick={() => handleUpdate(course._id)}>Update</button>
            </div>
          ) : (
            <div>
              <b>
                <h1>Course Name: {course.course_name}</h1>
              </b>
              <br />
              <p>Course Description: {course.course_description}</p>
              <br />
              <p>Lecture Notes: {course.course_content.lecture_notes}</p>
              <br />
              <p>Course Price: {course.course_price}</p>
              <button onClick={() => handleEdit(course._id, course.course_name, course.course_description, course.course_content.lecture_notes, course.course_price)}>Edit</button>
              <button onClick={() => handleDelete(course._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default CourseDetails;
