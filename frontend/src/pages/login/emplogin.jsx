import React from 'react'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import axios from 'axios'
import LogoText from '../../components/common/LogoText'

export default function InstructorLogin() {
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  async function instructorLogin(event) {
    event.preventDefault()

    const user = {
      email: email,
      password,
    }

    try {
      const response = await axios.post(`http://localhost:8070/api/auth/login`, user)
      const content = response.data

      if (content.message === 'Logged in successfully.' && content.user.role === 'instructor') {
        localStorage.setItem('session', 'yes')
        localStorage.setItem('instructorID', content.user._id)
        localStorage.setItem('userId', content.user._id)
        localStorage.setItem('instructorEmail', content.user.email)
        localStorage.setItem('authToken', content.token)
        localStorage.setItem('user', 'instructor')

        Swal.fire({
          icon: 'success',
          title: 'Successful...',
          text: 'Login Successful as an Instructor!',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = '/instructorDash'
          }
        })
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Check Your Email & Password Again!!!',
        })
      }
    } catch (error) {
      console.log('Error: ', error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later.',
      })
    }
  }

  return (
    <div className="form-bg-img h-screen">
      <div className="flex justify-center py-32">
        <div className="p-5 flex flex-col items-center justify-center border shadow-lgp-10 rounded-2xl dark:bg-gray-900 bg-white shadow-lg md:w-1/3 sm:w-full">
          <LogoText />
          <div className="flex mt-2 items-center text-2xl font-semibold text-gray-900 dark:text-black">
            <b>Login as an Instructor</b>
          </div>
          <div className="py-3 border-t-2 md:w-2/3 sm:w-full">
            <div>
              <form className="space-y-4 md:space-y-6" onSubmit={instructorLogin}>
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@mail.com"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  Login
                </button>
                <p className="text-sm font-light text-center text-gray-500 dark:text-gray-400 dark:text-black">
                  Don’t have an account yet?{' '}
                  <Link to="/register" className="text-blue-900 font-black hover:underline dark:text-primary-500">
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
