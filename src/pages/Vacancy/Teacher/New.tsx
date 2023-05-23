import { useQuery } from 'react-query';
import { Box } from '@chakra-ui/react';

import { getResponsesByCode } from '../../../api/vacancy';

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
                    <Box display="block">
                      <Box fontSize={16} width="50%" mt="4px">{item.educationalInstitution?.name}</Box>
                      <Box fontSize={16} width="50%" mt="4px">{item.educationalInstitution?.address}</Box>
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
