import React from 'react'
import EditAbout from './dialogBoxes/EditAbout'
import EditProfile from './dialogBoxes/EditProfile'
import { UserState } from '../../context/user';
import { formatDate } from '../../utills/formateDate';
import EditExperience from './dialogBoxes/EditExperience';

const Profile = () => {
    const { user, setUser } = UserState();
    

    return (
        <div>
            <div class="bg-gray-100">
                <div class="container mx-auto my-5 p-5">
                    <div class="md:flex no-wrap md:-mx-2 ">
                        <div class="w-full md:w-3/12 md:mx-2">
                            <div class="bg-white p-3 border-t-4 border-green-400">
                                <div class="image overflow-hidden">
                                    <img class="h-auto w-full mx-auto"
                                        src={user?.pic}
                                        alt="" />
                                </div>
                                <div className='flex justify-between'>
                                    <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{user?.name}</h1>
                                    <EditProfile user={user} />
                                </div>
                                <h3 class="text-gray-600 font-lg text-semibold leading-6">{user?.title}</h3>
                                <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">{user?.bio}</p>
                                <ul
                                    class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li class="flex items-center py-3">
                                        <span>Status</span>
                                        <span class="ml-auto"><span
                                                class="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span></span>
                                    </li>
                                    <li class="flex items-center py-3">
                                        <span>Member since</span>
                                        <span class="ml-auto">{formatDate(user?.createdAt)}</span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                        <div class="w-full md:w-9/12 mx-2 h-64">
                            <div class="bg-white p-3 shadow-sm rounded-sm">
                                <div className='flex justify-end'>
                                    {/* <button className='bg-blue-500 border rounded-lg px-4 py-2 text-white font-medium'>Edit</button> */}
                                    <EditAbout user={user} />
                                </div>
                                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8">
                                    <span clas="text-green-500">
                                        <svg class="h-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                            stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                                        </svg>
                                    </span>
                                    <span class="tracking-wide">About</span>
                                </div>
                                <div class="text-gray-700">
                                    <div class="grid md:grid-cols-2 text-sm">
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">First Name</div>
                                            <div class="px-4 py-2">{user?.name?.split(" ")[0]}</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Last Name</div>
                                            <div class="px-4 py-2">{user?.name?.split(" ")[1]}</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Gender</div>
                                            <div class="px-4 py-2">{user?.gender}</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Contact No.</div>
                                            <div class="px-4 py-2">{user?.mobile}</div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Address</div>
                                            <div class="px-4 py-2">{ user?.address}</div>
                                        </div>

                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Email.</div>
                                            <div class="px-4 py-2">
                                                <a class="text-blue-800" href="mailto:jane@example.com">{user?.email}</a>
                                            </div>
                                        </div>
                                        <div class="grid grid-cols-2">
                                            <div class="px-4 py-2 font-semibold">Age</div>
                                            <div class="px-4 py-2">45</div>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Show
                                    Full Information
                                </button>
                            </div>

                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Profile