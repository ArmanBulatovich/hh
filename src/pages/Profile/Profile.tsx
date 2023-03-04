import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Input, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";

import { expressService } from "../../axiosConfig";
import CustomInput from "../../ui/Input";

export const Profile = () => {
  const [initialState, setInitialState] = useState<any>();
  const [educationalInstitutionCategories, setEducationalInstitutionCategories] = useState<any>([]);
  const [educationDegrees, setEducationDegrees] = useState<any>([]);
  const [country, setCountry] = useState<any>([]);
  console.log(initialState && initialState)
  const tokenFromLocalStorage = localStorage.getItem("token");
  const { handleSubmit, control, register } = useForm(
    //   {
    //   defaultValues: {
    //     name: initialState && initialState.account.name,
    //     lastName: initialState && initialState.account.lastName,
    //     middleName: initialState && initialState.account.middleName,
    //     phoneNumber: initialState && initialState.phoneNumber,
    //     email: initialState && initialState.email,
    //     birthdayDate: initialState && initialState.account.birthdayDate,
    //     wantedPosition: initialState && initialState.account.wantedPosition,
    //     aboutYourself: initialState && initialState.account.aboutYourself,
    //     experience: initialState && initialState.account.experience,
    //     education: initialState && initialState.account.education,
    //     educationalInstitutionCategory: initialState && initialState.account.educationalInstitutionCategory,
    //     educationDegree: initialState && initialState.account.educationDegree,
    //     country: initialState && initialState.account.country,
    //     city: initialState && initialState.account.city,
    //     subjects: initialState && initialState.account.subjects,
    //   }
    // }
  );

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

  // const { isLoading, error, data } = useQuery(
  //   "users/account",
  //   () =>
  //     expressService
  //       .get("users/account", {
  //         headers: {
  //           Authorization: `Bearer ${tokenFromLocalStorage}`,
  //         },
  //       })
  //       .then((res) => res.data),
  //   {
  //     onSuccess: (data) => {
  //       setInitialState(data.data);
  //     },
  //   }
  // );

  useEffect(() => {
    expressService.get("references/educational-institution-categories", {
      headers: {
        Authorization: `Bearer ${tokenFromLocalStorage}`,
      },
    }).then((res) => setEducationalInstitutionCategories(res.data.data));

    expressService.get("references/education-degrees", {
      headers: {
        Authorization: `Bearer ${tokenFromLocalStorage}`,
      },
    }).then((res) => setEducationDegrees(res.data.data));

    expressService.get("references/countries", {
      headers: {
        Authorization: `Bearer ${tokenFromLocalStorage}`,
      },
    }).then((res) => setCountry(res.data.data));

  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {data.error.message}</div>;

  const onSubmit = (data: any) => {
    console.log(data);
    expressService.patch("teacher", data, {
      headers: {
        Authorization: `Bearer ${tokenFromLocalStorage}`,
      },
    })
  }

  return (
    <Box mt="30px" mb="80px">
      <Box display="flex" justifyContent="center">
        <Box width="80%">
          <Text fontSize="3xl" display="flex" justifyContent="center" color="blue" paddingBottom="36px" >Profile page</Text>
          <Tabs isFitted variant='enclosed'>
            <TabList mb='1em'>
              <Tab fontSize="xl">User data</Tab>
              <Tab fontSize="xl">Account data</Tab>
              <Tab fontSize="xl">Experiences</Tab>
              <Tab fontSize="xl">Subjects</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                <Box display='flex' justifyContent='space-between'>
                  <Box display='block' width='45%' paddingTop="16px">
                    <Text fontSize='lg'>Phone Number: </Text>
                    <Input defaultValue={initialState.phoneNumber} {...register("phoneNumber")} disabled />
                  </Box>
                  <Box display='block' width='45%' paddingTop="16px">
                    <Text fontSize='lg'>Email: </Text>
                    <Input defaultValue={initialState.email} {...register("email")} disabled />
                  </Box>
                </Box>
              </TabPanel>

              <TabPanel>
                <form onSubmit={handleSubmit(onSubmit)}>
                  <Box display="flex" justifyContent="space-between">
                    <Box display='block' width='45%' paddingTop="16px">
                      <Text fontSize='lg'>First name: </Text>
                      <Input defaultValue={initialState.account.name} {...register("name")} />
                    </Box>
                    <Box display='block' width='45%' paddingTop="16px">
                      <Text fontSize='lg'>Last name: </Text>
                      <Input defaultValue={initialState.account.lastName} {...register("lastName")} />
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Box display='block' width='45%' paddingTop="16px">
                      <Text fontSize='lg'>Middle name: </Text>
                      <Input defaultValue={initialState.account.middleName} {...register("middleName")} />
                    </Box>
                    <Box display='block' width='45%' paddingTop="16px">
                      <Text fontSize='lg'>Birth date: </Text>
                      <Input defaultValue={initialState.account.birthdayDate.substring(0, 10)} {...register("birthdayDate")} />
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Box display='block' width='45%' paddingTop="16px">
                      <Text fontSize='lg'>Wanted position: </Text>
                      <Input defaultValue={initialState.account.wantedPosition} {...register("wantedPosition")} />
                    </Box>
                    <Box display='block' width='45%' paddingTop="16px">
                      <Text fontSize='lg'>About yourself: </Text>
                      <Input defaultValue={initialState.account.aboutYourself} {...register("aboutYourself")} />
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Box display='block' width='45%' paddingTop="16px">
                      <Text fontSize='lg'>Educational institution of category: </Text>
                      <Select defaultValue={initialState.account.educationalInstitutionCategory} {...register("educationalInstitutionCategory")}
                        onChange={(e) => { e.target.value; console.log("e.target.value: ", e.target.value) }}
                      >
                        {educationalInstitutionCategories.map((item: any) => {
                          return (
                            <option key={item.id} value={item.code}>{item.name}</option>
                          )
                        })}
                      </Select>
                    </Box>
                    <Box display='block' width='45%' paddingTop="16px">
                      <Text fontSize='lg'>Educational institution of category: </Text>
                      <Select defaultValue={initialState.account.educationDegrees} {...register("educationDegrees")}>
                        {educationDegrees.map((item: any) => {
                          return (
                            <option key={item.id}
                              value={item.code}
                            >{item.name}</option>
                          )
                        })}
                      </Select>
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Box display='block' width='45%' paddingTop="16px">
                      <Text fontSize='lg'>Educational institution of category: </Text>
                      <Select defaultValue={initialState.account.country} {...register("country")}>
                        {country.map((item: any) => {
                          return (
                            <option key={item.id} value={item}>{item.name}</option>
                          )
                        })}
                      </Select>
                    </Box>
                    <Box display='block' width='45%' paddingTop="16px"></Box>
                  </Box>

                  <Box display="flex" justifyContent="center" paddingTop="36px" >
                    <Button type="submit" colorScheme="blue" width="250px">
                      Submit
                    </Button>
                  </Box>
                </form>
              </TabPanel>
              <TabPanel>
                Three
              </TabPanel>
              <TabPanel>
                Four
              </TabPanel>
            </TabPanels>
          </Tabs>


        </Box>
      </Box>

    </Box >
  );
};