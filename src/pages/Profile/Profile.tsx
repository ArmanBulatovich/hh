import { useForm } from 'react-hook-form';
import { Box, Button, Stack } from '@chakra-ui/react'
import CustomInput from '../../ui/Input';

export const Profile = () => {
  const { handleSubmit, control } = useForm();

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <Box mt={70}>
          <form onSubmit={handleSubmit(onSubmit)}>
      <Stack spacing={4}>
        <CustomInput
          control={control}
          name="firstName"
          label="First Name"
          rules={{ required: 'First Name is required' }}
          placeholder="Enter your first name"
        />

        <CustomInput
          control={control}
          name="lastName"
          label="Last Name"
          rules={{ required: 'Last Name is required' }}
          placeholder="Enter your last name"
        />

        <Button type="submit" colorScheme="blue">
          Submit
        </Button>
      </Stack>
    </form>
    </Box>
  )
}
