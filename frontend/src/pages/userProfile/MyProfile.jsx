import React, { useState, useEffect, Fragment } from 'react'
import Navbar from '../../components/layout/header/Navbar'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import Swal from 'sweetalert2'

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
    // Prompt for confirmation using SweetAlert2
    const confirmation = await Swal.fire({
      title: 'Confirm Profile Update',
      text: 'Are you sure you want to update your profile?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6', // Customize confirm button color (optional)
      cancelButtonColor: '#d33', // Customize cancel button color (optional)
      confirmButtonText: 'Yes, Save',
      cancelButtonText: 'No, Cancel',
    })

    // Proceed with profile update only if confirmed
    if (confirmation.isConfirmed) {
      try {
        const response = await axios.patch(`http://localhost:8070/api/auth/user/${userId}`, userData)
        console.log(response.data)
        setShowUpdateProfile(false)
      } catch (error) {
        console.error('Error updating profile:', error)
        // Optionally display an error message to the user using SweetAlert2
        Swal.fire({
          title: 'Error!',
          text: 'There was an error updating your profile. Please try again later.',
          icon: 'error',
        })
      }
    }
  }

  const handleSavePassword = (e) => {
    e.preventDefault()

    const { newPassword, confirmPassword } = passwordData

    // Check if new password and confirm password match
    if (newPassword !== confirmPassword) {
      console.error('Passwords do not match')
      return
    }

    // Send a PATCH request to update the password
    axios
      .patch(`http://localhost:8070/api/auth/user/${userId}`, { password: newPassword })
      .then((response) => {
        console.log(response.data)
        setShowUpdatePassword(false)
      })
      .catch((error) => {
        console.error('Error updating password:', error)
      })
  }

  const handleDeleteProfile = () => {
    // Send a DELETE request to delete the user
    axios
      .delete(`http://localhost:8070/api/auth/user/${userId}`)
      .then((response) => {
        Swal.fire({
          title: 'Are you sure?',
          text: "You won't be able to revert this!",
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#3085d6',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!',
        }).then((result) => {
          if (result.isConfirmed) {
            Swal.fire({
              title: 'Deleted!',
              text: 'Your file has been deleted.',
              icon: 'success',
            })
            console.log(response.data)
            // Clear localStorage
            localStorage.removeItem('userId')
            // Redirect to login page
            window.location.href = '/login' // Replace '/login' with your actual login page UR
          }
        })
      })
      .catch((error) => {
        console.error('Error deleting user:', error)
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
    <div>
      <Navbar />
      <div className="my-10 mx-80 border-2 p-10 rounded-xl shadow-lg">
        <div className="m-2 px-5 sm:px-0 flex items-center rounded-md border shadow-sm">
          <div className="p-2">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="gray-900" className="w-16 h-16">
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div>
            <h3 className="text-base font-semibold leading-7 text-gray-900 mx-10">My Profile</h3>
          </div>
        </div>
        <div className="flex">
          <div className="m-2 px-12 py-5 rounded-md border shadow-sm">
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
          <div className="flex items-center mx-auto">
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
    </div>
  )
}