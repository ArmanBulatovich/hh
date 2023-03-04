import { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Stack } from "@chakra-ui/react";
import { useQuery } from "react-query";

import { expressService } from "../../axiosConfig";
import CustomInput from "../../ui/Input";

export const Profile = () => {
  const [initialState, setInitialState] = useState<any>(undefined);
  const tokenFromLocalStorage = localStorage.getItem("token");
  const { handleSubmit, control } = useForm({ defaultValues: initialState });

  const { isLoading, error, data } = useQuery(
    "users/account",
    () =>
      expressService
        .get("users/account", {
          headers: {
            Authorization: `Bearer ${tokenFromLocalStorage}`,
          },
        })
        .then((res) => res.data),
    {
      onSuccess: (data) => {
        setInitialState(data.data);
      },
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {data.error.message}</div>;

  const onSubmit = (data: any) => {
    console.log(data);
  };
  
  return (
    <Box mt="30px" mb="80px" mx={200}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Stack spacing={4}>
          {/* <CustomInput
            control={control}
            name={profile.name}
            label="First Name"
            rules={{ required: "First Name is required" }}
            placeholder="Enter your first name"
          /> */}
          <CustomInput
            control={control}
            name='lastName'
            label="Last Name"
            rules={{ required: "Last Name is required" }}
            placeholder="Enter your last name"
          />
          {/* <input {...register(`${initialState.account.lastName}`)} /> */}
          {/*
          <CustomInput
            control={control}
            name="middleName"
            label="Middle Name"
            rules={{ required: "Last Name is required" }}
            placeholder="Enter your middle name"
          />
          <CustomInput
            control={control}
            name="phoneNumber"
            label="Telephone Number"
            rules={{ required: "Phone number is required" }}
            placeholder="Telephone Number"
          />
          <CustomInput
            control={control}
            name="email"
            label="Email"
            rules={{ required: "Email is required" }}
            placeholder="Email"
          />
          <CustomInput
            control={control}
            name="location"
            label="City of residence"
            rules={{ required: "Last Name is required" }}
            placeholder="Location"
          />
          <CustomInput
            control={control}
            name="birthDate"
            label="Birth Date"
            rules={{ required: "Last Name is required" }}
            placeholder="Birth Date"
          />
          <CustomInput
            control={control}
            name="gender"
            label="Gender"
            rules={{ required: "Last Name is required" }}
            placeholder="Gender"
          />
          <CustomInput
            control={control}
            name="citizenship"
            label="Citizenship"
            rules={{ required: "Last Name is required" }}
            placeholder="Citizenship"
          />
          <CustomInput
            control={control}
            name="desiredPosition"
            label="Desired position"
            rules={{ required: "Last Name is required" }}
            placeholder="Desired position"
          />
          <CustomInput
            control={control}
            name="salary"
            label="Salary"
            rules={{ required: "Last Name is required" }}
            placeholder="Salary"
          />
          
          <CustomInput
            control={control}
            name="education"
            label="Education"
            rules={{ required: "Last Name is required" }}
            placeholder="Education"
          />
          
          <CustomInput
            control={control}
            name="languageProficiency"
            label="Language proficiency"
            rules={{ required: "Last Name is required" }}
            placeholder="Language proficiency"
          />
         
          <CustomInput
            control={control}
            name="additionalInformation"
            label="Additional information"
            rules={{ required: "Last Name is required" }}
            placeholder="Additional information"
          />
          
          <CustomInput
            control={control}
            name="wantToWorkAt"
            label="Which University would you like to work at"
            rules={{ required: "Last Name is required" }}
            placeholder="Which University would you like to work at"
          /> */}

          <Button type="submit" colorScheme="blue">
            Submit
          </Button>
        </Stack>
      </form>
    </Box>
  );
};
