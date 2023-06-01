import { useForm } from 'react-hook-form';
import { Box, Button, Input, Select, Text, Textarea } from '@chakra-ui/react'
import { useQuery } from 'react-query';
import { useNavigate } from 'react-router-dom';

import { getAllWorkShcedules, experienceRanges, getAllEmploymentTypes, getAllCurrencies, getAllSubjectsByEduCategoryId } from '../../../api/references';
import { getAccount } from '../../../api/account';
import { createVacancy } from '../../../api/vacancy';

export default function CreateVacancy() {
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const { data: workSchedules, isLoading: workSchedulesLoading } = useQuery("references/work-shedules", () => getAllWorkShcedules());
  const { data: experiencesRange, isLoading: experiencesRangeLoading } = useQuery("references/experience-ranges", () => experienceRanges());
  const { data: employmentTypes, isLoading: employmentTypesLoading } = useQuery("references/employment-types", () => getAllEmploymentTypes());
  const { data: currencies, isLoading: currenciesLoading } = useQuery("references/currencies", () => getAllCurrencies());
  console.log("currencies: ", currencies?.data);
  const { data: account } = useQuery("users/account", () => getAccount());
  const { data: subjects, isLoading: subjectsLoading } = useQuery(`references/subjects/id`,
    () => getAllSubjectsByEduCategoryId(account?.data?.account?.educationalInstitutionCategory?.id));

  const onSubmit = (data: any) => {
    const workSchedule = { id: workSchedules?.data?.find((item: any) => item.code === data.workSchedule)?.id }
    const experienceRange = { id: experiencesRange?.data?.find((item: any) => item.code === data.experienceRange)?.id }
    const employmentType = { id: employmentTypes?.data?.find((item: any) => item.code === data.employmentType)?.id }
    const currency = { id: currencies?.data?.find((item: any) => item.code === data.currency)?.id }
    const subjectCategory = { id: subjects?.data?.find((item: any) => item.name === data.subjectCategory)?.id }
    const salary = Number(data.salary);
    createVacancy({ ...data, workSchedule, experienceRange, employmentType, currency, subjectCategory, salary }).then((res) => {
      if (res.success) {
        alert("Vacancy created");
        navigate("/vacancies");
      }
    }).catch((err) => {
      alert("Error: " + err.message);
    });
  }
  
  return (
    <Box>
      <Text textAlign="center" fontSize={20} fontWeight={500}>CreateVacancy</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Box display="flex" justifyContent="center">
          <Box mb="20px" width="70%">
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Box width="45%">
                <Text>Title</Text>
                <Input placeholder="Title" {...register("name")} />
              </Box>
              <Box width="45%">
                <Text>Salary</Text>
                <Input placeholder="Salary" type="number" {...register("salary")} />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Box width="45%">
                <Text>Description</Text>
                <Textarea placeholder="Here is a sample placeholder" size="sm" {...register("description")} />
              </Box>
              <Box width="45%">
                <Text>Condition</Text>
                <Textarea placeholder="Condition" size="sm"{...register("condition")} />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Box width="45%">
                <Text>Responsibility</Text>
                <Textarea placeholder="Responsibility" size="sm" {...register("responsibility")} />
              </Box>
              <Box width="45%">
                <Text>Requirement</Text>
                <Textarea placeholder="Requirement" size="sm" {...register("requirement")} />
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Box width="45%">
                <Text>Work schedule</Text>
                <Select placeholder="Work schedule" {...register("workSchedule")} >
                  {workSchedulesLoading ? (<option>Loading...</option>) : (
                    workSchedules.data?.map((item: any) => (
                      <option key={item.id} value={item.code}>{item.name}</option>
                    ))
                  )}
                </Select>
              </Box>
              <Box width="45%">
                <Text>Currency</Text>
                <Select placeholder="Currency" {...register("currency")} >
                  {currenciesLoading ? (<option>Loading...</option>) : (
                    currencies.data?.map((item: any) => (
                      <option key={item.id} value={item.code}>{item.name}</option>
                    ))
                  )}
                </Select>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Box width="45%">
                <Text>Experience range</Text>
                <Select placeholder="Experience range" {...register("experienceRange")} >
                  {experiencesRangeLoading ? (<option>Loading...</option>) : (
                    experiencesRange.data?.map((item: any) => (
                      <option key={item.id} value={item.code}>{item.name}</option>
                    ))
                  )}
                </Select>
              </Box>
              <Box width="45%">
                <Text>Employment type</Text>
                <Select placeholder="Employment type" {...register("employmentType")} >
                  {employmentTypesLoading ? (<option>Loading...</option>) : (
                    employmentTypes.data?.map((item: any) => (
                      <option key={item.id} value={item.code}>{item.name}</option>
                    ))
                  )}
                </Select>
              </Box>
            </Box>
            <Box display="flex" justifyContent="space-between" mt="20px">
              <Box width="45%">
                <Text>Subject category</Text>
                <Select placeholder="Subject category" {...register("subjectCategory")} >
                  {subjectsLoading ? (<option>Loading...</option>) : (
                    subjects?.data?.map((item: any) => (
                      <option key={item.id} value={item.name}>{item.name}</option>
                    ))
                  )}
                </Select>
              </Box>
            </Box>
            <Box display="flex" justifyContent="center" mt="24px">
              <Button type="submit" colorScheme="blue" width="250px">Submit</Button>
            </Box>
          </Box>
        </Box>
      </form>
    </Box>
  )
}
