import { FormControl, FormLabel, Input, FormErrorMessage } from '@chakra-ui/react';
import { useController } from 'react-hook-form';

const CustomInput = ({ control, name, label, rules, ...rest }: any) => {
  const { field, fieldState } = useController({
    name,
    control,
    rules,
    defaultValue: '',
  });

  const { invalid, error } = fieldState;

  return (
    <FormControl isInvalid={invalid}>
      <FormLabel htmlFor={name}>{label}</FormLabel>
      <Input id={name} {...rest} {...field} />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  );
};

export default CustomInput;