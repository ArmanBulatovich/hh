import { Box, Button, Input, Select, Switch, Text } from "@chakra-ui/react";
import { useState, useEffect, SetStateAction } from "react";
import { useForm } from "react-hook-form";
import { MultiSelect, useMultiSelect } from "chakra-multiselect";

import { expressService } from "../../axiosConfig";

export const AddingAds = () => {
  const subj = [
    {
      id: "1",
      value: "1",
      label: "1",
    },
    {
      id: "2",
      value: "2",
      label: "2",
    },
  ];
  const tokenFromLocalStorage = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${tokenFromLocalStorage}` };
  const { handleSubmit, control, register } = useForm();
  const [
    educationalInstitutionCategories,
    setEducationalInstitutionCategories,
  ] = useState<any>([]);
  const [org, setOrg] = useState<any>();
  console.log("org: ", org);
  const [orgId, setOrgId] = useState<any>();
  console.log("orgId: ", orgId);
  const [currencies, setCurrencies] = useState<any>([]);
  const [subjects, setSubjects] = useState<any>([]);
  const [languages, setLanguages] = useState<any>([]);
  const [types, setTypes] = useState<any>([]);
  const [categories, setCategories] = useState<any>([]);
  const [selectedSubj, setSelectedSubj] = useState<any>([]);
  console.log("selectedSubj: ", selectedSubj);
  console.log("subjects: ", subjects);

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
          console.log("res.data: ", res.data.data);
          setSubjects(res.data.data);
        });

      expressService
        .get(`references/subject-categories/${orgId}`, { headers: headers })
        .then((res) => {
          setCategories(res.data.data);
        });
    }
  }, [org, orgId]);

  // const handleSelectionChange = (selectedItems: any) => {
  //   setSelectedSubj(selectedItems);
  // };

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
    const subjects = selectedSubj;
    console.log(data.category);
    console.log({
      ...data,
      educationalInstitutionCategory,
      currency,
      language,
      type,
      category,
      subjects,
    });
  };

  return (
    <Box mt="30px" mb="80px">
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="center">
          <Box width="80%" mb={14}>
            <Text fontSize={28} display="flex" justifyContent="center">
              Adding ads
            </Text>
            <Box mt="30px">
              <Text>Add title</Text>
              <Input placeholder="Add title" {...register("name")} />
            </Box>
            <Box mt="30px">
              <Text>Add description</Text>
              <Input
                placeholder="Add description"
                {...register("description")}
              />
            </Box>
            <Box mt="30px">
              <Text fontSize="lg">Educational institution of category:</Text>
              <Select
                placeholder="Select educational institution category"
                {...register("educationalInstitutionCategory")}
                onChange={(e) => setOrg(e.target.value)}
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
                  <MultiSelect
                    options={subj}
                    value={selectedSubj}
                    label="Subjects:"
                    onChange={setSelectedSubj}
                    placeholder="Select subjects"
                  />
                  {/* <Text fontSize="lg">Subject:</Text>
              <Select {...register("subject")}>
                {subjects.map((item: any) => {
                  return (
                    <option key={item.id} value={item.code}>
                      {item.name}
                    </option>
                  );
                })} 
              </Select>*/}
                </Box>
                <Box mt="30px">
                  <Text fontSize="lg">Category of document:</Text>
                  <Select
                    placeholder="Select category"
                    {...register("category")}
                  >
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

            {/* <Box mt="30px">
              <Text fontSize="lg">Subject:</Text>
              <Select {...register("subject")}>
                {subjects.map((item: any) => {
                  return (
                    <option key={item.id} value={item.code}>
                      {item.name}
                    </option>
                  );
                })}
              </Select>
            </Box> */}

            <Box mt="30px">
              <Text>Add price</Text>
              <Input placeholder="Add price" {...register("price")} />
            </Box>
            <Box mt="30px">
              <Text>URL: </Text>
              <Input placeholder="URL" {...register("url")} />
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
          <Button type="submit" colorScheme="blue" width="250px">
            Submit
          </Button>
        </Box>
      </form>
    </Box>
  );
};
