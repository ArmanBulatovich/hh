import { Box, Button, Input, Select, Text } from "@chakra-ui/react";

export const AddingAds = () => {
  return (
    <Box mt="30px" mb="80px">
      <Box display="flex" justifyContent="center">
        <Box width="80%">
          <Text fontSize={28} display="flex" justifyContent="center">
            Adding ads
          </Text>
          <Box mt="30px">
            <Text>Add title</Text>
            <Input placeholder="Add title" />
          </Box>
          <Box mt="30px">
            <Text>Add description</Text>
            <Input placeholder="Add description" />
          </Box>
          <Box mt="30px">
            <Text>Add price</Text>
            <Input placeholder="Add price" />
          </Box>
          <Box mt="30px">
            <Text>Add subject</Text>
            <Input placeholder="Add subject" />
          </Box>
          <Box mt="30px">
            <Text>Add format of file</Text>
            <Input placeholder="Add format of file" />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
