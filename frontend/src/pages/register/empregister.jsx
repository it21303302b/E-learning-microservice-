import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom'
import LogoText from '../../components/common/LogoText'

export default function EmpRegister() {
  const navigate = useNavigate()
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [mobileNumber, setMobileNumber] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isErr, setIsErr] = useState('')

  const checkValidation = (e) => {
    setConfirmPassword(e.target.value)
    if (password !== e.target.value) {
      setIsErr('Passwords do not match')
    } else {
      setIsErr('')
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()

    // Check if passwords match
    if (password !== confirmPassword) {
      setIsErr('Passwords do not match')
      return
    }

    // Set default role value
    const userData = {
      firstName,
      lastName,
      email,
      mobileNumber,
      password,
      role: 'instructor', // Updated role for instructor registration
    }

    console.log(userData)

    try {
      // Register user
      axios
        .post('http://localhost:8070/api/auth/register', userData)
        .then(() => {
          console.log('User Registered Successfully')
          // Display success message
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'User registered successfully.',
          })

          // Redirect to login page
          navigate('/login/emplogin')
        })
        .catch((err) => {
          console.log(err)
        })
    } catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="form-bg-img">
      <div className="p-24">
        <div className="text-3xl font-bold text-gray-900 text-center bg-white bg-opacity-80 py-5 rounded-lg shadow">
          <LogoText />
          <h1>Register as an Instructor</h1>
        </div>

        <div className="w-auto bg-white rounded-lg shadow dark:border md:mt-5 sm:max-w-l xl:p-0 dark:bg-gray-800 dark:border-gray-700 cusregform">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <form className="space-y-4 md:space-y-6" autoComplete="off" onSubmit={handleSubmit}>
              {/* name  */}
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                <div>
                  <label htmlFor="fname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    First Name
                  </label>
                  <input
                    type="text"
                    id="fname"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="John"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                  />
                </div>
                <div>
                  <label htmlFor="lname" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                    Last Name
                  </label>
                  <input
                    type="text"
                    id="lname"
                    className="bg-gray-100 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="Doe"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                  />
                </div>
              </div>

              {/* contactno */}
              <div>
                <label htmlFor="contactno" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Mobile Number
                </label>
                <input
                  type="text"
                  name="contactno"
                  id="contactno"
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="011-2364567"
                  value={mobileNumber}
                  onChange={(e) => setMobileNumber(e.target.value)}
                  required
                />
              </div>
              {/* email */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@mail.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-6 mb-6 md:grid-cols-2">
                {/* password */}
                <div>
                  <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                {/* confirm password */}
                <div>
                  <label htmlFor="confirm-password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    name="confirm-password"
                    id="confirm-password"
                    placeholder="••••••••"
                    className="bg-gray-100 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    value={confirmPassword}
                    onChange={(e) => checkValidation(e)}
                    required
                  />
                </div>
              </div>

              <div className="w-full flex justify-center">
                <div>
                  <input id="terms" aria-describedby="terms" type="checkbox" className="w-4 h-4 text-blue-900 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600" required />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-500 dark:text-gray-300">
                    I accept the{' '}
                    <a className="font-medium text-blue-900 hover:underline" href="/">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <div className="w-full flex justify-center">
                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                  Create an account
                </button>
              </div>
              <div className="w-full flex justify-center">
                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                  Already have an account?{' '}
                  <Link to="/login" className="font-medium text-blue-900 hover:underline">
                    Login Here
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
