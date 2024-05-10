import React from 'react';
import Navbar from '../../components/layout/header/Navbar';
import InstructorCourses from './InstructorCourses';
import UpdateInstructor from './UpdateInstructor';

export default function InstructorDash() {
  return (
    <>
      <Navbar />
      <InstructorCourses />
      <UpdateInstructor />
    </>
  );
}
