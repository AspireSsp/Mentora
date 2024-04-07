import React, { useEffect, useState } from 'react'
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
    Stack,
  } from '@chakra-ui/react'
import { UserState } from '../../../context/user';
import { patch } from '../../../api/apis';

const EditAbout = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user, setUser } = UserState();

    const [gender, setGender] = useState("")
    const [mobile, setMobile] = useState("")
    const [email, setEmail] = useState("")
    const [address, setAddress] = useState("")
    const [age, setAge] = useState("")

    useEffect(() => {
        if (user) {
            setGender(user.gender || "");
            setMobile(user.mobile || "");
            setEmail(user.email || "");
            setAddress(user.address || "");
            setAge(user.age || "");
        }
    }, [user])
    
    const updateProfile = async()=>{
        const body = {gender, mobile, email, address, age}
        console.log(body);
        const res = await patch('user/mentor/update', body);
        console.log(res);
        onClose();
    }

    return (
        <>
            <Button colorScheme='blue' onClick={onOpen}> Edit</Button>
    
            <Modal isOpen={isOpen} onClose={onClose} size={"2xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Edit About Details</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                    <div class="max-w-md mx-auto">
                        <form class="bg-white rounded mb-4">
                           
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="gender">
                                    Gender
                                </label>
                                <input value={gender} onChange={(e)=>{setGender(e.target.value)}} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="gender" type="text" placeholder="Female" />
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="contactNo">
                                    Contact No.
                                </label>
                                <input value={mobile} onChange={(e)=>{setMobile(e.target.value)}} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="contactNo" type="text" placeholder="+11 998001001" />
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="currentAddress">
                                    Address
                                </label>
                                <textarea value={address} onChange={(e)=>{setAddress(e.target.value)}} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="currentAddress" placeholder="Beech Creek, PA, Pennsylvania"></textarea>
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="email">
                                    Email
                                </label>
                                <input value={email} onChange={(e)=>{setEmail(e.target.value)}} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="email" type="email" placeholder="jane@example.com" />
                            </div>
                            <div class="mb-4">
                                <label class="block text-gray-700 text-sm font-bold mb-2" for="birthday">
                                    Age
                                </label>
                                <input value={age} onChange={(e)=>{setAge(e.target.value)}} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="birthday" type="text" placeholder="63" />
                            </div>
                        </form>
                    </div>

                    </ModalBody>
        
                    <ModalFooter>
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
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )    
}

export default EditAbout
