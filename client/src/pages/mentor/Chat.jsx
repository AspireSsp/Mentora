import React, { useEffect, useState } from 'react'
import { UserState } from '../../context/user';
import { get } from '../../api/apis';
import RightChat from '../../component/RightChat';
import LeftChat from '../../component/LeftChat';
import  io  from "socket.io-client";

// var socket = io('https://yourDomain:8000');
const ENDPOINT = "http://localhost:8000"; // "https://talk-a-tive.herokuapp.com"; -> After deployment
var socket, selectedChatCompare;

const Chat = () => {
    const { user } = UserState();
    const [users, setUsers] = useState([]);
    const [chatId, setChatId] = useState("");
    const [input, setInput] = useState("");
    console.log(chatId);
    const [messages, setMessages] = useState([]);


    const getAllChats = async()=>{
        const res = await get('chat/getmychat');
        console.log(res);
        setUsers(res.data.chats);
    }

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
            chat: chatId._id,
        }
        console.log("message body--", message);
        socket.emit("new message", message);
        setMessages((prevMessages) => [...prevMessages, message]);
        setInput('');
    };
    
    useEffect(() => {
        getAllChats();
    }, [])
    

    const getMessages = async()=>{
        if(chatId!==""){
            const res = await get(`message/chat/${chatId._id}`);
            console.log(res?.data?.messages);
            setMessages(res?.data?.messages)
        }
    }

    useEffect(() => {
        getMessages();
    }, [chatId])
    

    return (
        <div>
            <div className='h-[calc(100vh-115px)]  w-[100%] flex'>
                <div className='w-[30%] h-[100%] border-2 rounded-lg bg-white'>
                    <div className='h-12 p-3  rounded-t-lg border-b-2'>
                        <h2 className='font-bold text-xl'>Your Clients</h2>
                    </div>
                    <div>
                        {
                           users.length>0 && users.map((user, index)=>(
                                <div key={index} onClick={()=>{setChatId(user)}} class="flex items-center my-2 cursor-pointer hover:bg-gray-100 p-2 rounded-md border-b">
                                    <div class="w-12 h-12 rounded-full mr-3">
                                        <img src={user?.menteeId?.pic} alt="User Avatar" class="w-12 h-12 rounded-full" />
                                    </div>
                                    <div class="flex-1">
                                        <h2 class="text-lg font-semibold">{user?.menteeId?.name}</h2>
                                        {/* <p class="text-gray-600">{user.lastMsg}</p> */}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className='w-[70%] h-[100%] bg-white border-2 rounded-lg flex flex-col'>
                    <div className='h-12 p-3 rounded-t-lg border-b-2'>
                        <h2 className='font-bold text-xl'>{chatId?.menteeId?.name}</h2>
                    </div>
                    <div className='flex-grow overflow-y-scroll p-3'>
                        
                        {
                            messages.map((message, index) => (
                                (message?.sender === user._id) ? 
                                    <RightChat key={index} pic={user?.pic} message={message?.content}/> 
                                : 
                                    <LeftChat key={index} pic={chatId?.menteeId?.pic} message={message?.content} />
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

