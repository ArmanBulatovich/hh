import {
  Box,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Text,
  Select,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { expressService } from "../../axiosConfig";
import { ChevronUpIcon, SearchIcon, ChevronDownIcon } from "@chakra-ui/icons";

export const GetTeachers = () => {
  const navigate = useNavigate();
  const tokenFromLocalStorage = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${tokenFromLocalStorage}` };
  const [teachers, setTeachers] = useState<any>([]);
  const [openFilters, setOpenFilters] = useState<boolean>(false);

  useEffect(() => {
    expressService
      .get("teacher", { headers: headers })
      .then((res) => {
        setTeachers(res.data.data);
      });
  }, []);

  return (
    <Box display="flex">
      <Box width="70%" mx="30px">
        <Box display="flex" justifyContent="space-between" mb="24px">
          <Text fontSize={24}>
            Teachers
          </Text>
          {/* <InputGroup size='md' width="70%">
            <Input
              pr='4.5rem'
              type='text'
              placeholder='Search by name'
            />
            <InputRightElement width='2.5rem'>
              <SearchIcon />
            </InputRightElement>
          </InputGroup> */}
        </Box>
        <Box>
          {teachers.length === 0 ? (
            <Text>No teachers</Text>
          ) : (<Box>
            {teachers.map((item: any) => (
              <Box key={item.id} cursor="pointer" border="1px solid purple" borderRadius="8px" p="12px 20px" height="auto" mb="16px" onClick={() => navigate(`${item.id}`)}>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Text fontSize={20} fontWeight={500}>{item.name} {item.middleName} {item.lastName}</Text>
                  <Text fontSize={20} fontWeight={500}>{item.experienceRange && item.experienceRange.price}$</Text>
                </Box>
                <Box display="flex" justifyContent="space-between" alignItems="center">
                  <Text fontSize={16}>{item.wantedPosition}</Text>
                  <Text fontSize={16}>{item.experienceRange && item.experienceRange.name}</Text>
                </Box>
                <Text fontSize={16} color={item.status.code === "busy" ? "#FF0800" : "#55DD33"}>{item.status.name}</Text>
                <Text>{item.country && item.country.name}. {item.city && item.city.name}</Text>
              </Box>
            ))
            }</Box>
          )}
        </Box>
      </Box>
      <Box width="30%" display="block">
        {/* <Button rightIcon={openFilters ? <ChevronUpIcon /> : <ChevronDownIcon />} colorScheme='teal' variant='solid'
          onClick={() => setOpenFilters(!openFilters)}>
          Filter
        </Button> */}
        {/* {openFilters &&
          <Box width="80%">
            <Box mt="16px">
              <Text>Status</Text>
              <Select placeholder="Select status">
                <option value="busy">Busy</option>
                <option value="free">Free</option>
              </Select>
            </Box>
            <Box mt="16px">
              <Text>Country</Text>
              <Select placeholder="Select country">
                <option value="KZ">Kazakhstan</option>
                <option value="USA">USA</option>
              </Select>
            </Box>
            <Box mt="16px">
              <Text>City</Text>
              <Select placeholder="Select country">
                <option value="busy">Astana</option>
                <option value="free">Almaty</option>
              </Select>
            </Box>
            <Box mt="16px">
              <Text>Experience range</Text>
              <Select placeholder="Select experience range">
                <option value="busy">Without experience</option>
                <option value="free">1-3 year</option>
                <option value="free">3-6 year</option>
                <option value="free">6 year more</option>
              </Select>
            </Box>
          </Box>
        } */}
      </Box>
    </Box >
  );
};