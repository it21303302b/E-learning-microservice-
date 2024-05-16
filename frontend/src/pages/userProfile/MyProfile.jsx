import React, { useState, useEffect, Fragment } from 'react'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Layout from '../../components/layout'
import { toast, ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export default function MyProfile() {
  const userId = localStorage.getItem('userId')
  const [userData, setUserData] = useState(null)
  const [showUpdateProfile, setShowUpdateProfile] = useState(false)
  const [showUpdatePassword, setShowUpdatePassword] = useState(false)
  const [passwordData, setPasswordData] = useState({
    newPassword: '',
    confirmPassword: '',
  })

  useEffect(() => {
    if (userId) {
      // Fetch user data
      axios
        .get(`http://localhost:8070/api/auth/user/${userId}`)
        .then((response) => {
          console.log(response.data)
          setUserData(response.data)
        })
        .catch((error) => {
          console.error('Error fetching user data:', error)
        })
    }
  }, [])

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }))
  }

  const handleSaveProfile = async () => {
    const confirmation = window.confirm('Are you sure you want to update your profile?')

    // Proceed with profile update only if confirmed
    if (confirmation) {
      try {
        const response = await axios.patch(`http://localhost:8070/api/auth/user/${userId}`, userData)
        console.log(response.data)
        setShowUpdateProfile(false)
        toast.success('Profile updated Successfully')
      } catch (error) {
        console.error('Error updating profile:', error)
        toast.error('Error updating profile. Please try again later.')
      }
    }
  }

  const handleSavePassword = (e) => {
    e.preventDefault()

    const { newPassword, confirmPassword } = passwordData

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      console.error('Passwords do not match')
      toast.error('Passwords do not match')
      return
    }

    // Send a PATCH request to update the password
    axios
      .patch(`http://localhost:8070/api/auth/user/${userId}`, { password: newPassword })
      .then((response) => {
        console.log(response.data)
        setShowUpdatePassword(false)
        toast.success('Password updated successfully')
      })
      .catch((error) => {
        console.error('Error updating password:', error)
        toast.error('Error updating password. Please try again later.')
      })
  }

  const handleDeleteProfile = () => {
    // Send a DELETE request to delete the user
    axios
      .delete(`http://localhost:8070/api/auth/user/${userId}`)
      .then((response) => {
        if (window.confirm('Are you sure you want to delete your profile?')) {
          console.log(response.data)
          toast.success('Profile deleted successfully')
          // Clear localStorage
          localStorage.removeItem('userId')
          // Redirect to login page
          window.location.href = '/login'
        }
      })
      .catch((error) => {
        console.error('Error deleting user:', error)
        toast.error('Error deleting user. Please try again later.')
      })
  }

  const handleClickUpdateProfile = () => {
    setShowUpdateProfile(true)
  }

  const handleCloseUpdateProfile = () => {
    setShowUpdateProfile(false)
  }

  const handleClickUpdatePassword = () => {
    setShowUpdatePassword(true)
  }

  const handleCloseUpdatePassword = () => {
    setShowUpdatePassword(false)
  }

  return (
    <div className="min-h-screen form-bg-img">
      <ToastContainer />
      <Layout>
        <div className="my-10 mx-80 border-2 p-10 rounded-xl shadow-lg bg-white">
          <div className="m-2 p-5 flex items-center rounded-2xl border shadow-sm bg-blue-900">
            <div className="p-2">
              <svg className="w-16 h-16 text-white dark:text-white" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 9h3m-3 3h3m-3 3h3m-6 1c-.306-.613-.933-1-1.618-1H7.618c-.685 0-1.312.387-1.618 1M4 5h16a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H4a1 1 0 0 1-1-1V6a1 1 0 0 1 1-1Zm7 5a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z" />
              </svg>
            </div>
            <div>
              <h3 className="font-semibold leading-7 text-white mx-10 text-4xl">My Profile</h3>
            </div>
          </div>
          <div className="flex">
            <div className="m-2 px-5 py-5 rounded-md border shadow-sm w-2/3">
              <dl className="divide-y divide-gray-100">
                {userData && (
                  <>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">Full name</dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">
                        {userData.firstName} {userData.lastName}
                      </dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">Email</dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userData.email}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">Mobile Number</dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userData.mobileNumber}</dd>
                    </div>
                    <div className="px-4 py-6 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-0">
                      <dt className="text-sm font-medium leading-6 text-gray-900">User Role</dt>
                      <dd className="mt-1 text-sm leading-6 text-gray-700 sm:col-span-2 sm:mt-0">{userData.role}</dd>
                    </div>
                  </>
                )}
              </dl>
            </div>
            <div className="flex flex-col my-auto mx-auto">
              <button
                type="button"
                onClick={handleClickUpdateProfile}
                className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Update Profile
              </button>

              <button
                type="button"
                onClick={handleClickUpdatePassword}
                className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Reset Password
              </button>
              <button
                type="button"
                onClick={handleDeleteProfile}
                className="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              >
                Delete Profile
              </button>
              {showUpdatePassword && (
                <Transition.Root show={showUpdatePassword} as={Fragment}>
                  <Dialog className="fixed inset-0 overflow-hidden" onClose={handleCloseUpdatePassword}>
                    {/* Overlay */}
                    <Transition.Child as={Fragment} enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
                      <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                    </Transition.Child>

                    {/* Dialog Content */}
                    <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-500 sm:duration-700" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leaveFrom="translate-x-0" leaveTo="translate-x-full">
                      <div className="absolute inset-0 overflow-hidden">
                        <div className="flex justify-end pt-4 pr-4">
                          <button type="button" className="text-gray-300 hover:text-white focus:outline-none" onClick={handleCloseUpdatePassword}>
                            <XMarkIcon className="h-10 w-10" aria-hidden="true" />
                          </button>
                        </div>
                        <div className="flex h-fit flex-col bg-white py-6 shadow-xl max-w-screen-md mx-auto p-10 rounded-md">
                          <h2 className="text-2xl font-semibold mb-4">Update Password</h2>
                          <form onSubmit={handleSavePassword} className="w-full max-w-sm">
                            <div className="flex flex-col mb-4">
                              <label htmlFor="newPassword" className="text-gray-700">
                                New Password
                              </label>
                              <input type="password" id="newPassword" name="newPassword" className="border-gray-300 border rounded-md px-3 py-2 mt-1" value={passwordData.newPassword} onChange={(e) => setPasswordData({ ...passwordData, newPassword: e.target.value })} />
                            </div>
                            <div className="flex flex-col mb-4">
                              <label htmlFor="confirmPassword" className="text-gray-700">
                                Confirm New Password
                              </label>
                              <input type="password" id="confirmPassword" name="confirmPassword" className="border-gray-300 border rounded-md px-3 py-2 mt-1" value={passwordData.confirmPassword} onChange={(e) => setPasswordData({ ...passwordData, confirmPassword: e.target.value })} />
                            </div>
                            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-md transition duration-300">
                              Update Password
                            </button>
                          </form>
                        </div>
                      </div>
                    </Transition.Child>
                  </Dialog>
                </Transition.Root>
              )}
            </div>
          </div>
        </div>
        {/* Update Profile Slide Over */}
        <Transition.Root show={showUpdateProfile} as={Fragment}>
          <Dialog className="fixed inset-0 overflow-hidden" onClose={handleCloseUpdateProfile}>
            <Transition.Child as={Fragment} enter="ease-in-out duration-500" enterFrom="opacity-0" enterTo="opacity-100" leave="ease-in-out duration-500" leaveFrom="opacity-100" leaveTo="opacity-0">
              <Dialog.Overlay className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <Transition.Child as={Fragment} enter="transform transition ease-in-out duration-500 sm:duration-700" enterFrom="translate-x-full" enterTo="translate-x-0" leave="transform transition ease-in-out duration-500 sm:duration-700" leaveFrom="translate-x-0" leaveTo="translate-x-full">
              <div className="absolute inset-0 overflow-hidden">
                <div className="flex justify-end pt-4 pr-4">
                  <button type="button" className="text-gray-300 hover:text-white focus:outline-none" onClick={handleCloseUpdateProfile}>
                    <XMarkIcon className="h-10 w-10" aria-hidden="true" />
                  </button>
                </div>
                <div className="flex h-fit flex-col bg-white py-6 shadow-xl max-w-screen-md mx-auto">
                  <div className="px-4 sm:px-6">
                    <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">Update Profile</Dialog.Title>
                  </div>
                  <div className="relative mt-6 flex-1 px-4 sm:px-6">
                    {/* profile update form */}
                    <form onSubmit={handleSaveProfile}>
                      <div className="space-y-12 ">
                        <div className="border-2 p-5 border-gray-900/10 rounded-md shadow-md">
                          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                            <div className="sm:col-span-3">
                              <label htmlFor="firstName" className="block text-sm font-medium leading-6 text-gray-900">
                                First name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="firstName"
                                  id="firstName"
                                  autoComplete="given-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  value={userData?.firstName || ''}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label htmlFor="lastName" className="block text-sm font-medium leading-6 text-gray-900">
                                Last name
                              </label>
                              <div className="mt-2">
                                <input
                                  type="text"
                                  name="lastName"
                                  id="lastName"
                                  autoComplete="family-name"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  value={userData?.lastName || ''}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-4">
                              <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                              </label>
                              <div className="mt-2">
                                <input
                                  id="email"
                                  name="email"
                                  type="email"
                                  autoComplete="email"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  value={userData?.email || ''}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>

                            <div className="sm:col-span-3">
                              <label htmlFor="mobileNumber" className="block text-sm font-medium leading-6 text-gray-900">
                                Mobile Number
                              </label>
                              <div className="mt-2">
                                <input
                                  id="mobileNumber"
                                  name="mobileNumber"
                                  type="tel"
                                  autoComplete="mobileNumber"
                                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                  value={userData?.mobileNumber || ''}
                                  onChange={handleInputChange}
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="mt-6 flex items-center justify-end gap-x-6">
                        <button type="button" onClick={handleCloseUpdateProfile} className="leading-6 text-gray-900 font-medium rounded-lg text-sm  py-2.5 text-center me-2 mb-2">
                          Cancel
                        </button>
                        <button type="submit" className="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
                          Save
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </Dialog>
        </Transition.Root>
      </Layout>
    </div>
  )
}
