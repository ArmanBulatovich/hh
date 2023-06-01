import { useState } from 'react';
import { Box, Button, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, Textarea, useDisclosure } from '@chakra-ui/react'
import { useQuery } from 'react-query';
import { useNavigate, useParams } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { getAllVacancies, getVacancyById, postVacancyRequest } from '../../../api/vacancy'
import { queryClient } from '../../../queryClient';

export default function Vacancy() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { handleSubmit, register } = useForm();
  const [vacancyId, setVacancyId] = useState<string | null>(null);
  const { data: vacancy, isLoading: vacancyLoading } = useQuery(`vacancy/${id}`, () => getVacancyById(id ? id : ""));

  const onSubmit = (data: any) => {
    const body = { ...data, vacancy: { id: vacancyId } }
    postVacancyRequest(body).then((res) => {
      if (res.success) {
        alert("Vacancy request created");
        queryClient.invalidateQueries("vacancy");
        onClose();
      }
    }).catch((err) => {
      alert("Error: " + err.message);
    });
  }

  return (
    <Box>
      <Box display="flex">
        <Box width="100%" display="flex" justifyContent="center" mt="36px">
          {vacancyLoading ? (<Text textAlign="center" mt="10px" width="70%">Loading...</Text>) : (
            <Box width="70%" mx="32px">
              {vacancy &&
                <Box border="1px solid #FF5800" borderRadius="8px" p="12px 20px" height="auto" mb="16px">
                  <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Text fontSize={20} fontWeight={500} color="blue" cursor="pointer">{vacancy?.data?.name}</Text>
                    <Text fontSize={20} fontWeight={500}>{vacancy?.data?.salary} {vacancy?.data?.name}</Text>
                  </Box>
                  <Box display="block">
                    <Text fontSize={16} width="50%" mt="4px">{vacancy?.data?.educationalInstitution?.name}</Text>
                    <Text fontSize={16} width="50%" mt="4px">{vacancy?.data?.educationalInstitution?.address}</Text>
                  </Box>
                  <Box display="block">
                    <Text fontSize={16} fontWeight={500} width="50%" mt="8px">Description</Text>
                    <Text fontSize={14} width="50%">{vacancy?.data?.description}</Text>
                    <Text fontSize={16} fontWeight={500} width="50%" mt="8px">Condition</Text>
                    <Text fontSize={1}>{vacancy?.data?.condition}</Text>
                    <Text fontSize={16} fontWeight={500} width="50%" mt="8px">Requirement</Text>
                    <Text fontSize={14}>{vacancy?.data?.requirement}</Text>
                    <Text fontSize={16} fontWeight={500} width="50%" mt="8px">Responsibility</Text>
                    <Text fontSize={14}>{vacancy?.data?.responsibility}</Text>
                    <Box display="flex" alignItems="center" mt="8px">
                      <Text fontSize={16} fontWeight={500} mr="4px">Employment type: </Text>
                      <Text fontSize={14}>{vacancy?.data?.employmentType.name}</Text>
                    </Box>
                    <Box display="flex" alignItems="center" mt="8px">
                      <Text fontSize={16} fontWeight={500} mr="4px">Experience range: </Text>
                      <Text fontSize={14}>{vacancy?.data?.experienceRange?.name}</Text>
                    </Box>
                    <Box display="flex" alignItems="center" mt="8px">
                      <Text fontSize={16} fontWeight={500} mr="4px">Subject category: </Text>
                      <Text fontSize={14}>{vacancy?.data?.subjectCategory?.name}</Text>
                    </Box>
                    <Box display="flex" alignItems="center" mt="8px">
                      <Text fontSize={16} fontWeight={500} mr="4px">Work schedule: </Text>
                      <Text fontSize={14}>{vacancy?.data?.workSchedule?.name}</Text>
                    </Box>
                  </Box>{!vacancy?.data?.isResponse &&
                    <Box display="flex" justifyContent="flex-end" alignItems="center" mt="8px">
                      <Button fontSize={20} fontWeight={500} color="white" backgroundColor="green" onClick={() => { onOpen(); setVacancyId(vacancy?.data?.id) }}>Respond</Button>
                    </Box>}
                </Box>
              }

              <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <form onSubmit={handleSubmit(onSubmit)}>
                  <ModalContent>
                    <ModalHeader>Write an accompanying letter</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                      <Textarea placeholder="An accompanying letter" size="sm" {...register("letter")} />
                    </ModalBody>
                    <ModalFooter>
                      <Button colorScheme='blue' mr={3} type="submit">
                        Save
                      </Button>
                      <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                  </ModalContent>
                </form>
              </Modal>
            </Box>
          )
          }
        </Box>
      </Box>
    </Box>
  )
}