import { useState } from "react";
import {
    FormControl,
    FormLabel,
    Input,
    InputProps,
} from "@chakra-ui/react";

interface CustomInputProps extends InputProps {
    label: string;
}

const CustomInput = ({ label, ...rest }: CustomInputProps) => {
    const [value, setValue] = useState("");

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setValue(event.target.value);
    };

    return (
        <FormControl>
            <FormLabel>{label}</FormLabel>
            <Input value={value} onChange={handleChange} {...rest} />
        </FormControl>
    );
};

export default CustomInput;
