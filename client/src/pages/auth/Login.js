import React, { useState } from 'react';
import {
  Button,
  Checkbox,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Image,
  useToast
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { baseUrl } from '../../api/apis';
import { CircularProgress } from '@chakra-ui/react'

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check, setCheck] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    setIsLoading(true)
    e.preventDefault(); 
    try {
      const body = {
        email,
        password,
        check
      };
      const res = await axios.post(baseUrl + "user/login", body);
      console.log(res);
      if (res.status === 200) {
        setEmail('');
        setPassword('');
        navigate(`/${res.data.user.role}/profile`);
        toast({
          title: 'Login Success.',
          description: "You've logged in your account successfully",
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        if (check) {
          localStorage.setItem('token', JSON.stringify(res.data.token));
          sessionStorage.removeItem('token');
        } else {
          sessionStorage.setItem('token', JSON.stringify(res.data.token));
          localStorage.removeItem('token');
        }
      }
    } catch (error) {
      toast({
        title: 'Error Occurred',
        description: error.response.data.message,
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }finally{
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}> {/* Use form tag and onSubmit event */}
      <Stack minH={'100vh'} direction={{ base: 'column', md: 'row' }}>
        <Flex p={8} flex={1} align={'center'} justify={'center'}>
          <Stack spacing={4} w={'full'} maxW={'md'}>
            <Heading fontSize={'2xl'}>Sign in to your account</Heading>
            <FormControl id="email">
              <FormLabel>Email address</FormLabel>
              <Input value={email} type="email" onChange={(e) => setEmail(e.target.value)} />
            </FormControl>
            <FormControl id="password">
              <FormLabel>Password</FormLabel>
              <Input value={password} type="password" onChange={(e) => setPassword(e.target.value)} />
            </FormControl>
            <Stack spacing={6}>
              <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox isChecked={check} onChange={() => setCheck(!check)} >Remember me</Checkbox>
                <Text color={'blue.500'}>Forgot password?</Text>
              </Stack>
              <Stack spacing={10} pt={2}>
              <Button
                isLoading={isLoading} 
                loadingText="Logging In..." 
                onClick={handleSubmit}
                size="lg"
                bg={"blue.400"}
                color={"white"}
                colorScheme={'blue'}
                 variant={'solid'} 
                 type="submit"
                _hover={{
                  bg: "blue.500",
                }}
              >
                {isLoading ? ( 
                  <CircularProgress isIndeterminate color="green.300" />
                ) : (
                  "Login"
                )}
              </Button>
            </Stack>
              <Stack pt={6}>
                <Text align={'center'}>
                  Not a user? <Link to={'/sign-up'} color={'blue.400'}>Create New Account</Link>
                </Text>
              </Stack>
            </Stack>
          </Stack>
        </Flex>
        <Flex flex={1}>
          <Image
            alt={'Login Image'}
            objectFit={'cover'}
            src={
              'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1352&q=80'
            }
          />
        </Flex>
      </Stack>
    </form>
  )
}

export default Login;
