// Checkout.js

import React, { useState } from "react";
import axios from "axios";
import { baseUrl } from "../../api/apis";
import {
  Stack,
  FormControl,
  Input,
  Button,
  useColorModeValue,
  Heading,
  Container,
  Flex,
  useToast,
} from "@chakra-ui/react";
import { UserState } from "../../context/user";
import {useNavigate} from "react-router-dom"
import { useParams } from 'react-router-dom';

const Checkout = () => {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();
  const toast = useToast();


  const { user, setUser } = UserState();


  const handlePayment = async () => {
    setLoading(true);
    try {
      const response = await axios.post(baseUrl + "user/create-payment",{
        amount:amount,
      });
      const data = response.data;

      const options = {
        key: "rzp_test_wQiHLwAfgu8v6y",
        amount: data.amount,
        currency: data.currency,
        name: "Mentora",
        description: "Purchase Description",
        order_id: data.id,
        handler: function (response) {
            toast({       
                title: "Payment successful!",
                description: `Balance of Rs. ${amount} added to your wallet successfully`,
                status: "success",
                duration: 5000,
                isClosable: true,
              });

        try{
            const res =  axios.post(baseUrl + 'user/save-transaction', {
                paymentId: response.razorpay_payment_id,
                orderId: data.id,
                currency: 'INR',
                amount: data.amount,
                userId: user.id // Assuming you have access to user ID
            })
            navigate(`/mentors/profile/${id}`)
        }catch(error) {
            console.error('Error saving transaction data:', error);
        }
        },
        prefill: {
          id: user?.id,
          name: user?.name,
          email: user?.email,
          contact: user?.mobile,
        },
        theme: {
          color: "#3b82f6",
        },
      };
      const rzp = new window.Razorpay(options);
      rzp.open();
    } catch (error) {
      console.error("Error:", error);
    }
    setLoading(false);
  };

  return (
    <Flex
      minH={"100vh"}
      align={"start"}
      pt={10}
      justify={"center"}
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Container
        maxW={"lg"}
        bg={useColorModeValue("white", "whiteAlpha.100")}
        boxShadow={"xl"}
        rounded={"lg"}
        p={6}
      >
        <Heading
          as={"h2"}
          fontSize={{ base: "xl", sm: "2xl" }}
          textAlign={"center"}
          mb={5}
        >
          Add Balance to your wallet
        </Heading>
        <Stack
          direction={{ base: "column", md: "row" }}
          as={"form"}
          spacing={"12px"}
        >
          <FormControl>
            <Input
              variant={"solid"}
              borderWidth={1}
              color={"gray.800"}
              _placeholder={{
                color: "gray.400",
              }}
              borderColor={useColorModeValue("gray.300", "gray.700")}
              id={"amount"}
              type={"number"}
              required
              placeholder={"Enter amount in rupees"}
              aria-label={"Add to Wallet"}
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </FormControl>
          <FormControl w={{ base: "100%", md: "40%" }}>
            <Button
              colorScheme={"blue"}
              isLoading={loading}
              onClick={handlePayment}
              disabled={loading}
              w="100%"
            >
              {loading ? "Processing..." : "Pay Now"}
            </Button>
          </FormControl>
        </Stack>
      </Container>
    </Flex>
  );
};
export default Checkout;
