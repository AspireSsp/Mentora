import { useEffect, useState } from "react";
import Card from "./Card";
import { baseUrl } from "../../api/apis";
import axios from "axios"; 
import {Box} from "@chakra-ui/react"

const AllMentors = () => {
    const [mentors, setMentors] = useState([]);

    useEffect(() => {  
      fetchMentors();
    }, []);
  
    const fetchMentors = async () => {
        try {
          const response = await axios.get(baseUrl + "user/getAll", {
            params: { role: "Mentor" } 
          });
          console.log(response)
          setMentors(response.data.users); 
        } catch (error) {
          console.error("Error fetching mentors:", error);
        }
      };

  return (
    <Box display={'flex'}  backgroundColor={'#7a7a7a20'} justifyContent={'center'}>
        <Box width={'80%'}p={10}>
        <Card data={mentors} />
    </Box>
    </Box>
  );
};

export default AllMentors;
