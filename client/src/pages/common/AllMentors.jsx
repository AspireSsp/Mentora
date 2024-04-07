import { useEffect, useState } from "react";
import Card from "./Card";
import { baseUrl } from "../../api/apis";
import axios from "axios"; 

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
    <div>
      <Card data={mentors} />
    </div>
  );
};

export default AllMentors;
