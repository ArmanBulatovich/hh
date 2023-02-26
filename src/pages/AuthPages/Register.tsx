import { useState, useEffect } from 'react';
import axios from 'axios';
import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useQuery } from 'react-query';
import { Select } from '@chakra-ui/react';

import { expressService } from '../../axiosConfig';

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState<any>([]);

  const { isLoading, error, data } = useQuery('roles', () =>
    expressService.get('roles').then((res) => res.data),
    {
      onSuccess: (data) => {
        setRoles(data.data);
      },
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {data.error.message}</div>;




  return (
    <Flex
      minH={'90vh'}
      align={'center'}
      justify={'center'}
      bg={useColorModeValue('gray.50', 'gray.800')}>
      <Stack spacing={8} mx={'auto'} maxW={'lg'} py={12} px={6}>
        <Stack align={'center'}>
          <Heading fontSize={'4xl'} textAlign={'center'}>
            Sign up
          </Heading>
          <Text fontSize={'lg'} color={'gray.600'}>
            to enjoy all of our cool features ✌️
          </Text>
        </Stack>
        <Box rounded={'lg'} bg={useColorModeValue('white', 'gray.700')} boxShadow={'lg'} p={8}>
          <Stack spacing={4}>
            <HStack>
              <Box>
                <FormLabel>Roles</FormLabel>
                <Select placeholder='Select option'>
                  {roles.map((role: any) => <option key={role.id} value={role.id}>{role.name}</option>)}
                </Select>
              </Box>
              <Box>
                <FormControl id="lastName">
                  <FormLabel>Phone number</FormLabel>
                  <Input type="number" />
                </FormControl>
              </Box>
            </HStack>
            <FormControl id="email" isRequired>
              <FormLabel>Email address</FormLabel>
              <Input type="email" />
            </FormControl>
            <FormControl id="password" isRequired>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input type={showPassword ? 'text' : 'password'} />
                <InputRightElement h={'full'}>
                  <Button
                    variant={'ghost'}
                    onClick={() =>
                      setShowPassword((showPassword) => !showPassword)
                    }>
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
            </FormControl>
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="lg"
                bg={'blue.400'}
                color={'white'}
                _hover={{
                  bg: 'blue.500',
                }}>
                Sign up
              </Button>
            </Stack>
            <Stack pt={6}>
              <Text align={'center'}>
                Already a user? <Link color={'blue.400'}>Login</Link>
              </Text>
            </Stack>
          </Stack>
        </Box>
      </Stack >
    </Flex >
  );
}