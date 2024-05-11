import { useEffect, useState } from 'react'
import ItemForm from '../components/items/CourseForm'
import Layout from '../components/layout'
import NavbarInstructor from '../components/layout/header/NavbarInstructor'

const AddCourses = () => {
  return (
    <div>
      <NavbarInstructor />

      <ItemForm />
    </div>
  )
}

export default AddCourses
