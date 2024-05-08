import { useEffect, useState } from 'react'
import CourseDetails from '../components/items/CourseDetails'
import CourseForm from '../components/items/CourseForm'
import Layout from '../components/layout'

const DisplayCourses = () =>{
    return(
        <div className="home">
            <Layout>
            <CourseDetails/>
            </Layout>

        </div>
    )
}

export default DisplayCourses