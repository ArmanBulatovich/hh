import { useQuery } from 'react-query';
import { Box } from '@chakra-ui/react';

import { getResponsesByCode } from '../../../api/vacancy';

export default function Refused() {
  const { data: rejectedData, isLoading: rejectedDataLoading } = useQuery(`vacancy-request/own/reject`, () => getResponsesByCode('reject'));
  return (
    <Box>
      <Box display="flex">
        <Box width="100%" display="flex" justifyContent="center">
          {rejectedDataLoading ? (<Box textAlign="center" mt="10px" width="70%">Loading...</Box>) : (
            rejectedData && rejectedData?.data?.length === 0 ? (<Box width="70%" textAlign="center" mt="10px">No vacancies</Box>) : (
              <Box width="70%" m="32px">
                {rejectedData && rejectedData?.data?.map((item: any) => (
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