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
  const [countries, setCountries] = useState<any>([]);
  const tokenFromLocalStorage = localStorage.getItem("token");
  const { handleSubmit, control, register } = useForm();

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
    }).then((res) => setCountries(res.data.data));

  }, []);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {data.error.message}</div>;

  const onSubmit = (data: any) => {
    const educationalInstitutionCategory = educationalInstitutionCategories.find((item: any) => item.code === data.educationalInstitutionCategory);
    const country = countries.find((item: any) => item.id === data.country);
    expressService.patch("teacher", { ...data, educationalInstitutionCategory, country }, {
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
                      <Text fontSize='lg'>Educational institution of category:</Text>
                      <Select defaultValue={initialState.account.educationalInstitutionCategory.code}
                        {...register("educationalInstitutionCategory")}
                      >
                        {educationalInstitutionCategories.map((item: any) => {
                          return (
                            <option key={item.id} value={item.code}>{item.name}</option>
                          )
                        })}
                      </Select>
                    </Box>
                    <Box display='block' width='45%' paddingTop="16px">
                      <Text fontSize='lg'>Educational degrees:</Text>
                      <Select defaultValue={initialState.account.educationDegrees} {...register("educationDegrees")}>
                        {educationDegrees.map((item: any) => {
                          return (
                            <option key={item.id} value={item.code}>{item.name}</option>
                          )
                        })}
                      </Select>
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Box display='block' width='45%' paddingTop="16px">
                      <Text fontSize='lg'>Countries:</Text>
                      <Select defaultValue={initialState.account.country} {...register("country")}>
                        {countries.map((item: any) => {
                          return (
                            <option key={item.id} value={item.id}>{item.name}</option>
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
                {initialState.account.experiences.map((item: any, index: any) => {
                  return (
                    <Box borderBottom="1px solid grey" paddingBottom="24px" key={index}>
                      <Box display="flex" justifyContent="space-between">
                        <Box display='block' width='45%' paddingTop="16px">
                          <Text fontSize='lg'>Work place name: </Text>
                          <Input defaultValue={item.workPlaceName} {...register("workPlaceName")} />
                        </Box>
                        <Box display='block' width='45%' paddingTop="16px">
                          <Text fontSize='lg'>Position: </Text>
                          <Input defaultValue={item.position} {...register("position")} />
                        </Box>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Box display='block' width='45%' paddingTop="16px">
                          <Text fontSize='lg'>Time begin: </Text>
                          <Input defaultValue={item.timeBegin} {...register("timeBegin")} />
                        </Box>
                        <Box display='block' width='45%' paddingTop="16px">
                          <Text fontSize='lg'>Time end: </Text>
                          <Input defaultValue={item.timeEnd} {...register("timeEnd")} />
                        </Box>
                      </Box>
                      <Box display="flex" justifyContent="space-between">
                        <Box display='block' width='100%' paddingTop="16px">
                          <Text fontSize='lg'>Accomplishments: </Text>
                          <Input defaultValue={item.accomplishments} {...register("accomplishments")} />
                        </Box>
                      </Box>
                    </Box>
                  )
                })}

                <Button marginTop="24px">+</Button>
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