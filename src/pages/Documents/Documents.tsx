import { Box, Table, TableCaption, TableContainer, Tbody, Td, Text, Tfoot, Th, Thead, Tr } from '@chakra-ui/react'
import { useEffect, useState } from 'react';

import { expressService } from '../../axiosConfig';

export const Documents = () => {
  const tokenFromLocalStorage = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${tokenFromLocalStorage}` };
  const [documents, setDocuments] = useState<any>([]);

  useEffect(() => {
    expressService
      .get("documents", { headers: headers })
      .then((res) => {
        console.log(res.data.data);
        setDocuments(res.data.data);
      });
  }, []);

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
                <Tr cursor="pointer">
                  <Td>{item.name}</Td>
                  <Td>{item.language.name}</Td>
                  <Td isNumeric>{item.price}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  )
}
