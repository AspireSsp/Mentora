import {
  Box,
  Flex,
  Avatar,
  HStack,
  Text,
  IconButton,
  Button,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  MenuDivider,
  useDisclosure,
  useColorModeValue,
  Stack,
  Image
} from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon, AddIcon } from "@chakra-ui/icons";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useToast } from "@chakra-ui/react";
import { UserState } from "../context/user";
import { useEffect } from "react";
import { baseUrl } from "../api/apis";
import logo from "../assets/Mentora-logo.png"

const Links = [
    { displayName: "Home", route: "mentee" },
  { displayName: "Mentors", route: "mentors" },
];

const NavLink = ({ to, children }) => {
    return (
      <Link to={to}>
        <Box
          as="span"
          px={2}
          py={1}
          rounded="md"
          _hover={{
            textDecoration: "none",
            bg: useColorModeValue("gray.200", "gray.700"),
          }}
        >
          {children}
        </Box>
      </Link>
    );
  };

export default function WithAction() {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { user, setUser } = UserState();
  const toast = useToast();
  const navigate = useNavigate();

  useEffect(() => {
    getUSer();
  }, []);

  const getUSer = async () => {
    const tkn =
      sessionStorage.getItem("token") || localStorage.getItem("token");
    const token = JSON.parse(tkn);
    console.log(token);
    if (!token) {
      navigate("/login");
    } else {
      try {
        const res = await axios.get(baseUrl + "user/get", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        console.log(res);
        if (res.status === 200) {
          setUser(res.data.user);
          if (res.data.user.role === "Mentor") {
            navigate("/mentor");
          } 
          
        }
      } catch (error) {
        navigate("/login");
        toast({
          title: "Error Occured",
          description: "your token is expired please login again",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      }
    }
  };

  const logout =()=>{
    localStorage.removeItem('token');
    sessionStorage.removeItem('token');
    navigate(`/login`)
  }

  return (
    <>
      <Box bg={useColorModeValue("gray.100", "gray.900")} px={5} py={5}>
        <Flex h={16} alignItems={"center"} justifyContent={"space-between"}>
          <IconButton
            size={"md"}
            icon={isOpen ? <CloseIcon /> : <HamburgerIcon />}
            aria-label={"Open Menu"}
            display={{ md: "none" }}
            onClick={isOpen ? onClose : onOpen}
          />
          <HStack spacing={8} alignItems={"center"} width={'100%'} justifyContent={'space-between'} mx={8}>
          <Image src={logo} alt="Mentora Logo" width={250} onClick={()=>navigate('/')} cursor='pointer' />
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
              fontSize={'18px'}
              fontWeight={500}
            >
              {Links.map(({displayName,route}) => (
                <NavLink key={route} to={`/${route}`}>{displayName}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Text variant={"solid"} backgroundColor={"#22c55e"} color={"white"} borderRadius={10} fontWeight={500} textTransform={'capitalize'} size={"sm"} px={4} py={2} mr={4}>
              {user?.userName}
            </Text>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"md"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList fontWeight={600} fontSize={'16px'}>
              <Link to={`/mentee/profile`}> 
               <MenuItem>Profile</MenuItem>
              </Link> 
              <MenuItem>Wallet: &#8377;{user?.wallet} 
              <Button variant={"solid"} backgroundColor={"#3182ce"} color={"white"} borderRadius={5} fontWeight={500} textTransform={'capitalize'} size={"sm"} ml={4}
               style={{
                backgroundColor: '#3182ce',
                color: 'white',
                borderRadius: '5px',
                fontWeight: '500',
                textTransform: 'capitalize',
                padding: '0.5rem 1rem',
                marginLeft: '0.5rem',
                transition: 'background-color 0.3s, color 0.3s', // Transition effect
              }}
              onMouseEnter={(e) => e.target.style.backgroundColor = '#4299e1'} // Change background color on hover
              onMouseLeave={(e) => e.target.style.backgroundColor = '#3182ce'}
              onClick={()=>navigate(`/payment/${user.id}`)}
              >
              add balance
            </Button>
              </MenuItem>
              <MenuItem  onClick={()=>navigate(`/mentee/transactions`)}>Transactions</MenuItem>

                <MenuDivider />
               <MenuItem  onClick={logout}>Log out</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>

        {isOpen ? (
          <Box pb={4} display={{ md: "none" }}>
            <Stack as={"nav"} spacing={4}>
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </Stack>
          </Box>
        ) : null}
      </Box>

      <Box p={4}>
        {" "}
        <Outlet />
      </Box>
    </>
  );
}
