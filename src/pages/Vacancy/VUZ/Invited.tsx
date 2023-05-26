import { useQuery } from 'react-query';

import { getResponsesByCode } from '../../../api/vacancy';
import { Box } from '@chakra-ui/react';

export default function Invited() {
  const { data: completedData, isLoading: completedDataLoading } = useQuery(`vacancy-request/own/complited`, () => getResponsesByCode('complited'));
  console.log("completed", completedData);
  return (
    <Box>
      <Box display="flex">
        <Box width="100%" display="flex" justifyContent="center">
          {completedDataLoading ? (<Box textAlign="center" mt="10px" width="70%">Loading...</Box>) : (
            completedData && completedData?.data?.length === 0 ? (<Box width="70%" textAlign="center" mt="10px">No vacancies</Box>) : (
              <Box width="70%" m="32px">
                {completedData && completedData?.data?.map((item: any) => (
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
                 </Box>
                ))}
              </Box>
            ))}
        </Box>
      </Box>
    </Box>
  )
}
