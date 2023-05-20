import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import { Box, Button, Select, Text, } from "@chakra-ui/react";
import { ChevronDownIcon, ChevronUpIcon } from "@chakra-ui/icons";

import { getAllDocuments } from "../../api/documents";
import { getAllEducationalInstitutionCategories, getAllLanguages } from "../../api/references";

export const AllDocuments = () => {
  const navigate = useNavigate();
  const [openFilters, setOpenFilters] = useState<boolean>(false);
  const [filter, setFilter] = useState<any>({});
  const [name, setName] = useState<string>("");
  const [languageIds, setLanguageIds] = useState<string>("");
  const [educationalInstitutionCategoryIds, setEducationalInstitutionCategoryIds] = useState<string>("");

  const { data: language, isLoading: languageLoading } = useQuery("references/languages", () => getAllLanguages());
  const { data: educationalInstitutionCategories, isLoading: educationalInstitutionCategoriesLoading } = useQuery("references/educational-institution-categories", () => getAllEducationalInstitutionCategories());
  const { data: documentsData, isLoading: documentsLoading } = useQuery(["documents", filter], () => getAllDocuments(filter))

  useEffect(() => {
    setFilter({ ...filter, languageIds, educationalInstitutionCategoryIds });
  }, [languageIds, educationalInstitutionCategoryIds])

  return (
    <Box>
      <Box display="flex">
        <Box width="100%" display="flex">
          {documentsLoading ? (<Text textAlign="center" mt="10px" width="70%">Loading...</Text>) : (
            documentsData && documentsData.data.length === 0 ? (<Text width="70%" textAlign="center" mt="10px">No documents</Text>) : (
              <Box width="70%" mx="32px">
                <Box display="flex" justifyContent="space-between">
                  <Text display="flex" fontSize={24} mb={5}>Documents</Text>
                  {/* <InputGroup size='md' width="70%">
                    <Input pr='4.5rem' type='text' placeholder='Search by name' value={name} onChange={(e: any) => setName(e.target.value)} />
                    <InputRightElement width='2.5rem'>
                      <SearchIcon />
                    </InputRightElement>
                  </InputGroup> */}
                </Box>
                {documentsData && documentsData.data.map((item: any) => (
                  <Box key={item.id} cursor="pointer" border="1px solid #FF5800" borderRadius="8px" p="12px 20px" height="auto" mb="16px" onClick={() => navigate(`${item.id}`)}>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Text fontSize={20} fontWeight={500}>{item.category.name}: {item.name}</Text>
                      <Text fontSize={20} fontWeight={500}>{item.price} {item.currency.name}</Text>
                    </Box>
                    <Box display="flex" justifyContent="space-between" alignItems="center">
                      <Text fontSize={16} width="50%">{item.description}</Text>
                      <Text fontSize={16}>{item.language.name}</Text>
                    </Box>
                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                      <Text fontSize={16}>For {item.educationalInstitutionCategory.name}</Text>
                    </Box>
                    <Box display="flex" justifyContent="flex-end" alignItems="center">
                      <Text fontSize={14}>{item.updated_at.slice(0, 10)}</Text>
                    </Box>
                  </Box>
                ))}
              </Box>
            ))
          }
          <Box width="30%" display="block">
            <Button rightIcon={openFilters ? <ChevronUpIcon /> : <ChevronDownIcon />} colorScheme='orange' variant='solid'
              onClick={() => setOpenFilters(!openFilters)}>
              Filter
            </Button>
            {openFilters &&
              <Box width="80%">
                {languageLoading ? (<Text textAlign="center" mt="30px">Loading...</Text>) : (
                  <Box mt="16px">
                    <Text>Language</Text>
                    <Select placeholder="Select language" onChange={(e) => setLanguageIds(e.target.value)}>
                      {language && language.data.map((item: any) => (
                        <option value={item.id}>{item.name}</option>
                      ))}
                    </Select>
                  </Box>
                )}
                {/* <Box mt="16px">
                  <Text>Subject</Text>
                  <Select placeholder="Select subject">
                    <option value="busy">Programming</option>
                    <option value="free">Design</option>
                  </Select>
                </Box>
                <Box mt="16px">
                  <Text>Type</Text>
                  <Select placeholder="Select type">
                    <option value="KZ">type 1</option>
                    <option value="USA">type 2</option>
                  </Select>
                </Box>
                <Box mt="16px">
                  <Text>Category</Text>
                  <Select placeholder="Select category">
                    <option value="busy">category 1</option>
                    <option value="free">category 2</option>
                  </Select>
                </Box> */}
                {educationalInstitutionCategoriesLoading ? (<Text textAlign="center" mt="30px">Loading...</Text>) : (
                  <Box mt="16px">
                    <Text>Educational institution category</Text>
                    <Select placeholder="Select educational institution category" onChange={(e) => { setEducationalInstitutionCategoryIds(e.target.value) }}>
                      {educationalInstitutionCategories && educationalInstitutionCategories.data.map((item: any) => (
                        <option value={item.id} key={item.id}>{item.name}</option>))}
                    </Select>
                  </Box>
                )}
              </Box>
            }
          </Box>
        </Box>
      </Box>
    </Box >
  );
};