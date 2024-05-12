import React from 'react'
import InstructorCourses from './InstructorCourses'
import DisplayCourses from '../DisplayCourses'
import NavbarInstructor from '../../components/layout/header/NavbarInstructor'

export default function InstructorDash() {
  return (
    <div>
      <NavbarInstructor />
      <InstructorCourses />
      <DisplayCourses />
    </div>
  )
}
