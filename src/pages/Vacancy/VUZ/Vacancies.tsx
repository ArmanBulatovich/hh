import { Box, Text } from '@chakra-ui/react'
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';
import { RiDeleteBin5Fill } from "react-icons/ri";

import { getAllOwnVacancies, deleteVacancy } from '../../../api/vacancy'
import { queryClient } from '../../../queryClient';


export default function Vacancies() {
  const navigate = useNavigate();
  const { data: vacancies, isLoading: vacanciesLoading } = useQuery("vacancy/own", () => getAllOwnVacancies());

  return (
    <Box>
      <Box display="flex">
        <Box width="100%" display="flex">
          {vacanciesLoading ? (<Text textAlign="center" mt="10px" width="70%">Loading...</Text>) : (
            vacancies && vacancies?.data?.length === 0 ? (<Text width="70%" textAlign="center" mt="10px">No documents</Text>) : (
              <Box width="70%" mx="32px">
                <Box display="flex" justifyContent="space-between">
                  <Text display="flex" fontSize={24} mb={5}>My vacancies</Text>
                </Box>
                {vacancies && vacancies?.data.map((item: any) => (
                  <Box key={item.id} border="1px solid #FF5800" borderRadius="8px" p="12px 20px" height="auto" mb="16px">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Text fontSize={20} fontWeight={500} color="blue" cursor="pointer" onClick={() => navigate(`${item.id}`)}>{item.name}</Text>
                      <Text fontSize={20} fontWeight={500}>{item.salary} {item.currency.name}</Text>
                    </Box>
                    <Box display="block">
                      <Text fontSize={16} width="50%" mt="4px">{item.educationalInstitution?.name}</Text>
                      <Text fontSize={16} width="50%" mt="4px">{item.educationalInstitution?.address}</Text>
                    </Box>
                    <Box display="flex" justifyContent="flex-end" alignItems="center" mt="8px">
                      <RiDeleteBin5Fill color="red" size="24px" cursor="pointer" onClick={
                        () => {
                          deleteVacancy(item.id).then((res) => {
                            if (res.success) {
                              queryClient.invalidateQueries("vacancy/own");
                              alert("Vacancy deleted");
                            }
                          }).catch((err) => {
                            alert("Error: " + err.message);
                          })
                        }} />
                    </Box>
                  </Box>
                ))}
              </Box>
            ))
          }
        </Box>
      </Box>
    </Box >
  )
}