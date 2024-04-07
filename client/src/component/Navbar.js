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

const Links = ["Dashboard", "Projects", "Team"];

const NavLink = (props) => {
  const { children } = props;
  return (
    <Box
      as="a"
      px={2}
      py={1}
      rounded={"md"}
      _hover={{
        textDecoration: "none",
        bg: useColorModeValue("gray.200", "gray.700"),
      }}
      href={"#"}
    >
      {children}
    </Box>
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
          } else if (res.data.user.role === "Mentee") {
            navigate("/mentee");
          } else {
            console.log("Inavlid Role");
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
          <HStack spacing={8} alignItems={"center"}>
          <Image src={logo} alt="Mentora Logo" width={250} />
            <HStack
              as={"nav"}
              spacing={4}
              display={{ base: "none", md: "flex" }}
            >
              {Links.map((link) => (
                <NavLink key={link}>{link}</NavLink>
              ))}
            </HStack>
          </HStack>
          <Flex alignItems={"center"}>
            <Button variant={"solid"} colorScheme={"teal"} size={"sm"} mr={4}>
              {user?.userName}
            </Button>
            <Menu>
              <MenuButton
                as={Button}
                rounded={"full"}
                variant={"link"}
                cursor={"pointer"}
                minW={0}
              >
                <Avatar
                  size={"sm"}
                  src={
                    "https://images.unsplash.com/photo-1493666438817-866a91353ca9?ixlib=rb-0.3.5&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&s=b616b2c5b373a80ffc9636ba24f7a4a9"
                  }
                />
              </MenuButton>
              <MenuList>
              <Link to={`/mentee/profile`}> {/* Use Link component */}
        <MenuItem>Profile</MenuItem>
      </Link>                <MenuItem>Link 2</MenuItem>
                <MenuDivider />
                <MenuItem>Link 3</MenuItem>
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
