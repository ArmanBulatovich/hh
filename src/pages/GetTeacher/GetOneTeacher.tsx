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
import { useNavigate, useParams } from "react-router";
import { expressService } from "../../axiosConfig";

export const GetOneTeacher = () => {
  const tokenFromLocalStorage = localStorage.getItem("token");
  const { id } = useParams();
  const headers = { Authorization: `Bearer ${tokenFromLocalStorage}` };
  const [teacher, setTeacher] = useState<any>();

  useEffect(() => {
    expressService
      .get(`teacher/${id}`, { headers: headers })
      .then((res: any) => {
        setTeacher(res.data.data);
      });
  }, [id]);

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
      <Text display="flex" justifyContent="center" fontSize={24} mb={5} fontWeight={500}>
        {teacher?.name} {teacher?.middleName} {teacher?.lastName}
      </Text>
      <Box display="flex" justifyContent="center">
        <TableContainer width="80%">
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td fontSize="18px">About yourself: </Td>
                <Td fontSize="18px">{teacher?.aboutYourself}</Td>
              </Tr>
              <Tr>
                <Td fontSize="18px">Wanted position: </Td>
                <Td fontSize="18px">{teacher?.wantedPosition}</Td>
              </Tr>
              <Tr>
                <Td fontSize="18px">Country: </Td>
                <Td fontSize="18px">{teacher?.country && teacher?.country.name}</Td>
              </Tr>
              <Tr>
                <Td fontSize="18px">City: </Td>
                <Td fontSize="18px">{teacher?.city && teacher?.city.name}</Td>
              </Tr>
            </Tbody>
          </Table>
          <Accordion defaultIndex={[0]} allowMultiple width="100%">
            <AccordionItem>
              <h2>
                <AccordionButton mt="20px">
                  <Box as="span" flex="1" textAlign="left" fontSize="18px" fontWeight="500">
                    Experiences
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {teacher?.experiences.map((item: any) => (
                  <Box mt={5} key={item.id}>
                    <Box display="flex">
                      <Text width="50%" fontSize="18px">Место работы: {item.workPlaceName}</Text>
                      <Text width="50%" fontSize="18px">Должность: {item.position}</Text>
                    </Box>
                    <Box display="flex">
                      <Text width="50%" fontSize="18px">Дата начала: {item.timeBegin}</Text>
                      <Text width="50%" fontSize="18px">Дата окончания: {item.timeEnd}</Text>
                    </Box>
                  </Box>
                ))}
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Box display="flex" justifyContent="center" mt={10}>
            {
              <Button
              //   disabled={teacher?.salesAccess}
              //   onClick={() => {
              //     expressService.post(
              //       "users/buy-document",
              //       { teacherId: id },
              //       { headers: headers }
              //     );
              //   }}
              >
                Buy contact of teacher
              </Button>
            }
          </Box>
        </TableContainer>
      </Box>
    </Box>
  );
};
