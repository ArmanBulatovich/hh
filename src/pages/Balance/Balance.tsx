import { useState } from 'react';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { Box, Button, Input, Text } from '@chakra-ui/react'

import { expressService } from '../../axiosConfig';
import { getAccount } from '../../api/account';
import { queryClient } from '../../queryClient';

export default function Balance() {
  const tokenFromLocalStorage = localStorage.getItem("token");
  const { handleSubmit, register } = useForm();
  const headers = { Authorization: `Bearer ${tokenFromLocalStorage}` };
  const [balance, setBalance] = useState<any>(0);

  const { data: account, isLoading: accountLoading } = useQuery("users/account", () => getAccount());

  const onSubmit = (data: any) => {
    expressService
      .patch("users/increase-balance", { balance: Number(data.balance) }, {
        headers: headers
      })
      .then((res) => {
        if (res.status === 200) {
          queryClient.invalidateQueries("users/account");
          alert('The balance is replenished');
          setBalance(0);
        }
      })
  };

  return (
    <Box>
      {accountLoading ? (<Text textAlign="center" mt="30px">Loading...</Text>) : (
        <Box width="80%" ml="32px">
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box>
              <Box display='block' paddingTop="16px">
                <Text fontSize="2xl">Balance: {account?.data?.balance} tenge</Text>
                <Input type="number" width="100%" value={balance} {...register("balance", { required: true })} onChange={(e: any) => setBalance(e.target.value)} />
              </Box>
            </Box>
            <Button type="submit" colorScheme="blue" width="250px" mt={10}>Replenish</Button>
          </form>
        </Box>)}
    </Box>
  )
}