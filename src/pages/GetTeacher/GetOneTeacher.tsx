import {
  Box,
  Button,
  Table,
  Tbody,
  Td,
  Text,
  Tr,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
  TableContainer,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { useQuery } from "react-query";
import { useNavigate, useParams } from "react-router";
import { getTeacherById } from "../../api/teacher";
import { expressService } from "../../axiosConfig";
import { queryClient } from "../../queryClient";

export const GetOneTeacher = () => {
  const tokenFromLocalStorage = localStorage.getItem("token");
  const { id } = useParams();
  const headers = { Authorization: `Bearer ${tokenFromLocalStorage}` };

  const { data: teacher, isLoading: teacherLoading } = useQuery(
    `teacher/${id}`,
    () => getTeacherById(id ? id : "")
  );
  console.log("teacher", teacher);

  // const lastExperience = () => {
  //   const experiences = document?.teacher.experiences;
  //   if (experiences && experiences.length > 0) {
  //     const lastItem = experiences[experiences.length - 1];
  //     return <Text>{lastItem.workPlaceName}</Text>;
  //   } else {
  //     return <Text>No experiences found.</Text>;
  //   }
  // };

  return (
    <Box>
      <Text
        display="flex"
        justifyContent="center"
        fontSize={24}
        mb={5}
        fontWeight={500}
      >
        {teacher?.data?.name} {teacher?.data?.middleName}{" "}
        {teacher?.data?.lastName}
      </Text>
      <Box display="flex" justifyContent="center">
        <TableContainer width="80%">
          <Table variant="simple">
            <Tbody>
            {teacher?.data?.info !== "null" && (
                <>
                  <Tr>
                    <Td fontSize="18px">Email: </Td>
                    <Td fontSize="18px">{teacher?.data?.info.email}</Td>
                  </Tr>
                  <Tr>
                    <Td fontSize="18px">Phone number: </Td>
                    <Td fontSize="18px">{teacher?.data?.info.phoneNumber}</Td>
                  </Tr>
                </>
              )}
              <Tr>
                <Td fontSize="18px">About yourself: </Td>
                <Td fontSize="18px">{teacher?.data?.aboutYourself}</Td>
              </Tr>
              <Tr>
                <Td fontSize="18px">Wanted position: </Td>
                <Td fontSize="18px">{teacher?.data?.wantedPosition}</Td>
              </Tr>
              <Tr>
                <Td fontSize="18px">Country: </Td>
                <Td fontSize="18px">
                  {teacher?.data?.country && teacher?.data?.country.name}
                </Td>
              </Tr>
              <Tr>
                <Td fontSize="18px">City: </Td>
                <Td fontSize="18px">
                  {teacher?.data?.city && teacher?.data?.city.name}
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Accordion defaultIndex={[0]} allowMultiple width="100%">
            <AccordionItem>
              <h2>
                <AccordionButton mt="20px">
                  <Box
                    as="span"
                    flex="1"
                    textAlign="left"
                    fontSize="18px"
                    fontWeight="500"
                  >
                    Experiences
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {teacher?.data?.experiences.map((item: any) => (
                  <Box mt={5} key={item.id}>
                    <Box display="flex">
                      <Text width="50%" fontSize="18px">
                        Место работы: {item.workPlaceName}
                      </Text>
                      <Text width="50%" fontSize="18px">
                        Должность: {item.position}
                      </Text>
                    </Box>
                    <Box display="flex">
                      <Text width="50%" fontSize="18px">
                        Дата начала: {item.timeBegin}
                      </Text>
                      <Text width="50%" fontSize="18px">
                        Дата окончания: {item.timeEnd}
                      </Text>
                    </Box>
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Box display="flex" justifyContent="center" mt={10}>
            {teacher?.data?.info === "null" && (
              <Button
                disabled={teacher?.data?.salesAccess}
                onClick={() => {
                  expressService
                    .post(
                      "educational-institution/buy-teacher",
                      { teacherId: id },
                      { headers: headers }
                    )
                    .then((res: any) => {
                      if (res.success) {
                        alert("You bought contact of teacher");
                        queryClient.invalidateQueries(`/teacher/${id}`);
                      } else {
                        alert("You don't have enough money");
                      }
                    })
                    .catch((err: any) => {
                      alert(`Error: ${err}`);
                    });
                }}
              >
                Buy contact of teacher
              </Button>
            )}
          </Box>
        </TableContainer>
      </Box>
    </Box>
  );
};
