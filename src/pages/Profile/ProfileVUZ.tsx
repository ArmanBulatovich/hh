import { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useForm } from "react-hook-form";
import { Box, Button, Input, Select, Text } from "@chakra-ui/react";

import { expressService } from "../../axiosConfig";

export const ProfileVUZ = () => {
  const tokenFromLocalStorage = localStorage.getItem("token");
  const { handleSubmit, control, register } = useForm();
  const [initialState, setInitialState] = useState<any>();
  const [
    educationalInstitutionCategories,
    setEducationalInstitutionCategories,
  ] = useState<any>([]);
  const [countries, setCountries] = useState<any>([]);
  const [countryId, setCountryId] = useState<any>();
  const [cities, setCities] = useState<any>([]);

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
        setCountryId(data.data.account.country.id);
      },
    }
  );

  useEffect(() => {
    expressService
      .get("references/educational-institution-categories", {
        headers: {
          Authorization: `Bearer ${tokenFromLocalStorage}`,
        },
      })
      .then((res) => setEducationalInstitutionCategories(res.data.data));

    expressService
      .get("references/countries", {
        headers: {
          Authorization: `Bearer ${tokenFromLocalStorage}`,
        },
      })
      .then((res) => setCountries(res.data.data));
  }, []);

  useEffect(() => {
    if (countryId) {
      expressService
        .get(`references/cities/${countryId}`, {
          headers: {
            Authorization: `Bearer ${tokenFromLocalStorage}`,
          },
        })
        .then((res) => setCities(res.data.data));
    }
  }, [countryId]);

  const onSubmit = (data: any) => {
    const educationalInstitutionCategory =
      educationalInstitutionCategories.find(
        (item: any) => item.code === data.educationalInstitutionCategory
      );
    const country = countries.find((item: any) => item.id === data.country);
    const city = cities.find((item: any) => item.id === data.city);
    expressService.patch(
      "educational-institution",
      { ...data, educationalInstitutionCategory, country, city },
      {
        headers: {
          Authorization: `Bearer ${tokenFromLocalStorage}`,
        },
      }
    );
  };

  return (
    <Box mt="30px" mb="80px">
      <Box display="flex" justifyContent="center">
        <Box width="80%">
          <Box>
            {initialState && (
              <Box display="flex" justifyContent="space-between">
                <Box display="block" width="45%" mb="16px">
                  <Text fontSize="lg">Phone Number: </Text>
                  <Input defaultValue={initialState.phoneNumber} disabled />
                </Box>
                <Box display="block" width="45%" paddingTop="16px">
                  <Text fontSize="lg">Email: </Text>
                  <Input defaultValue={initialState?.email} disabled />
                </Box>
              </Box>
            )}
          </Box>
          <form onSubmit={handleSubmit(onSubmit)}>
            {initialState && (
              <Box>
                <Box display="flex" justifyContent="space-between" mb="16px">
                  <Box width="45%">
                    <Text fontSize="lg">
                      Название ВУЗа
                    </Text>
                    <Input
                      defaultValue={initialState?.account?.name}
                      {...register("name")}
                    />
                  </Box>
                  <Box width="45%">
                    <Text fontSize="lg">
                      Адрес ВУЗа
                    </Text>
                    <Input
                      defaultValue={initialState?.account?.address}
                      {...register("address")}
                    />
                  </Box>
                </Box>
                <Box display="flex" justifyContent="space-between" mb="16px">
                  <Box display="block" width="45%">
                    <Text fontSize="lg">
                      Educational institution of category:
                    </Text>
                    <Select
                      defaultValue={initialState?.account?.educationalInstitutionCategory?.name}
                      {...register("educationalInstitutionCategory")}
                    >
                      {educationalInstitutionCategories.map((item: any) => {
                        return (
                          <option key={item.id} value={item.code}>
                            {item.name}
                          </option>
                        );
                      })}
                    </Select>
                  </Box>
                  <Box width="45%">
                    <Text fontSize="lg">
                      Описание ВУЗа
                    </Text>
                    <Input
                      defaultValue={initialState?.account?.aboutYourself}
                      {...register("aboutYourself")}
                    />
                  </Box>
                </Box>

                <Box display="flex" justifyContent="space-between">
                  <Box display="block" width="45%">
                    <Text fontSize="lg">Countries:</Text>
                    <Select
                      defaultValue={initialState?.account?.country?.name}
                      {...register("country")}
                      onChange={(e) => {
                        setCountryId(e.target.value);
                      }}
                    >
                      {countries.map((item: any) => {
                        return (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </Select>
                  </Box>
                  <Box display="block" width="45%">
                    <Text fontSize="lg">Countries:</Text>
                    <Select
                      defaultValue={initialState?.account?.city?.name}
                      {...register("city")}
                    >
                      {cities.map((item: any) => {
                        return (
                          <option key={item.id} value={item.id}>
                            {item.name}
                          </option>
                        );
                      })}
                    </Select>
                  </Box>
                </Box>
              </Box>
            )}
            <Box display="flex" justifyContent="center" paddingTop="36px">
              <Button type="submit" colorScheme="blue" width="250px">
                Submit
              </Button>
            </Box>
          </form>
        </Box>
      </Box >
    </Box >
  );
};
