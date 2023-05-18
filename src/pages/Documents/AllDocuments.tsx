import { Box, Button, Input, InputGroup, InputRightElement, Select, Table, TableContainer, Tbody, Td, Text, Th, Thead, Tr } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { expressService } from "../../axiosConfig";
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "@chakra-ui/icons";

export const AllDocuments = () => {
  const navigate = useNavigate();
  const tokenFromLocalStorage = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${tokenFromLocalStorage}` };
  const [documents, setDocuments] = useState<any>([]);
  const [openFilters, setOpenFilters] = useState<boolean>(false);

  useEffect(() => {
    expressService.get("documents", { headers: headers }).then((res) => {
      setDocuments(res.data.data);
    });
  }, []);

  return (
    <Box>

      <Box display="flex">
        {documents.length === 0 ? (
          <Text>No documents</Text>
        ) : (
          <Box width="100%" display="flex">
            <Box width="70%" mx="32px">
              <Box display="flex" justifyContent="space-between">
                <Text display="flex" fontSize={24} mb={5}>Documents</Text>
                <InputGroup size='md' width="70%">
                  <Input
                    pr='4.5rem'
                    type='text'
                    placeholder='Search by name'
                  />
                  <InputRightElement width='2.5rem'>
                    <SearchIcon />
                  </InputRightElement>
                </InputGroup>
              </Box>
              {documents.map((item: any) => (
                <Box key={item.id} cursor="pointer" border="1px solid #FF5800" borderRadius="8px" p="12px 20px" height="auto" mb="16px" onClick={() => navigate(`${item.id}`)}>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Text fontSize={20} fontWeight={500}>{item.category.name}: {item.name}</Text>
                    <Text fontSize={20} fontWeight={500}>{item.price} {item.currency.name}</Text>
                  </Box>
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Text fontSize={16} width="50%">{item.description}</Text>
                    <Text fontSize={16}>{item.language.name}</Text>
                  </Box>
                  <Box display="flex" justifyContent="flex-end" alignItems="center">
                    <Text fontSize={16}>For {item.educationalInstitutionCategory.name}</Text>
                  </Box>
                  <Box display="flex" justifyContent="flex-end" alignItems="center">
                    <Text fontSize={14}>{item.updated_at.slice(0, 10)}</Text>
                  </Box>
                </Box>
              ))
              }</Box>
            <Box width="30%" display="block">
              <Button rightIcon={openFilters ? <ChevronUpIcon /> : <ChevronDownIcon />} colorScheme='orange' variant='solid'
                onClick={() => setOpenFilters(!openFilters)}>
                Filter
              </Button>
              {openFilters &&
                <Box width="80%">
                  <Box mt="16px">
                    <Text>Subject</Text>
                    <Select placeholder="Select subject">
                      <option value="busy">Programming</option>
                      <option value="free">Design</option>
                    </Select>
                  </Box>
                  <Box mt="16px">
                    <Text>Type</Text>
                    <Select placeholder="Select type">
                      <option value="KZ">type 1</option>
                      <option value="USA">type 2</option>
                    </Select>
                  </Box>
                  <Box mt="16px">
                    <Text>Category</Text>
                    <Select placeholder="Select category">
                      <option value="busy">category 1</option>
                      <option value="free">category 2</option>
                    </Select>
                  </Box>
                  <Box mt="16px">
                    <Text>Educational institution category</Text>
                    <Select placeholder="Select educational institution category">
                      <option value="busy">University</option>
                      <option value="free">College</option>
                      <option value="free">School</option>
                      <option value="free">Kindergarden</option>
                    </Select>
                  </Box>
                </Box>
              }
            </Box>
          </Box>
        )}
      </Box>
    </Box >
  );
};