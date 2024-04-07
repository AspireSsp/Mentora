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
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'
import { FaPencil } from "react-icons/fa6";
import { patch, post } from '../../../api/apis';
import axios from 'axios'
import { UserState } from '../../../context/user';


const EditExperience = () => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const { user, setUser } = UserState();

    const [experience, setExperience] = useState([]);
    const [education, setEducation] = useState([]);


    const handleInputChange = (index, field, value) => {
      const updateEducation = [...education];
      updateEducation[index][field] = value;
      setEducation(updateEducation);
    };
    const addNewEducation = ()=>{
      const newEdu = [{
        school: "",
        degree: "",
        field: "",
        startDate: "",
        endDate: "",
      }]
      const updateEducation = [...newEdu,...education];
      setEducation(updateEducation);
    }
    const deleteEducation = (index)=>{
      const updateEducation = [...education];
      updateEducation.splice(index, 1)
      setEducation(updateEducation);
    }

    const handleExperienceChange = (index, field, value) => {
      const updateExperience = [...experience];
      updateExperience[index][field] = value;
      setExperience(updateExperience);
    };
    const addNewExperience = ()=>{
      const newExp = [{
        role: "",
        company: "",
        startDate: "",
        endDate: "",
      }]
      const updateExperience = [...newExp,...experience];
      setExperience(updateExperience);
    }
    const deleteExperience = (index)=>{
      const updateExperience = [...experience];
      updateExperience.splice(index, 1)
      setExperience(updateExperience);
    }

    useEffect(() => {
        if (user) {
          setExperience(user.experience || "");
          setEducation(user.education || "");
        }
    }, [user])
    
    const updateProfile = async()=>{
        const body = {experience, education}
        console.log(body);
        const res = await patch('user/mentor/update', body);
        console.log(res);
        onClose();
    }

    return (
        <>
            <Button colorScheme='blue' onClick={onOpen}> Edit</Button>
            <Modal isOpen={isOpen} onClose={onClose} size={"xl"}>
                <ModalOverlay />
                <ModalContent>
                    <ModalBody>
                      <Tabs isFitted variant='enclosed'>
                        <TabList mb='1em' mt='1em'>
                          <Tab>Experience</Tab>
                          <Tab>Education</Tab>
                        </TabList>
                        <TabPanels>
                          <TabPanel>
                            <div>
                              <div className='flex justify-end'>
                                  <button onClick={addNewExperience} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                      Add New
                                  </button>
                              </div>
                              <div>
                                {
                                  experience?.map((experience, index)=>(
                                    <div key={index} class="max-w-md mx-auto">
                                        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                          <div class="mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="role">
                                              Role
                                            </label>
                                            <input value={experience?.role} onChange={(e) => handleExperienceChange(index, 'role', e.target.value)} id="role" type="text" placeholder="eg: web developer"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                          </div>
                                          <div class="mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" for="company">
                                              Company
                                            </label>
                                            <input value={experience?.company} onChange={(e) => handleExperienceChange(index, 'company', e.target.value)} id="company" type="text" placeholder="eg: google"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                          </div>
                                          <div class="mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2" >
                                              Start Date
                                            </label>
                                            <input value={new Date(experience?.startDate).toISOString().split('T')[0]} onChange={(e) => handleExperienceChange(index, 'startDate', e.target.value)} id="company" type="date" placeholder="eg: 2024-04-06T15:30:15.700Z"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                          </div>
                                          <div class="mb-4">
                                            <label class="block text-gray-700 text-sm font-bold mb-2">
                                              End Date
                                            </label>
                                            <input value={new Date(experience?.endDate).toISOString().split('T')[0]} onChange={(e) => handleExperienceChange(index, 'endDate', e.target.value)} id="company" type="date" placeholder="eg: 2024-04-06T15:30:15.700Z"  class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" />
                                          </div>
                                          <div class="flex items-center justify-end">
                                            <button onClick={()=>{deleteExperience(index)}} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                              Delete
                                            </button>
                                          </div>
                                        </form> 
                                    </div>     
                                  ))
                                }
                              </div>
                            </div>
                          </TabPanel>
                          <TabPanel>
                            <div>
                              <div className='flex justify-end'>
                                  <button onClick={addNewEducation} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                      Add New
                                  </button>
                              </div>
                              {
                                education?.map((education, index)=>(
                                  <div key={index} class="max-w-md mx-auto">
                                    <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                                      <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="school">
                                          School
                                        </label>
                                        <input value={education?.school} onChange={(e) => handleInputChange(index, 'role', e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="school" type="text" placeholder="eg: IIT" />
                                      </div>
                                      <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="degree">
                                          Degree
                                        </label>
                                        <input value={education?.degree} onChange={(e) => handleInputChange(index, 'role', e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="degree" type="text" placeholder="eg: B.tech" />
                                      </div>
                                      <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="field">
                                          Field
                                        </label>
                                        <input value={education?.field} onChange={(e) => handleInputChange(index, 'role', e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="field" type="text" placeholder="eg: Computer Science" />
                                      </div>
                                      <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="startDate">
                                          Start Date
                                        </label>
                                        <input value={new Date(education?.startDate).toISOString().split('T')[0]} onChange={(e) => handleInputChange(index, 'role', e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="startDate" type="date" placeholder="eg: 2024-04-06T15:30:15.700Z" />
                                      </div>
                                      <div class="mb-4">
                                        <label class="block text-gray-700 text-sm font-bold mb-2" for="endDate">
                                          End Date
                                        </label>
                                        <input value={new Date(education?.endDate).toISOString().split('T')[0]} onChange={(e) => handleInputChange(index, 'role', e.target.value)} class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="endDate" type="date" placeholder="eg: 2024-04-06T15:30:15.700Z" />
                                      </div>
                                      <div class="flex items-center justify-end">
                                        <button onClick={()=>{deleteEducation(index)}} class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button">
                                          Delete
                                        </button>
                                      </div>
                                    </form>
                                  </div>
                                ))
                              }
                            </div>
                          </TabPanel>
                        </TabPanels>
                      </Tabs>
                      <Stack spacing={6} mt={4} mb={6} direction={['column', 'row']}>
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
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )  
}

export default EditExperience
