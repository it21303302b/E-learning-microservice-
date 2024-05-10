import React from 'react'
import { Link } from 'react-router-dom'
import Swal from 'sweetalert2'
import axios from 'axios'
import { useUser } from '../../context/UserContext'
import LogoText from '../../components/common/LogoText'

export default function Cuslogin() {
  const { setCurrentUser } = useUser()
  const [email, setEmail] = React.useState('')
  const [password, setPassword] = React.useState('')

  async function cusLogin(event) {
    event.preventDefault()

    const User = {
      email: email,
      password,
    }

    try {
      const response = await axios.post(`http://localhost:8070/api/auth/login`, User)
      const content = response.data
      const loggedInUser = content.user

      if (content.message === 'Logged in successfully.' && loggedInUser.role === 'learner') {
        localStorage.setItem('userId', loggedInUser._id)
        setCurrentUser(loggedInUser._id)
        console.log(loggedInUser._id)

        Swal.fire({
          icon: 'success',
          title: 'Successful...',
          text: 'Login Successful as a Learner!',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.href = `/` // to home page
          }
        })
      } else {
        // Display error message if the user is not a learner
        Swal.fire({
          icon: 'error',
          title: 'Oops...',
          text: 'Only learners are allowed to login here!',
        })
      }
    } catch (error) {
      console.error('Login Error:', error)
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Something went wrong. Please try again later!',
      })
    }
  }

  return (
    <div>
      <div className="flex w-full justify-center my-24">
        <section className="bg- rounded-2xl dark:bg-gray-900">
          <div className="flex flex-col items-center justify-center border shadow-lg rounded-md p-10 md:w-full lg:w-max sm:w-fit">
            <LogoText />
            <div className="flex mt-5 items-center text-lg font-semibold text-gray-900 dark:text-black">
              <p>Login as a Learner</p>
            </div>
            <div className="py-3 border-t-2">
              <form className="space-y-4 md:space-y-6" onSubmit={cusLogin} autoComplete="off">
                <div>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Your email
                  </label>
                  <input
                    type="text"
                    name="email"
                    id="email"
                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="name@mail.com"
                    onChange={(event) => setEmail(event.target.value)}
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
                    onChange={(event) => setPassword(event.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  Login
                </button>
                <p className="text-sm font-light text-gray-500 dark:text-gray-400 dark:text-black">
                  Don’t have an account yet?{' '}
                  <Link to="/register" className="text-blue-900 font-black hover:underline dark:text-primary-500">
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
