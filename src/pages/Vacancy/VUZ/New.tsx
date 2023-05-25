import { useQuery } from 'react-query';
import { Box, Button } from '@chakra-ui/react';

import { getResponsesByCode, rejectResponse, acceptResponse } from '../../../api/vacancy';
import { queryClient } from '../../../queryClient';

export default function New() {
  const { data: newData, isLoading: newDataLoading } = useQuery(`vacancy-request/own/new`, () => getResponsesByCode('new'));

  return (
    <Box>
      <Box display="flex">
        <Box width="100%" display="flex" justifyContent="center">
          {newDataLoading ? (<Box textAlign="center" mt="10px" width="70%">Loading...</Box>) : (
            newData && newData?.data?.length === 0 ? (<Box width="70%" textAlign="center" mt="10px">No vacancies</Box>) : (
              <Box width="70%" m="32px">
                {newData && newData?.data?.map((item: any) => (
                  <Box key={item.id} border="1px solid #FF5800" borderRadius="8px" p="12px 20px" height="auto" mb="16px">
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box fontSize={20} fontWeight={500} color="blue" cursor="pointer">{item.vacancy?.name}</Box>
                      <Box fontSize={20} fontWeight={500}>{item.vacancy?.salary} tenge</Box>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Box fontSize={20} fontWeight={500} color="green" cursor="pointer">{item.teacher?.name} {item.teacher?.middleName} {item.teacher?.lastName}</Box>
                      <Box fontSize={20} fontWeight={500}>{item.teacher?.wantedPosition}</Box>
                    </Box>
                    <Box display="block">
                      <Box fontSize={16} width="50%" mt="4px">{item.letter}</Box>
                    </Box>
                    <Box display="flex" justifyContent="space-between" mt="10px">
                      <Button color="white" background="red" _hover={{ bg: "red.700" }}
                        onClick={() => {
                          rejectResponse(item.id).then((res) => {
                            if (res.success) {
                              alert("You have successfully rejected the request");
                              queryClient.invalidateQueries("vacancy-request/own/new");
                            }
                          }).catch((err) => {
                            alert("Something went wrong");
                          })
                        }}
                      >Reject</Button>
                      <Button color="white" background="green" _hover={{ bg: "green.700" }}
                        onClick={() => {
                          acceptResponse(item.id).then((res) => {
                            if (res.success) {
                              alert("You have successfully accepted the reques");
                              queryClient.invalidateQueries("vacancy-request/own/new");
                            }
                          }).catch((err) => {
                            alert("Something went wrong");
                          })
                        }}>Accept</Button>
                    </Box>
                  </Box>
                ))}
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  )
}
