import React, { useEffect, useState } from 'react'
import EditAbout from './dialogBoxes/EditAbout'
import EditProfile from './dialogBoxes/EditProfile'
import { formatDate } from '../../utills/formateDate';
import EditExperience from './dialogBoxes/EditExperience';
import { useParams } from 'react-router-dom';
import { get } from '../../api/apis';
import StarRating from '../../component/StarRating';
import { Link, useNavigate } from 'react-router-dom';
import { UserState } from '../../context/user';
import StartChat from './alerts/StartChat';

const ProfileMentor = () => {
    const { user, setUser } = UserState();
    const [mentor, setMentor] = useState("");
    const { id } = useParams();
    const navigate = useNavigate();

    const getMentorDetails = async ()=>{
        const res = await get(`user/mentor/${id}`);
        console.log("mentore----", res);
        setMentor(res?.data?.mentor);
    }

    const calculateAverageRating = (ratings) => {
        if (!Array.isArray(ratings) || ratings.length === 0) {
          return 0; // Return 0 if the ratings array is empty or not provided
        }
        const totalRating = ratings.reduce((acc, curr) => acc + curr.rating, 0);
        const averageRating = totalRating / ratings.length;
      
        return averageRating.toFixed(1);
    };

    const startChat = ()=>{
        
    }

    useEffect(() => {
        getMentorDetails();
    }, [])
    
    return (
        <div >
            <div class="bg-gray-100"  >
                <div class="container mx-auto my-5 p-5">
                    <div class="md:flex no-wrap md:-mx-2 ">
                        <div class="w-full md:w-3/12 md:mx-2">
                            <div class="bg-white p-3 border-t-4 border-green-400">
                                <div class="image overflow-hidden">
                                    <img class="h-auto w-full mx-auto"
                                        src={mentor?.pic}
                                        alt="" />
                                </div>
                                <div className='flex justify-between'>
                                    <h1 class="text-gray-900 font-bold text-xl leading-8 my-1">{mentor?.name}</h1>
                                    <div className='flex items-center p-2 justify-between'>
                                        <StarRating rating={calculateAverageRating(mentor?.ratings)} />
                                        <p className='ms-2'>
                                            {calculateAverageRating(mentor?.ratings)}
                                        </p>
                                    </div>
                                </div>
                                <h3 class="text-gray-600 font-lg text-semibold leading-6">{mentor?.title}</h3>
                                <p class="text-sm text-gray-500 hover:text-gray-600 leading-6">{mentor?.bio}</p>
                                <ul
                                    class="bg-gray-100 text-gray-600 hover:text-gray-700 hover:shadow py-2 px-3 mt-3 divide-y rounded shadow-sm">
                                    <li class="flex items-center py-3">
                                        <span>Status</span>
                                        <span class="ml-auto">
                                            {
                                                mentor?.active ? 
                                                    <span class="bg-green-500 py-1 px-2 rounded text-white text-sm">Active</span>
                                                    :
                                                    <span class="bg-gray-500 py-1 px-2 rounded text-white text-sm">In Active</span>
                                            }
                                        </span>
                                    </li>
                                    <li class="flex items-center py-3">
                                        <span>Member since</span>
                                        <span class="ml-auto">{formatDate(mentor?.createdAt)}</span>
                                    </li>
                                </ul>
                                <div className='mt-2'>
                                    <StartChat startChat={startChat} user={user} mentor={mentor} />
                                </div>
                            </div>
                        </div>
                        <div class="w-full md:w-9/12 mx-2 h-64">
    <div class="bg-white p-3 shadow-sm rounded-sm">
        <div class="flex justify-end">
            {/* <button className='bg-blue-500 border rounded-lg px-4 py-2 text-white font-medium'>Edit</button> */}
            {/* <EditAbout mentor={mentor} /> */}
        </div>
        <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8" style="font-size: calc(14px + 4px);">
            <span clas="text-green-500">
                <svg class="h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                    stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
            </span>
            <span class="tracking-wide">About</span>
        </div>
        <div class="text-gray-700" style="font-size: calc(14px + 4px);">
            <div class="grid md:grid-cols-2 text-sm">
                <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">First Name</div>
                    <div class="px-4 py-2">{mentor?.name?.split(" ")[0]}</div>
                </div>
                <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Last Name</div>
                    <div class="px-4 py-2">{mentor?.name?.split(" ")[1]}</div>
                </div>
                <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Gender</div>
                    <div class="px-4 py-2">{mentor?.gender}</div>
                </div>
                <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Contact No.</div>
                    <div class="px-4 py-2">{mentor?.mobile}</div>
                </div>
                <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Address</div>
                    <div class="px-4 py-2">{ mentor?.address}</div>
                </div>

                <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Email.</div>
                    <div class="px-4 py-2">
                        <a class="text-blue-800" href="mailto:jane@example.com">{mentor?.email}</a>
                    </div>
                </div>
                <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold">Age</div>
                    <div class="px-4 py-2">{mentor?.age}</div>
                </div>
                <div class="grid grid-cols-2">
                    <div class="px-4 py-2 font-semibold text-green-600">Charges/Min</div>
                    <div class="px-4 py-2 text-green-600"> ₹ {mentor?.chargesPerMin}/-</div>
                </div>
            </div>
        </div>
        <button
            class="block w-full text-blue-800 text-sm font-semibold rounded-lg hover:bg-gray-100 focus:outline-none focus:shadow-outline focus:bg-gray-100 hover:shadow-xs p-3 my-4">Show
            Full Information
        </button>
    </div>

    <div class="my-4"></div>
    {/* Experience section */}
    <div class="bg-white p-3 shadow-sm rounded-sm">

        <div className='flex justify-end'>
            {/* <EditExperience /> */}
        </div>
        <div class="grid grid-cols-2">
            <div>
                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3"
                    style="font-size: calc(14px + 4px);">
                    <span clas="text-green-500">
                        <svg class="h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                    </span>
                    <span class="tracking-wide">Experience</span>
                </div>
                <ul class="list-inside space-y-2">
                    {
                        mentor?.experience && mentor?.experience.map((experience, index)=>(
                            <li key={index}>
                                <div class="text-teal-600">{experience?.role} at {experience?.company}</div>
                                <div class="text-gray-500 text-xs">{formatDate(experience?.startDate)} to {formatDate(experience?.endDate)}</div>
                            </li>
                        ))
                    }
                    
                </ul>
            </div>
            <div>
                <div class="flex items-center space-x-2 font-semibold text-gray-900 leading-8 mb-3"
                    style="font-size: calc(14px + 4px);">
                    <span clas="text-green-500">
                        <svg class="h-9" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path fill="#fff" d="M12 14l9-5-9-5-9 5 9 5z" />
                            <path fill="#fff"
                                d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222" />
                        </svg>
                    </span>
                    <span class="tracking-wide">Education</span>
                </div>
                <ul class="list-inside space-y-2">
                    {
                        mentor?.education && mentor?.education.map((education, index)=>(
                            <li key={index}>
                                <div class="text-teal-600">{education?.degree}, {education?.field}</div>
                                <div class="text-teal-600">{education?.school}</div>
                                <div class="text-gray-500 text-xs">{formatDate(education?.startDate)} to {formatDate(education?.endDate)}</div>
                            </li>
                        ))
                    }
                </ul>
            </div>
        </div>
    </div>
    <div className='w-[100%] bg-white'>
        <div class="lg:p-10 p-6 font-[sans-serif] text-[#333]">
            <div class="mb-20 text-center flex justify-start" style="font-size: calc(18px + 4px);">
                <h2 class="text-xl font-bold">Reviews : </h2>
            </div>
            <div class="grid md:grid-cols-3 md:gap-6 max-md:gap-10 max-w-6xl mx-auto">
            {
                mentor?.ratings?.map((rating, index)=>(
                <div key={index} class="max-w-[350px] h-auto py-8 px-4 lg:px-8 rounded-md mx-auto bg-white relative">
                    <img src={rating?.userId?.pic} class="w-14 h-14 rounded-full absolute right-0 left-0 border-4 border-white shadow-xl mx-auto -top-7" />
                    <div>
                        <StarRating rating={rating.rating} />
                    </div>
                    <div class="mt-4">
                        <p class="text-sm leading-relaxed">{rating?.comment}</p>
                        <h4 class="text-base whitespace-nowrap font-extrabold mt-4">{rating?.userId?.name}</h4>
                        <p class="mt-1 text-xs text-gray-400">Founder of Rubik</p>
                    </div>
                </div>
                ))
            }
            </div>
        </div>
    </div>
</div>

                    </div>
                </div>
            </div>
        </div>
    )
}

export default ProfileMentor