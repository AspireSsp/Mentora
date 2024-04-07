import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { UserState } from '../../context/user';
import { get } from '../../api/apis';
import StarRating from '../../component/StarRating';
import { formatDate } from '../../utills/formateDate';
import LeftChat from '../../component/LeftChat';
import RightChat from '../../component/RightChat';
import  io  from "socket.io-client";

// var socket = io('https://yourDomain:8000');
const ENDPOINT = "http://localhost:8000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

const Chat = () => {
    const { id } = useParams();
    const { user } = UserState();
    const [mentor, setMentor] = useState("");
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState('');
    
    const getChatDetails = async () => {
        const res = await get(`chat/get/${id}`);
        setMentor(res?.data?.chat.mentorId);
        setMessages(res?.data.messages);
    };
    
    useEffect(() => {
        socket = io(ENDPOINT);
        socket.emit("setup", user);
        socket.on("connected", () => console.log("connected"));
        socket.on("typing", () => console.log("typeing"));
        socket.on("stop typing", () => console.log("stopr"));
    
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        socket.on('message-response', (message) => {
            console.log("resss------>", message);
            setMessages((prevMessages) => [...prevMessages, message]);
        });
    }, []);


    const sendMessage = () => {
        const message = {
            type: "text",
            content: input,
            sender: user?._id,
            chat: id,
        }
        console.log("message body--", message);
        socket.emit("new message", message);
        setInput('');
    };

    useEffect(() => {
        getChatDetails();
    }, []);

    const calculateAverageRating = (ratings) => {
        if (!Array.isArray(ratings) || ratings.length === 0) {
            return 0;
        }
        const totalRating = ratings.reduce((acc, curr) => acc + curr.rating, 0);
        const averageRating = totalRating / ratings.length;
        return averageRating.toFixed(1);
    };
    return (
        <div>
            <div className='h-[calc(100vh-115px)]  w-[100%] flex'>
                <div className='w-[30%] h-[100%] border-2 rounded-lg bg-white'>
                    <div className='h-12 p-3  rounded-t-lg border-b-2'>
                        <h2 className='font-bold text-xl'>Your Clients</h2>
                    </div>
                    <div class="w-full md:w-8/12 md:mx-2">
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
                        </div>
                    </div>
                </div>
                <div className='w-[70%] h-[100%] bg-white border-2 rounded-lg flex flex-col'>
                    <div className='h-12 p-3 rounded-t-lg border-b-2'>
                        <h2 className='font-bold text-xl'>{mentor?.name}</h2>
                    </div>
                    <div className='flex-grow overflow-y-scroll p-3'>
                    {
                        messages.map((message, index) => (
                            (message?.sender === user._id) ? 
                                <RightChat key={index} pic={user?.pic} message={message?.content}/> 
                            : 
                                <LeftChat key={index} pic={mentor?.pic} message={message?.content} />
                        ))
                    }
                        
                
                    </div>
                    <div className='p-3'>
                        <div class="flex items-center">
                            <input value={input} onChange={(e)=>{setInput(e.target.value)}} type="text" placeholder="Type a message..." class="w-full p-2 rounded-md border border-gray-400 focus:outline-none focus:border-blue-500" />
                            <button onClick={sendMessage} class="bg-indigo-500 text-white px-4 py-2 rounded-md ml-2">Send</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Chat
