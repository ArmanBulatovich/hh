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

export const GetTeachers = () => {
  const navigate = useNavigate();
  const { status } = useParams();
  const tokenFromLocalStorage = localStorage.getItem("token");
  const headers = { Authorization: `Bearer ${tokenFromLocalStorage}` };
  const [teachers, setTeachers] = useState<any>([]);

  useEffect(() => {
    expressService
      .get("teacher", { headers: headers })
      .then((res) => {
        setTeachers(res.data.data);
      });
  }, []);

  return (
    <Box>
      <Text display="flex" justifyContent="center" fontSize={24} mb={5}>
        Teachers
      </Text>
      <Box display="flex" justifyContent="center">
        {teachers.length === 0 ? (
          <Text>No teachers</Text>
        ) : (
          <TableContainer width="80%">
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th>Full name</Th>
                  <Th>Wanted position</Th>
                  <Th>Country</Th>
                  <Th>City</Th>
                  <Th>Experience range</Th>
                </Tr>
              </Thead>
              <Tbody>
                {teachers.map((item: any) => (
                  <Tr key={item.id}
                    cursor='pointer'
                    onClick={() => navigate(`${item.id}`)}>
                    <Td>{item.name} {item.middleName} {item.lastName}</Td>
                    <Td>{item.wantedPosition}</Td>
                    <Td>{item.country && item.country.name}</Td>
                    <Td>{item.city && item.city.name}</Td>
                    <Td>{item.experienceRange && item.experienceRange.name}</Td>
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