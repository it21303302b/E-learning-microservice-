import { useEffect, useState } from 'react'
import ItemForm from '../components/items/CourseForm'
import Layout from '../components/layout'

const AddCourses = () => {
  return (
    <div className="home">
      <Layout>
        <ItemForm />
      </Layout>
    </div>
  )
}

export default AddCourses
