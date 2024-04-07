import { Box, Text, Flex, Grid, GridItem,Image } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Using useNavigate for navigation

const Card = ({ data }) => {
  const navigate = useNavigate(); 

  const handleClick = (id) => {
    navigate(`/mentor/${id}`); 
  };

  return (
    <Grid
      templateColumns="repeat(auto-fill, minmax(250px, 1fr))"
      gap={6}
      mt={6}
    >
      {data.map((item) => (
        <GridItem key={item._id}>
          <Box
            p={4}
            boxShadow="md"
            borderRadius="md"
            cursor="pointer"
            display='flex'
            justifyContent='center'
            flexDirection='column'
            alignItems='center'
            onClick={() => handleClick(item._id)}
          >
            <Image src={item.pic} alt="profile" width={200} borderRadius={'50%'} my={5}/>
            <Text fontWeight="700">{item.name}</Text>
            <Text fontWeight="400">{item.title}</Text>            
            <Text mt={2} textAlign={'center'}>{item.bio}</Text>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};

export default Card;
