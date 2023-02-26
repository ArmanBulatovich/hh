import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Flex, Box, FormControl, FormLabel, Input, InputGroup, HStack, InputRightElement, Stack, Button, Heading, Text, useColorModeValue, Link } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { useQuery } from 'react-query';
import { Select } from '@chakra-ui/react';

import { expressService } from '../../axiosConfig';

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState<any>([]);
  const [role, setRole] = useState<any>(null);
  const [phoneNumber, setPhoneNumber] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    expressService.post('auth/register',
      { email, password, phoneNumber, role }).then((res) => {
        if (res.status === 201) {
          console.log(res.data.data.accessToken);
          localStorage.setItem('token', JSON.stringify(res.data.data.accessToken));
          navigate('/profile');
        }
      });
  };

  return (
    <Flex minH={'90vh'} align={'center'} justify={'center'} bg={useColorModeValue('gray.50', 'gray.800')}>
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
          <form onSubmit={handleSubmit}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl>
                    <FormLabel>Roles</FormLabel>
                    <Select
                      placeholder='Select option'
                      name="role"
                      onChange={(event) => {
                        setRole(event.target.value)
                      }}>
                      {roles.map((role: any) =>
                        <option key={role.index} value={role.code}>{role.name}</option>
                      )}
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Phone number</FormLabel>
                    <Input type="text" name="phoneNumber" onChange={(event) => setPhoneNumber(event.target.value)} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" name="email" onChange={(event) => setEmail(event.target.value)} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input type={showPassword ? 'text' : 'password'} name="password" onChange={(event) => setPassword(event.target.value)} />
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
                <Button type='submit' loadingText="Submitting" size="lg" bg={'blue.400'} color={'white'} _hover={{ bg: 'blue.500', }}>
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={'center'} onClick={() => navigate('/login')}>
                  Already a user ? <Link color={'blue.400'}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack >
    </Flex >
  );
}