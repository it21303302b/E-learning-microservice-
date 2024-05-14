/* eslint-disable jsx-a11y/anchor-is-valid */
import React from 'react'
import './index.css'
import { Link } from 'react-router-dom'

export default function Cardset() {
  const goto = 'See more'
  return (
    <div>
      <div className="containerr">
        <div className="row">
          <Link to={'/courseapprove'}>
            <div className="max-w-sm bg-white rounded-lg border border-gray-200 shadow-md dark:bg-gray-800 dark:border-gray-700 cards">
              <a href="/courseapprove">
                <img className="rounded-t-lg" src="https://firebasestorage.googleapis.com/v0/b/synthetic-dealz.appspot.com/o/empdash%2Fcustomer.jpg?alt=media&token=bb73c69a-2e84-4dd1-baa3-f6bf900e5dbc" alt="" />
              </a>
              <div className="p-5">
                <a href="/courseapprove">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Course Management</h5>
                </a>
                <a href="/courseapprove" className="inline-flex items-center py-2 px-3 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                  {goto}
                  <svg aria-hidden="true" className="ml-2 -mr-1 w-4 h-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fill-rule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                  </svg>
                </a>
              </div>
            </div>
          </Link>
        </div>
      </div>
    </div>
  )
}
