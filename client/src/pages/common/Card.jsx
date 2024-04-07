import {
  Box,
  Text,
  Flex,
  Grid,
  GridItem,
  Image,
  Button,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom"; // Using useNavigate for navigation

const Card = ({ data }) => {
  const navigate = useNavigate();

  const handleClick = (id) => {
    navigate(`/mentors/profile/${id}`);
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
            p={0}
            boxShadow="lg"
            borderRadius="30px"
            overflow="hidden"
            // cursor="pointer"
            display="flex"
            justifyContent="space-between"
            flexDirection="column"
            alignItems="start"
            // onClick={() => handleClick(item._id)}
            height="400px"
            backgroundColor={'#ffffff'}
          >
            <Image
              src={item.pic}
              alt="profile"
              height={200}
              width="100%"
              objectFit={"cover"}
              mb={1}
            />
            <Text
              fontWeight="700"
              textTransform={"uppercase"}
              fontSize={"18px"}
              px={4}
              color={"#000"}
            >
              {item.name}
            </Text>
            <Text
              fontWeight="500"
              textTransform={"capitalize"}
              fontSize={"16px"}
              px={4}
              color={"#7a7a7a"}
            >
              {item.title}
            </Text>
            <Text
              textAlign="left"
              overflow="hidden"
              height="50px"
              px={4}
              fontWeight={500}
              fontSize={"16px"}
              color={"#7a7a7a"}
            >
              {item.bio}
            </Text>
            <Flex px={4} justifyContent="space-between" width="100%" pb={3}>
              <Flex flexDir="column">
                <Text fontWeight={500} fontSize="16px" color="#7a7a7a">
                  Price
                </Text>
                <Text fontWeight={700} fontSize="18px" color="#22c55e">₹{item.chargesPerMin} /Min</Text>
              </Flex>
              <Flex>
                <Button
                  alignSelf="center"
                  onClick={() => handleClick(item._id)}
                  backgroundColor="#3b82f600"   
                  color="#3b82f6"
                  border="1px solid #3b82f6"
                  borderRadius={30}
                >
                  View Profile
                </Button>
              </Flex>
            </Flex>
          </Box>
        </GridItem>
      ))}
    </Grid>
  );
};

export default Card;
