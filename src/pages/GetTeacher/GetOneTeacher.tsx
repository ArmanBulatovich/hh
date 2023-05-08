import {
  Box,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Input,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { useEffect, useState, useRef } from "react";
import { useNavigate, useParams } from "react-router";
import { expressService } from "../../axiosConfig";

export const GetOneTeacher = () => {
  const tokenFromLocalStorage = localStorage.getItem("token");
  const { id } = useParams();
  const headers = { Authorization: `Bearer ${tokenFromLocalStorage}` };
  const [teacher, setTeacher] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  useEffect(() => {
    expressService
      .get(`teacher/${id}`, { headers: headers })
      .then((res: any) => {
        console.log(res.data.data);
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
      <Text display="flex" justifyContent="center" fontSize={24} mb={5}>
        {teacher?.name} {teacher?.middleName} {teacher?.lastName}
      </Text>
      <Box display="flex" justifyContent="center">
        <TableContainer width="80%">
          <Table variant="simple">
            <Tbody>
              {/* <Tr>
                  <Td>Full name: </Td>
                  <Td>{teacher?.name} {teacher?.middleName} {teacher?.lastName}</Td>
                </Tr> */}
              <Tr>
                <Td>About yourself: </Td>
                <Td>{teacher?.aboutYourself}</Td>
              </Tr>
              <Tr>
                <Td>Wanted position: </Td>
                <Td>{teacher?.wantedPosition}</Td>
              </Tr>
              <Tr>
                <Td>Country: </Td>
                <Td>{teacher?.country && teacher?.country.name}</Td>
              </Tr>
              <Tr>
                <Td>City: </Td>
                <Td>{teacher?.city && teacher?.city.name}</Td>
              </Tr>
            </Tbody>
          </Table>
          <Accordion defaultIndex={[0]} allowMultiple width="100%">
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Experiences
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                {teacher?.experiences.map((item: any) => (
                  <Box mt={5}>
                    <Box display="flex">
                      <Text width="50%">Место работы: {item.workPlaceName}</Text>
                      <Text width="50%">Должность: {item.position}</Text>
                    </Box>
                    <Box display="flex">
                      <Text width="50%">Дата начала: {item.timeBegin}</Text>
                      <Text width="50%">Дата окончания: {item.timeEnd}</Text>
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
                Buy
              </Button>
            }
          </Box>
        </TableContainer>
      </Box>
    </Box>
  );
};
