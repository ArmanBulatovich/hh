import {
  Box,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { expressService } from "../../axiosConfig";

export const GetBoughtDocuments = () => {
  const navigate = useNavigate();
  const { status } = useParams();
  const tokenFromLocalStorage = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${tokenFromLocalStorage}` };
  const [documents, setDocuments] = useState<any>([]);

  useEffect(() => {
    if (status === "uploaded") {
      expressService
        .get("documents/teacher/uploaded", { headers: headers })
        .then((res) => {
          console.log(res.data.data);
          setDocuments(res.data.data);
        });
    } else if (status === "bought") {
      expressService
        .get("users/bought-documents", { headers: headers })
        .then((res) => {
          console.log(res.data.data);
          setDocuments(res.data.data);
        });
    } else {
      expressService.get("documents", { headers: headers }).then((res) => {
        console.log(res.data.data);
        setDocuments(res.data.data);
      });
    }
  }, []);

  return (
    <Box>
      <Text display="flex" justifyContent="center" fontSize={24} mb={5}>
        Documents
      </Text>
      <Box display="flex" justifyContent="center">
        {documents.length === 0 ? (
          <Text>No documents bought yet</Text>
        ) : (
          <TableContainer width="80%">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Name</Th>
                  <Th>Language</Th>
                  {/* <Th>Subjects</Th> */}
                  <Th isNumeric>Price</Th>
                </Tr>
              </Thead>
              <Tbody>
                {documents.map((item: any) => (
                  <Tr
                    cursor={status !== "not-bought" ? "not-allowed" : "pointer"}
                    onClick={() => {
                      // navigate(`${item.id}`)
                      if (status === "not-bought") {
                        navigate(`${item.id}`);
                      }
                    }}
                  >
                    <Td>{item.name}</Td>
                    <Td>{item.language.name}</Td>
                    {/* <Td>{item.subjects.map((item: any) => {
                    return item.name
                  })}</Td> */}
                    <Td isNumeric>{item.price}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Box>
  );
};
