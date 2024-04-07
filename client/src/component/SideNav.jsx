'use client'

import {
  IconButton,
  Avatar,
  Box,
  CloseButton,
  Flex,
  HStack,
  VStack,
  Icon,
  useColorModeValue,
  Text,
  Drawer,
  DrawerContent,
  useDisclosure,
  BoxProps,
  FlexProps,
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
  useToast,
  Image,
  Button,

} from '@chakra-ui/react'
import {
  FiHome,
  FiTrendingUp,
  FiCompass,
  FiStar,
  FiSettings,
  FiMenu,
  FiBell,
  FiUser,
  FiUsers,
  FiChevronDown,
} from 'react-icons/fi'
import { IconType } from 'react-icons'
import { Outlet, Link } from 'react-router-dom';
import { MdPayment } from "react-icons/md";
import { useEffect } from 'react';
import { baseUrl } from '../api/apis';
import { UserState } from '../context/user';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import logo from "../assets/Mentora-logo.png"


const LinkItems = [
  { name: 'Home', icon: FiHome, link: '/mentor' },
  { name: 'Profile', icon: FiUser, link: 'profile' },
  { name: 'Clients', icon: FiUsers, link: 'clients' },
  { name: 'Payments', icon: MdPayment, link: 'payments' },
  { name: 'Reviews', icon: FiStar, link: 'reviews' },

]

const SidebarContent = ({ onClose, user, ...rest }) => {
  const navigate = useNavigate();
  const logout =()=>{
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate(`/login`)
  }
  return (
    <Box
      transition="3s ease"
      bg={useColorModeValue('white', 'gray.900')}
      borderRight="1px"
      borderRightColor={useColorModeValue('gray.200', 'gray.700')}
      w={{ base: 'full', md: 60 }}
      pos="fixed"
      h="full"
      {...rest}>
      <Flex h="20" alignItems="center" mx="8" justifyContent="space-between">
      <Image src={logo} alt="Mentora Logo" width={250} onClick={()=>navigate('/')} cursor='pointer' />

        <CloseButton display={{ base: 'flex', md: 'none' }} onClick={onClose} />
      </Flex>
      {LinkItems.map((link) => (
        <NavItem key={link.name} icon={link.icon} link={link.link}>
         
            {link.name}
        
        </NavItem>
      ))}
    </Box>
  )
}

const NavItem = ({ icon,link, children, ...rest }) => {

  const logout =()=>{
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate(`/login`)
  }
  return (
    <Box
      as="a"
      href="#"
      style={{ textDecoration: 'none' }}
      _focus={{ boxShadow: 'none' }}>
      <Link to={link}>
        <Flex
          align="center"
          p="4"
          mx="4"
          borderRadius="lg"
          role="group"
          cursor="pointer"
          _hover={{
            bg: 'cyan.400',
            color: 'white',
          }}
          {...rest}>
          {icon && (
            <Icon
              mr="4"
              fontSize="16"
              _groupHover={{
                color: 'white',
              }}
              as={icon}
            />
          )}
          {children}
        </Flex>
      </Link>
    </Box>
  )
}

const MobileNav = ({ onOpen, user, ...rest }) => {
  const navigate = useNavigate();
  const logout =()=>{
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate(`/login`)
  }
  return (
    <Flex
      ml={{ base: 0, md: 60 }}
      px={{ base: 4, md: 4 }}
      height="20"
      alignItems="center"
      bg={useColorModeValue('white', 'gray.900')}
      borderBottomWidth="1px"
      borderBottomColor={useColorModeValue('gray.200', 'gray.700')}
      justifyContent={{ base: 'space-between', md: 'flex-end' }}
      {...rest}>
      <IconButton
        display={{ base: 'flex', md: 'none' }}
        onClick={onOpen}
        variant="outline"
        aria-label="open menu"
        icon={<FiMenu />}
      />

<Image display={{ base: 'flex', md: 'none' }} src={logo} alt="Mentora Logo" width={250} onClick={()=>navigate('/')} cursor='pointer' />


      <HStack spacing={{ base: '0', md: '6' }}>
        <Flex alignItems={'center'}>
          <Menu>
            <Button onClick={logout}>
              Logout
            </Button>
            <MenuButton py={2} transition="all 0.3s" _focus={{ boxShadow: 'none' }}>
              <HStack pr={6} >
                <Avatar
                  size={'sm'}
                  src={
                    user?.pic
                  }
                />
                <VStack
                  display={{ base: 'none', md: 'flex' }}
                  alignItems="flex-start"
                  spacing="1px"
                  ml="2">
                  <Text fontSize="sm">{user?.name}</Text>
                  <Text fontSize="xs" color="gray.600">
                    Mentor
                  </Text>
                </VStack>
                
              </HStack>
            </MenuButton>
            
          </Menu>
        </Flex>
      </HStack>
    </Flex>
  )
}

const SidebarWithHeader = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
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
          console.log(res.data.user);
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
  }, [])
  
  return (
    <Box minH="100vh" bg={useColorModeValue('gray.100', 'gray.900')}>
      <SidebarContent onClose={() => onClose} display={{ base: 'none', md: 'block' }} />
      <Drawer
        isOpen={isOpen}
        placement="left"
        onClose={onClose}
        returnFocusOnClose={false}
        onOverlayClick={onClose}
        size="full">
        <DrawerContent>
          <SidebarContent user={user} onClose={onClose} />
        </DrawerContent>
      </Drawer>
      {/* mobilenav */}
      <MobileNav onOpen={onOpen} user={user} />
      <Box ml={{ base: 0, md: 60 }} p="4">
        <Outlet />
      </Box>
    </Box>
  )
}

export default SidebarWithHeader