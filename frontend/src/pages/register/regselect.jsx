import React, { Component } from 'react'
import './index.css'
import { Link } from 'react-router-dom'
import { Divider } from '../../components/common'
import LogoText from '../../components/common/LogoText'

export default class Register extends Component {
  render() {
    return (
      <div>
        <div className="w-full py-10 px-56 mb-20 bg-blue-900">
          <h1 className="text-white font-black text-center text-5xl">Select your Role to Register</h1>
        </div>
        <div className="w-full flex justify-center space-x-5">
          <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-1/4 ">
            <Link to="/register/cusregister">
              <img className="rounded-t-lg" src="https://i.ibb.co/fxf96pw/5127314.jpg" alt="" />
            </Link>
            <div className="p-5">
              <Link to="/register/cusregister">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-900 dark:text-white">Register as a Learner</h5>
              </Link>
              <Link to="/register/cusregister" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Click here
                <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </div>
          </div>
          <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 w-1/4">
            <Link to="/register/empregister">
              <img className="rounded-t-lg" src="https://i.ibb.co/HYwKRhm/Group-of-professionals-analyzing-international-map.jpg" alt="" />
            </Link>
            <div className="p-5">
              <Link to="/register/empregister">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-blue-900 dark:text-white">Register as an Instructor</h5>
              </Link>
              <Link to="/register/empregister" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                Click here
                <svg aria-hidden="true" className="ml-2 -mr w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path>
                </svg>
              </Link>
            </div>
          </div>
        </div>

        <div className="my-10">
          <Divider />
        </div>
        <div className="text-center m-10 text-xl font-light text-gray-900">
          <p>
            Already have an account?{' '}
            <Link to={'/login'} className="font-semibold text-blue-900">
              Login Now
            </Link>
          </p>

          <LogoText />
        </div>
      </div>
    )
  }
}
