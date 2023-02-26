import { useState } from "react";
import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";

interface CustomInputProps extends InputProps {
  label: string;
  name: string;
}

const CustomInput = ({ label, name, ...rest }: CustomInputProps) => {
  const [value, setValue] = useState("");

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
    // Call the onChange function here
    onChange(name, event.target.value);
  };

  const onChange = (name: string, value: string) => {
    console.log(`CustomInput: name=${name}, value=${value}`);
  };

  return (
    <FormControl>
      <FormLabel>{label}</FormLabel>
      <Input name={name} value={value} onChange={handleChange} {...rest} />
    </FormControl>
  );
};

export default CustomInput;







// import { useState } from "react";
// import { FormControl, FormLabel, Input, InputProps } from "@chakra-ui/react";

// interface CustomInputProps extends InputProps {
//   label: string;
//   name: string;
// }

// const CustomInput = ({ label, name, ...rest }: CustomInputProps) => {
//   const [value, setValue] = useState("");

//   const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setValue(event.target.value);
//   };

//   return (
//     <FormControl>
//       <FormLabel>{label}</FormLabel>
//       <Input value={value}
//         // onChange={handleChange}
//         {...rest} />
//     </FormControl>
//   );
// };

// export default CustomInput;