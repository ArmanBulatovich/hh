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

export const BuyDocument = () => {
  const tokenFromLocalStorage = localStorage.getItem("token");
  const { id } = useParams();
  const headers = { Authorization: `Bearer ${tokenFromLocalStorage}` };
  const [document, setDocument] = useState<any>();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  useEffect(() => {
    expressService
      .get(`documents/${id}`, { headers: headers })
      .then((res: any) => {
        console.log(res.data.data);
        setDocument(res.data.data);
      });
  }, [id]);

  const lastExperience = () => {
    const experiences = document?.teacher.experiences;
    if (experiences && experiences.length > 0) {
      const lastItem = experiences[experiences.length - 1];
      return <Text>{lastItem.workPlaceName}</Text>;
    } else {
      return <Text>No experiences found.</Text>;
    }
  };

  return (
    <Box>
      <Text display="flex" justifyContent="center" fontSize={24} mb={5}>
        {document?.name}
      </Text>
      <Box display="flex" justifyContent="center">
        <TableContainer width="80%">
          <Table variant="simple">
            <Tbody>
              <Tr>
                <Td>Description: </Td>
                <Td>{document?.description}</Td>
              </Tr>
              <Tr>
                <Td>Type: </Td>
                <Td>{document?.type.name}</Td>
              </Tr>
              <Tr>
                <Td>Price: </Td>
                <Td>
                  {document?.price} {document?.currency.name}
                </Td>
              </Tr>
              <Tr>
                <Td>Language: </Td>
                <Td>{document?.language.name}</Td>
              </Tr>
              <Tr>
                <Td>Subjects: </Td>
                <Td>
                  {document?.subjects.map((item: any) => {
                    return <Text>{item.name}</Text>;
                  })}
                </Td>
              </Tr>
            </Tbody>
          </Table>
          <Accordion defaultIndex={[0]} allowMultiple width="100%">
            <AccordionItem>
              <h2>
                <AccordionButton>
                  <Box as="span" flex="1" textAlign="left">
                    Author
                  </Box>
                  <AccordionIcon />
                </AccordionButton>
              </h2>
              <AccordionPanel pb={4}>
                Fullname: {document?.teacher.name}{" "}
                {document?.teacher.middleName} {document?.teacher.lastName}
              </AccordionPanel>
              <AccordionPanel pb={4} display="flex">
                <Text mr={1.5}>Место работы: </Text>
                <Text>{lastExperience()}</Text>
              </AccordionPanel>
            </AccordionItem>
          </Accordion>
          <Box display="flex" justifyContent="center" mt={10}>
            {
              <Button
                disabled={document?.salesAccess}
                onClick={() => {
                  expressService.post(
                    "users/buy-document",
                    { documentId: id },
                    { headers: headers }
                  );
                }}
              >
                Buy
              </Button>
            }
          </Box>
        </TableContainer>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement="right"
        onClose={onClose}
        finalFocusRef={btnRef}
      >
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Create your account</DrawerHeader>

          {/* <DrawerBody>
            <Input placeholder='Type here...' />
          </DrawerBody> */}

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme="blue">Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};
