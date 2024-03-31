import React, { useEffect } from 'react'
import { UserState } from '../../context/user';
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { baseUrl } from "../../apis";
import { useToast } from '@chakra-ui/react'
import Post from '../../component/Post';
const Home = () => {
  const { user, setUser } = UserState();
  const toast = useToast()
  const navigate = useNavigate()
  const getUSer = async()=>{
    const tkn = sessionStorage.getItem('token') || localStorage.getItem('token')
    const token = JSON.parse(tkn);
    console.log(token);
    if(!token){
      navigate('/login')
    }else{
      try {
        const res = await axios.get(baseUrl+'user/get', {
          headers: {
            Authorization: `Bearer ${token}`,
          }});
        console.log(res); 
        if(res.status===200){
          setUser(res.data.user);
        } 
      } catch (error) {
        navigate('/login');
        toast({
          title: 'Error Occured',
          description: 'your token is expired please login again',
          status: 'error',
          duration: 5000,
          isClosable: true,
        })
      }
    }
  }
  useEffect(() => {
    getUSer();
  }, [user])
  
  return (
    <div>
        <Post />
    </div>
  )
}

export default Home