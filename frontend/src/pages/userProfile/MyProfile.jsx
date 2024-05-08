import React, { useState, useEffect, Fragment } from 'react'
import Navbar from '../../components/layout/header/Navbar'
import axios from 'axios'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'
import { PhotoIcon, UserCircleIcon } from '@heroicons/react/24/solid'

export default function MyProfile() {
  const userId = localStorage.getItem('userId')
  const [userData, setUserData] = useState(null)
  const [showUpdateProfile, setShowUpdateProfile] = useState(false)

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

  const handleClickUpdateProfile = () => {
    setShowUpdateProfile(true)
  }

  const handleCloseUpdateProfile = () => {
    setShowUpdateProfile(false)
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
              class="text-white bg-gradient-to-r from-blue-500 via-blue-600 to-blue-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
            >
              Update Profile
            </button>
            <button type="button" class="text-white bg-gradient-to-r from-red-400 via-red-500 to-red-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2">
              Delete Profile
            </button>
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
              <div className="flex h-fit flex-col overflow-y-scroll bg-white py-6 shadow-xl max-w-screen-md mx-auto">
                <div className="px-4 sm:px-6">
                  <Dialog.Title className="text-base font-semibold leading-6 text-gray-900">Update Profile</Dialog.Title>
                </div>
                <div className="relative mt-6 flex-1 px-4 sm:px-6">
                  {/* profile update form */}
                  <form>
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
                                name="first-name"
                                id="first-name"
                                autoComplete="given-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                name="last-name"
                                id="last-name"
                                autoComplete="family-name"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                type="mobileNumber"
                                autoComplete="mobileNumber"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2 sm:col-start-1">
                            <label htmlFor="city" className="block text-sm font-medium leading-6 text-gray-900">
                              City
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="city"
                                id="city"
                                autoComplete="address-level2"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label htmlFor="region" className="block text-sm font-medium leading-6 text-gray-900">
                              State / Province
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="region"
                                id="region"
                                autoComplete="address-level1"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>

                          <div className="sm:col-span-2">
                            <label htmlFor="postal-code" className="block text-sm font-medium leading-6 text-gray-900">
                              ZIP / Postal code
                            </label>
                            <div className="mt-2">
                              <input
                                type="text"
                                name="postal-code"
                                id="postal-code"
                                autoComplete="postal-code"
                                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex items-center justify-end gap-x-6">
                      <button type="button" className="text-sm font-semibold leading-6 text-gray-900">
                        Cancel
                      </button>
                      <button type="submit" className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
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
