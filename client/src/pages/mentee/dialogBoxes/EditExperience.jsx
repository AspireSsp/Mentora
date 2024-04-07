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
} from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { FaPencil } from "react-icons/fa6";
import { patch, post } from '../../../api/apis';
import axios from 'axios'
import { UserState } from '../../../context/user';


const EditExperience = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const fileInputRef = useRef(null);
    const { user, setUser } = UserState();

    const [name, setName] = useState("" );
    const [title, setTitle] = useState("");
    const [bio, setBio] = useState("");
    const [pic, setPic] = useState("");
    const [selectedFile, setSelectedFile] = useState();


    useEffect(() => {
        if (user) {
            setName(user.name || "");
            setTitle(user.title || "");
            setBio(user.bio || "");
            setPic(user.pic || "");
        }
    }, [user])
    
    const updateProfile = async()=>{
        const image = await uploadImage();
        console.log(selectedFile);
        const body = {pic: image, bio, title, name}
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
            <Button colorScheme='blue' onClick={onOpen}> Edit</Button>
            <Modal isOpen={isOpen} onClose={onClose} >
                <ModalOverlay />
                <ModalContent>

                    <ModalBody>
                  
                        
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )  
}

export default EditExperience