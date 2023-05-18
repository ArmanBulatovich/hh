import { Box, Button, Input, Select, Switch, Text } from "@chakra-ui/react";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import MultiSelect from 'react-select';
import makeAnimated from 'react-select/animated';

import { expressService } from "../../axiosConfig";

export const AddingAds = () => {
  const animatedComponents = makeAnimated();
  const tokenFromLocalStorage = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${tokenFromLocalStorage}` };
  const { handleSubmit, register } = useForm();
  const [educationalInstitutionCategories, setEducationalInstitutionCategories] = useState<any>([]);
  const [org, setOrg] = useState<any>();
  const [orgId, setOrgId] = useState<any>();
  const [currencies, setCurrencies] = useState<any>([]);
  const [subjects, setSubjects] = useState<any>([]);
  const [languages, setLanguages] = useState<any>([]);
  const [types, setTypes] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [selectedSubjects, setSelectedSubjects] = useState<any>([]);

  useEffect(() => {
    expressService
      .get("references/educational-institution-categories", {
        headers: headers,
      })
      .then((res) => setEducationalInstitutionCategories(res.data.data));

    expressService
      .get("references/currencies", { headers: headers })
      .then((res) => {
        setCurrencies(res.data.data);
      });

    expressService
      .get("references/languages", { headers: headers })
      .then((res) => {
        setLanguages(res.data.data);
      });

    expressService
      .get("references/document-types", { headers: headers })
      .then((res) => {
        setTypes(res.data.data);
      });
  }, []);

  useEffect(() => {
    if (org) {
      setOrgId(
        educationalInstitutionCategories.find((item: any) => item.code === org)
          .id
      );
    }
    if (orgId) {
      expressService
        .get(`references/subject-categories/${orgId}`, { headers: headers })
        .then((res) => {
          setSubjects(res.data.data);
        });

      expressService
        .get(`references/subject-categories/${orgId}`, { headers: headers })
        .then((res) => {
          setCategories(res.data.data);
        });
    }
  }, [org, orgId]);

  const onSubmit = (data: any) => {
    const educationalInstitutionCategory =
      educationalInstitutionCategories.find(
        (item: any) => item.code === data.educationalInstitutionCategory
      );
    const currency = currencies.find(
      (item: any) => item.code === data.currency
    );
    const language = languages.find((item: any) => item.code === data.language);
    const type = types.find((item: any) => item.name === data.type);
    const category = categories.find(
      (item: any) => item.name === data.category
    );
    const subjects = selectedSubjects;
    const price = Number(data.price);
    const url = "";
    expressService.post('documents', { ...data, educationalInstitutionCategory, currency, language, type, category, subjects, price, url }, { headers: headers })
      .then(res => {
        if (res.status === 200) {
          console.log("res.data: ", res.data);
        }
      })
  };

  return (
    <Box mt="10px" mb="30px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="center">
          <Box width="80%" mb="20px">
            <Text fontSize={28} display="flex" justifyContent="center">
              Adding ads
            </Text>
            <Box mt="20px">
              <Text>Add title</Text>
              <Input placeholder="Add title" {...register("name")} />
            </Box>
            <Box mt="30px">
              <Text>Add description</Text>
              <Input placeholder="Add description" {...register("description")} />
            </Box>
            <Box mt="30px">
              <Text fontSize="lg">Educational institution of category:</Text>
              <Select
                {...register("educationalInstitutionCategory")}
                placeholder="Select educational institution category"
                onChange={(e: any) => setOrg(e.target.value)}
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
            <Box mt="30px">
              <Text fontSize="lg">Currency:</Text>
              <Select placeholder="Select currency" {...register("currency")}>
                {currencies.map((item: any) => {
                  return (
                    <option key={item.id} value={item.code}>
                      {item.name}
                    </option>
                  );
                })}
              </Select>
            </Box>
            {orgId && (
              <>
                <Box mt="30px">
                  <Text fontSize="lg">Subjects:</Text>
                  <MultiSelect
                    closeMenuOnSelect={false}
                    components={animatedComponents}
                    options={subjects}
                    onChange={setSelectedSubjects}
                    isMulti
                  />
                </Box>
                <Box mt="30px">
                  <Text fontSize="lg">Category of document:</Text>
                  <Select placeholder="Select category" {...register("category")}>
                    {categories.map((item: any) => {
                      return (
                        <option key={item.id} value={item.code}>
                          {item.name}
                        </option>
                      );
                    })}
                  </Select>
                </Box>
              </>
            )}
            <Box mt="30px">
              <Text>Add price</Text>
              <Input placeholder="Add price" {...register("price")} />
            </Box>
            <Box display="flex" justifyContent="space-between">
              <Box mt="30px">
                <Text>Sale access: </Text>
                <Switch {...register("saleAccess")} />
              </Box>
              <Box mt="30px">
                <Text>View profile: </Text>
                <Switch {...register("viewProfileAccess")} />
              </Box>
            </Box>
            <Box mt="30px">
              <Text fontSize="lg">Language:</Text>
              <Select placeholder="Select language" {...register("language")}>
                {languages.map((item: any) => {
                  return (
                    <option key={item.id} value={item.code}>
                      {item.name}
                    </option>
                  );
                })}
              </Select>
            </Box>
            <Box mt="30px">
              <Text fontSize="lg">Type of document:</Text>
              <Select placeholder="Select type" {...register("type")}>
                {types.map((item: any) => {
                  return (
                    <option key={item.id} value={item.code}>
                      {item.name}
                    </option>
                  );
                })}
              </Select>
            </Box>
          </Box>
        </Box>
        <Box display="flex" justifyContent="center" pb={10}>
          <Button type="submit" colorScheme="blue" width="250px">Submit</Button>
        </Box>
      </form>
    </Box>
  );
};