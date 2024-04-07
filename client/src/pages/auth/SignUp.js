import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Select,
  Checkbox
} from "@chakra-ui/react";
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import { baseUrl } from "../../api/apis";
import { CircularProgress } from '@chakra-ui/react'

  const SignUp = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const navigate = useNavigate();
  const toast = useToast();

  const handleSubmit = async () => {
    setIsLoading(true);
    try {
      if (!fname || !lname) {
        toast({
          title: "Error Occured",
          description: "first and last name is required.",
          status: "error",
          duration: 5000,
          isClosable: true,
        });
        return;
      } else {
        const body = {
          name: fname + " " + lname,
          email,
          mobile,
          password,
          role
        };
        console.log("yoo",body);
        const res = await axios.post(baseUrl + "user/register", body);
        if (res.status === 200) {
          removeValue();
          navigate(`/${role}/profile`);
          toast({       
            title: "Account created.",
            description: "We've created your account successfully",
            status: "success",
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
      }
    } catch (error) {
      console.log("my ee", error);
      toast({
        title: "Error Occured",
        description: error.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }finally{
      setIsLoading(false);
    }
  };

  const removeValue = () => {
    setFname("");
    setLname("");
    setEmail("");
    setMobile("");
    setPassword("");
    setRole("");
  };

  return (
    <Flex
      minH={"100vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
          <Text fontSize={"lg"} color={"gray.600"}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormControl id="firstName" isRequired>
                  <FormLabel>First Name</FormLabel>
                  <Input
                    type="text"
                    value={fname}
                    onChange={(e) => {
                      setFname(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Last Name</FormLabel>
                  <Input
                    type="text"
                    value={lname}
                    onChange={(e) => {
                      setLname(e.target.value);
                    }}
                  />
                </FormControl>
              </Box>
            </HStack>

            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input
                type="email"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
              />
            </FormControl>

            <FormControl id="mobile" isRequired>
              <FormLabel>Mobile</FormLabel>
              <Input
                type="number"
                value={mobile}
                onChange={(e) => {
                  setMobile(e.target.value);
                }}
              />
            </FormControl>
            <FormControl id="role" isRequired>
              <FormLabel>Role</FormLabel>
              <Stack spacing={3}>
                <Select
                  placeholder="Select role"
                  size="md"
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                >
                  <option value="mentor">Mentor</option>
                  <option value="mentee">Mentee</option>
                </Select>
              </Stack>
            </FormControl>

            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                  }}
                />
                <InputRightElement h={"full"}>
                  <Button
                    variant={"ghost"}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack
                direction={{ base: 'column', sm: 'row' }}
                align={'start'}
                justify={'space-between'}>
                <Checkbox isChecked={check} onChange={() => setCheck(!check)} >Remember me</Checkbox>
              </Stack>
            <Stack spacing={10} pt={2}>
              <Button
                isLoading={isLoading} 
                loadingText="Submitting" 
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
                  "Sign Up"
                )}
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={"center"}>
                Already a user?{" "}
                <Link to={"/login"} color={"blue.400"}>
                  Login
                </Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack>
    </Flex>
  );
};

export default SignUp;