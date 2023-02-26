import React, { useState, useEffect } from 'react';
import { Flex, Box, FormControl, FormLabel, Input, Checkbox, Stack, Link, Button, Heading, Text, useColorModeValue } from '@chakra-ui/react';
import { useMutation } from 'react-query';
import { expressService } from '../../axiosConfig';
import { useNavigate } from 'react-router-dom';
import CustomInput from '../../ui/Input';

type LoginFormValues = {
  [x: string]: any;
  email: string;
  password: string;
  accessToken: string;
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');



  const loginMutation = useMutation<LoginFormValues, Error, { email: string, password: string }>(
    ({ email, password }) => expressService.post('auth/login', { email, password }).then((response) => response.data),
    {
      onSuccess: (data) => {
        localStorage.setItem('token', JSON.stringify(data.data.accessToken));
        navigate('/profile');
      },
      onError: (error) => {
        setError(error.message);
      },
    }
  );

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    loginMutation.mutate({ email, password });
  };

  return (
    <Flex minH={'100vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'}>Sign in to your account</Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool <Link color={'blue.400'}>features</Link> ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              {/* <CustomInput label="Email address" name="email" type="email" /> */}
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" onChange={(event) => setEmail(event.target.value)} />
              </FormControl>
              <FormControl id="password">
                <FormLabel>Password</FormLabel>
                <Input type="password" name="password" onChange={(event) => setPassword(event.target.value)} />
              </FormControl>
              <Stack spacing={10}>
                <Stack direction={{ base: 'column', sm: 'row' }} align={'start'} justify={'space-between'}>
                  <Checkbox>Remember me</Checkbox>
                  <Link color={'blue.400'}>Forgot password?</Link>
                </Stack>
                <Button type="submit" bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500', }}>
                  Sign in
                </Button>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack >
    </Flex >
  );
}