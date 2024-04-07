import React, { useEffect, useState } from 'react'
import {
    AlertDialog,
    AlertDialogBody,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogContent,
    AlertDialogOverlay,
    AlertDialogCloseButton,
    Button,
    useDisclosure,
    Text,
} from '@chakra-ui/react'
import { post } from '../../../api/apis'
import { Link, useNavigate } from 'react-router-dom';

const StartChat = ({ startChat, user, mentor }) => {
    const { isOpen, onOpen, onClose } = useDisclosure()
    const cancelRef = React.useRef()
    const [balence, setBalence] = useState();
    const [min, setMin] = useState();
    const navigate = useNavigate();

    useEffect(() => {
        if (user && mentor) {
            setBalence(user.wallet);
            const chargesPerMinute = mentor?.chargesPerMin; // Assuming chargesPerMinute is a property of the mentor object
            const minutes = calculateTimeFromWallet(user.wallet, chargesPerMinute);
            setMin(minutes);
        }
    }, [user, mentor])

    const handleStartChat = async () => {
        if(balence <min ){
            navigate('/mentee/payment')
        }else{
            const res = await post('chat/add', {mentorId : mentor._id})
            console.log(res);
            if(res.statusCode === 201){
                navigate(`/chat/${res?.data?.chat?._id}`);
            }else{
                navigate('/mentee/payment')
            }
        }
        onClose();
    }
    const handleAddBalance = ()=>{
        navigate('/mentee/payment')
        onClose();

    }

    const calculateTimeFromWallet = (walletBalance, chargesPerMinute) => {
        if (chargesPerMinute === 0) {
            return 60;
        }
        const timeInMinutes = walletBalance / chargesPerMinute;
        return timeInMinutes;
    };

    return (
        <>
            <button onClick={onOpen} className='bg-green-500 w-[100%] py-2 text-white rounded-lg hover:bg-green-600'>Start Chat</button>

            <AlertDialog
                isOpen={isOpen}
                leastDestructiveRef={cancelRef}
                onClose={onClose}
            >
                <AlertDialogOverlay>
                    <AlertDialogContent>
                        <AlertDialogHeader fontSize='lg' fontWeight='bold'>
                            Delete Customer
                        </AlertDialogHeader>

                        <AlertDialogBody>
                            <Text>
                                Are you sure? You want to start Chat with <span className='font-bold'>{mentor?.name}</span>.
                            </Text>
                            <Text>
                                Your Wallet balance is <span className={ balence > 50 ? "text-green-500 font-bold" : "text-red-500 font-bold" }>{balence}/-</span>.
                            </Text>
                            <Text>
                                You can chat with this balence:  <span className={ balence > 50 ? "text-green-500 font-bold" : "text-red-500 font-bold" }>{min} min</span> only.
                            </Text>
                            <p className='font-normal text-sm text-red-500 mt-3'>If your balence is less then a min, you will be redirected to payment page</p>
                        </AlertDialogBody>

                        <AlertDialogFooter w={"100%"}>
                            <div className='flex justify-between w-[100%]'>
                                <div>
                                    <Button colorScheme='green' onClick={handleAddBalance} ml={3}>
                                        Add Balance
                                    </Button>
                                </div>
                                <div className='flex'>
                                    <Button ref={cancelRef} onClick={onClose}>
                                        Cancel
                                    </Button>
                                    <Button colorScheme='blue' onClick={handleStartChat} ml={3}>
                                        Yes
                                    </Button>
                                </div>
                            </div>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialogOverlay>
            </AlertDialog>
        </>
    )
}

export default StartChat;
