import { useState } from 'react';
import { useQuery } from 'react-query';
import { useForm } from 'react-hook-form';
import { Box, Button, Input, Text } from '@chakra-ui/react'

import { expressService } from '../../axiosConfig';


export default function Balance() {
  const tokenFromLocalStorage = localStorage.getItem("token");
  const { handleSubmit, register } = useForm();
  const [initialState, setInitialState] = useState<any>();
  const headers = { Authorization: `Bearer ${tokenFromLocalStorage}` };

  const { isLoading, error, data } = useQuery(
    "users/account",
    () =>
      expressService
        .get("users/account", {
          headers: headers,
        })
        .then((res) => res.data),
    {
      onSuccess: (data: { data: any; }) => {
        setInitialState(data.data);
      },
    }
  );

  const onSubmit = (data: any) => {
    console.log(data);
    expressService
      .patch("users/increase-balance", { balance: Number(data.balance) }, {
        headers: headers
      })
      .then((res) => {
        if (res.status === 200) {
          setInitialState({ ...initialState, balance: (initialState.balance + Number(data.balance)) });
          alert('Баланс пополнен');
        }
      })
  };

  return (
    <Box>
      <Box width="80%" ml="32px">
        <form onSubmit={handleSubmit(onSubmit)}>
          <Box>
            <Box display='block' paddingTop="16px">
              <Text fontSize="2xl">Balance: {initialState?.balance}</Text>
              <Input type="number" width="100%" {...register("balance", { required: true })} />
            </Box>
          </Box>
          <Button type="submit" colorScheme="blue" width="250px" mt={10}>Пополнить</Button>
        </form>
      </Box>
    </Box>
  )
}