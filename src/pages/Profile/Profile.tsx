import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Button, Input, Select, Tab, TabList, TabPanel, TabPanels, Tabs, Text } from "@chakra-ui/react";
import { useQuery } from "react-query";

import { expressService } from "../../axiosConfig";

export const Profile = () => {
  const { handleSubmit, register } = useForm();
  const [initialState, setInitialState] = useState<any>();
  const [educationalInstitutionCategories, setEducationalInstitutionCategories] = useState<any>([]);
  const [educationDegrees, setEducationDegrees] = useState<any>([]);
  const [countries, setCountries] = useState<any>([]);
  const [add, setAdd] = useState(false);
  const [showPlus, setShowPlus] = useState(true);
  const tokenFromLocalStorage = localStorage.getItem("token");

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
    const newExperience = {
      workPlaceName: data.newWorkPlaceNameL,
      position: data.newPositionL,
      startDate: data.newStartDate,
      endDate: data.newEndDate,
      accomplishments: data.newAccomplishments,
    }
    console.log('newExperience: ', newExperience);
    const experiences = [...initialState.account.experiences, newExperience];

    expressService.patch("teacher", {
      ...data, educationalInstitutionCategory, country, experiences
    }, {
      headers: {
        Authorization: `Bearer ${tokenFromLocalStorage}`,
      },
    })
      .then((res) => {
        if (res.status === 200) {
          setShowPlus(true);
          setAdd(false);
          // setInitialState(res.data.data);
        }
      })
  }

  return (
    <Box mt="30px" mb="80px">
      <Box display="flex" justifyContent="center">
        <Box width="80%">
          <Text fontSize="3xl" display="flex" justifyContent="center" color="blue" pb="36px">Profile page</Text>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Box display='flex' justifyContent='space-between'>
              <Box display='block' width='45%' paddingTop="16px">
                <Text fontSize='lg'>Phone Number: </Text>
                <Input defaultValue={initialState?.phoneNumber} {...register("phoneNumber")} disabled />
              </Box>
              <Box display='block' width='45%' paddingTop="16px">
                <Text fontSize='lg'>Email: </Text>
                <Input defaultValue={initialState?.email} {...register("email")} disabled />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box display='block' width='45%' paddingTop="16px">
                <Text fontSize='lg'>First name: </Text>
                <Input defaultValue={initialState?.account.name} {...register("name", { required: true, minLength: 2 })} />
              </Box>
              <Box display='block' width='45%' paddingTop="16px">
                <Text fontSize='lg'>Last name: </Text>
                <Input defaultValue={initialState?.account.lastName} {...register("lastName")} />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box display='block' width='45%' paddingTop="16px">
                <Text fontSize='lg'>Middle name: </Text>
                <Input defaultValue={initialState?.account.middleName} {...register("middleName")} />
              </Box>
              <Box display='block' width='45%' paddingTop="16px">
                <Text fontSize='lg'>Birth date: </Text>
                <Input defaultValue={initialState?.account.birthdayDate.substring(0, 10)} {...register("birthdayDate")} />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box display='block' width='45%' paddingTop="16px">
                <Text fontSize='lg'>Wanted position: </Text>
                <Input defaultValue={initialState?.account.wantedPosition} {...register("wantedPosition")} />
              </Box>
              <Box display='block' width='45%' paddingTop="16px">
                <Text fontSize='lg'>About yourself: </Text>
                <Input defaultValue={initialState?.account.aboutYourself} {...register("aboutYourself")} />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box display='block' width='45%' paddingTop="16px">
                <Text fontSize='lg'>Educational institution of category:</Text>
                <Select defaultValue={initialState?.account.educationalInstitutionCategory.code}
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
                <Select defaultValue={initialState?.account.educationDegrees} {...register("educationDegrees")}>
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
                <Select defaultValue={initialState?.account.country} {...register("country")}>
                  {countries.map((item: any) => {
                    return (
                      <option key={item.id} value={item.id}>{item.name}</option>
                    )
                  })}
                </Select>
              </Box>
              <Box display='block' width='45%' paddingTop="16px"></Box>
            </Box>

            {/* {initialState?.account?.experiences.map((item: any, index: any) => {
              return (
                <Box borderBottom="1px solid grey" paddingBottom="24px" key={index}>
                  <Box display="flex" justifyContent="space-between">
                    <Box display='block' width='45%' paddingTop="16px">
                      <Text fontSize='lg'>Work place name: </Text>
                      <Input defaultValue={item.workPlaceName} disabled
                      // {...register("workPlaceName")}
                      />
                    </Box>
                    <Box display='block' width='45%' paddingTop="16px">
                      <Text fontSize='lg'>Position: </Text>
                      <Input defaultValue={item.position} disabled
                      // {...register("position")} 
                      />
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Box display='block' width='45%' paddingTop="16px">
                      <Text fontSize='lg'>Time begin: </Text>
                      <Input defaultValue={item.timeBegin} disabled
                      // {...register("timeBegin")} 
                      />
                    </Box>
                    <Box display='block' width='45%' paddingTop="16px">
                      <Text fontSize='lg'>Time end: </Text>
                      <Input defaultValue={item.timeEnd} disabled
                      // {...register("timeEnd")} 
                      />
                    </Box>
                  </Box>
                  <Box display="flex" justifyContent="space-between">
                    <Box display='block' width='100%' paddingTop="16px">
                      <Text fontSize='lg'>Accomplishments: </Text>
                      <Input defaultValue={item.accomplishments} disabled
                      // {...register("accomplishments")} 
                      />
                    </Box>
                  </Box>
                </Box>
              )
            })}
            {!showPlus && <Button type="submit" marginTop="24px" onClick={() => { setAdd(false); setShowPlus(true); }}>-</Button>}
            {
              add &&
              <Box borderBottom="1px solid grey" paddingBottom="24px">
                <Box display="flex" justifyContent="space-between">
                  <Box display='block' width='45%' paddingTop="16px">
                    <Text fontSize='lg'>Work place name: </Text>
                    <Input {...register("newWorkPlaceNameL", { required: true })} />
                  </Box>
                  <Box display='block' width='45%' paddingTop="16px">
                    <Text fontSize='lg'>Position: </Text>
                    <Input {...register("newPositionL", { required: true })} />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display='block' width='45%' paddingTop="16px">
                    <Text fontSize='lg'>Time begin: </Text>
                    <Input {...register("newStartDate", { required: true })} />
                  </Box>
                  <Box display='block' width='45%' paddingTop="16px">
                    <Text fontSize='lg'>Time end: </Text>
                    <Input {...register("newEndDate", { required: true })} />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Box display='block' width='100%' paddingTop="16px">
                    <Text fontSize='lg'>Accomplishments: </Text>
                    <Input {...register("newAccomplishments", { required: true })} />
                  </Box>
                </Box>
              </Box>
            }

            {showPlus && <Button type="submit" marginTop="24px" onClick={() => { setAdd(true); setShowPlus(false); }}>+</Button>}
 */}

            <Box display="flex" justifyContent="center" paddingTop="36px" >
              <Button type="submit" colorScheme="blue" width="250px">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Box>
    </Box >
  );
};