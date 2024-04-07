import React, { useEffect, useRef, useState } from 'react'
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    useDisclosure,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Heading,
    Input,
    Stack,
    useColorModeValue,
    HStack,
    Avatar,
    AvatarBadge,
    IconButton,
    Center,
    Select,
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { FaPencil } from "react-icons/fa6";
import { patch, post } from '../../../api/apis';
import axios from 'axios'
import { UserState } from '../../../context/user';


const EditProfile = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const fileInputRef = useRef(null);
    const { user, setUser } = UserState();

    const [name, setName] = useState("" );
    const [title, setTitle] = useState("");
    const [bio, setBio] = useState("");
    const [pic, setPic] = useState("");
    const [active, setActive] = useState(false);
    const [selectedFile, setSelectedFile] = useState();


    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setTitle(user.title || "");
            setBio(user.bio || "");
            setPic(user.pic || "");
            setActive(user.active || false);
        }
    }, [user])
    
    const updateProfile = async()=>{
        let body;
        if(selectedFile){
            const image = await uploadImage();
            body = {pic:image, bio, title, name, active}
        }else{
            body = {bio, title, name, active}
        }
        console.log(body);
        const res = await patch('user/mentor/update', body);
        console.log(res);
        onClose();
    }
    const uploadImage = async()=>{
        const data = new FormData()
        data.append("file", selectedFile)
        data.append("upload_preset", "ph3rhj89")
        data.append("cloud_name","dujbzodhr")
        const res = await axios.post("https://api.cloudinary.com/v1_1/dujbzodhr/auto/upload", data);
        return res.data.url;
    }
    const handleButtonClick = () => {
        fileInputRef.current.click();
    };
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0])
        const imgUrl = window.URL.createObjectURL(event.target.files[0]);
        setPic(imgUrl)
    };

    return (
        <>
            <Button mt={2} colorScheme='blue' onClick={onOpen}> Edit</Button>
    
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>
                    {/* <ModalHeader>Edit About Details</ModalHeader>
                    <ModalCloseButton /> */}
                    <ModalBody>
                  
                        <Stack
                            spacing={4}
                            w={'full'}
                            maxW={'md'}
                            bg={useColorModeValue('white', 'gray.700')}
                            rounded={'xl'}
                            p={6}
                            >
                            <Heading lineHeight={1.1} fontSize={{ base: '2xl', sm: '3xl' }}>
                            User Profile Edit
                            </Heading>
                            <FormControl id="userName">
                            <FormLabel>User Icon</FormLabel>
                            <Stack direction={['column', 'row']} spacing={6}>
                                <Center>
                                <Avatar size="xl" src={pic}>
                                    <AvatarBadge
                                    as={IconButton}
                                    size="sm"
                                    rounded="full"
                                    top="-10px"
                                    colorScheme="red"
                                    aria-label="remove Image"
                                    icon={<SmallCloseIcon />}
                                    />
                                </Avatar>
                                </Center>
                                <Center w="full">
                                <div>
                                <input
                                    type="file"
                                    ref={fileInputRef}
                                    style={{ display: 'none' }}
                                    onChange={handleFileChange}
                                />
                                </div>
                                <Button w="full" onClick={handleButtonClick}>Change Image</Button>
                                </Center>
                            </Stack>
                            </FormControl>
                            <FormControl id="userName" isRequired>
                            <FormLabel>Name</FormLabel>
                            <Input
                                onChange={(e)=>{setName(e.target.value)}}
                                value={name}
                                placeholder="UserName"
                                _placeholder={{ color: 'gray.500' }}
                                type="text"
                            />
                            </FormControl>
                            <FormControl id="title" isRequired>
                            <FormLabel>Title</FormLabel>
                            <Input
                                onChange={(e)=>{setTitle(e.target.value)}}
                                value={title}
                                placeholder="Full stack developr."
                                _placeholder={{ color: 'gray.500' }}
                                type="text"
                            />
                            </FormControl>
                            <FormControl id="bio" isRequired>
                                <FormLabel>Status</FormLabel>
                                <Select value={active} onChange={(e)=>{setActive(e.target.value)}}>
                                    <option value="true">True</option>
                                    <option value="false">False</option>
                                </Select>
                            </FormControl>
                            <FormControl id="bio" isRequired>
                            <FormLabel>Bio</FormLabel>
                            <Input
                                onChange={(e)=>{setBio(e.target.value)}}
                                value={bio}
                                placeholder="Bio"
                                _placeholder={{ color: 'gray.500' }}
                                type="text"
                            />
                            </FormControl>
                            <Stack spacing={6} direction={['column', 'row']}>
                            <Button
                                onClick={onClose}
                                bg={'red.400'}
                                color={'white'}
                                w="full"
                                _hover={{
                                bg: 'red.500',
                                }}>
                                Cancel
                            </Button>
                            <Button
                            onClick={updateProfile}
                                bg={'blue.400'}
                                color={'white'}
                                w="full"
                                _hover={{
                                bg: 'blue.500',
                                }}>
                                Submit
                            </Button>
                            </Stack>
                        </Stack>
                        
                    </ModalBody>
        
                </ModalContent>
            </Modal>
        </>
    )  
}

export default EditProfile
