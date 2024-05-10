import React from 'react';
import { Link } from 'react-router-dom';

export default function InstructorCourses() {
  return (
    <div>
      <h2>Instructor Courses</h2>
      <div>
        <Link to="/addCourses">
          <button>Add Courses</button>
        </Link>
        <Link to="/displayCourses">
          <button>View My Courses</button>
        </Link>
      </div>
    </div>
  );
}
