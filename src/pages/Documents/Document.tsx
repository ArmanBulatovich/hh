import { Box, Button, Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerFooter, DrawerHeader, DrawerOverlay, Input, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr, useDisclosure } from '@chakra-ui/react'
import { useEffect, useState, useRef } from 'react';

export const Document = () => {
  const tokenFromLocalStorage = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${tokenFromLocalStorage}` };
  const [documents, setDocuments] = useState<any>([]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const btnRef = useRef();

  return (
    <Box>
      <Text display='flex' justifyContent="center" fontSize={24} mb={5}>Documents</Text>
      <Box display="flex" justifyContent="center">
        <TableContainer width="80%">
          <Table variant='simple'>
            {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
            <Thead>
              <Tr>
                <Th>Name</Th>
                <Th>Language</Th>
                <Th isNumeric>Price</Th>
              </Tr>
            </Thead>
            <Tbody>
              {documents.map((item: any) => (
                <Tr cursor="pointer" onClick={onOpen} ref={btnRef} colorScheme='teal'>
                  <Td>{item.name}</Td>
                  <Td>{item.language.name}</Td>
                  <Td isNumeric>{item.price}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
      <Drawer
        isOpen={isOpen}
        placement='right'
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
            <Button variant='outline' mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button colorScheme='blue'>Save</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </Box>
  )
}