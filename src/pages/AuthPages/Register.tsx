import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Heading,
  Text,
  useColorModeValue,
  Link,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useQuery } from "react-query";
import { Select } from "@chakra-ui/react";
import { useSnapshot } from "valtio";

import { expressService } from "../../axiosConfig";
import { store } from "../../store/store";
import { useForm } from "react-hook-form";

export default function Register() {
  const { isAuthenticated } = useSnapshot(store.auth);
  const { handleSubmit, register } = useForm();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [roles, setRoles] = useState<any>([]);
  const [role, setRole] = useState<any>(null);
  const token = localStorage.getItem("token");

  const { isLoading, error, data } = useQuery(
    "roles",
    () => expressService.get("roles").then((res) => res.data),
    {
      onSuccess: (data) => {
        setRoles(data.data);
      },
    }
  );

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>An error occurred: {data.error.message}</div>;

  const onSubmit = (data: any) => {
    expressService.post("auth/register", { ...data })
    .then((res) => {
      if (res.status === 201) {
        store.auth.token = data.data.accessToken;
        store.auth.isAuthenticated = true;
        store.auth.role = data.data.user.role.code;
        localStorage.setItem("role", JSON.stringify(data.data.user.role.code));
        localStorage.setItem("token", data.data.accessToken);
        data.role === "educational_institution"
          ? navigate("/profile-vuz")
          : navigate("/profile-user");
      }
    });
  };

  return (
    <Flex
      minH={"103vh"}
      align={"center"}
      justify={"center"}
      bg={useColorModeValue("green.50", "green.800")}
      mt="-100px"
    >
      <Stack spacing={8} mx={"auto"} maxW={"lg"} py={12} px={6}>
        <Stack align={"center"}>
          <Heading fontSize={"4xl"} textAlign={"center"}>
            Sign up
          </Heading>
        </Stack>
        <Box
          rounded={"lg"}
          bg={useColorModeValue("white", "gray.700")}
          boxShadow={"lg"}
          p={8}
        >
          <form onSubmit={handleSubmit(onSubmit)}>
            <Stack spacing={4}>
              <HStack>
                <Box>
                  <FormControl>
                    <FormLabel>Roles</FormLabel>
                    <Select
                      placeholder="Select option"
                      {...register("role")}
                      onChange={(event) => {
                        setRole(event.target.value);
                      }}
                    >
                      {roles.map((role: any) => (
                        <option key={role.index} value={role.code}>
                          {role.name}
                        </option>
                      ))}
                    </Select>
                  </FormControl>
                </Box>
                <Box>
                  <FormControl id="lastName">
                    <FormLabel>Phone number</FormLabel>
                    <Input type="text" {...register("phoneNumber")} />
                  </FormControl>
                </Box>
              </HStack>
              <FormControl id="email">
                <FormLabel>Email address</FormLabel>
                <Input type="email" {...register("email")} />
              </FormControl>
              <FormControl id="password" isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup>
                  <Input
                    type={showPassword ? "text" : "password"}
                    {...register("password")}
                  />
                  <InputRightElement h={"full"}>
                    <Button
                      variant={"ghost"}
                      onClick={() =>
                        setShowPassword((showPassword) => !showPassword)
                      }
                    >
                      {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                    </Button>
                  </InputRightElement>
                </InputGroup>
              </FormControl>
              <Stack spacing={10} pt={2}>
                <Button
                  type="submit"
                  loadingText="Submitting"
                  size="lg"
                  bg={"blue.400"}
                  color={"white"}
                  _hover={{ bg: "blue.500" }}
                >
                  Sign up
                </Button>
              </Stack>
              <Stack pt={6}>
                <Text align={"center"} onClick={() => navigate("/login")}>
                  Already a user ? <Link color={"blue.400"}>Login</Link>
                </Text>
              </Stack>
            </Stack>
          </form>
        </Box>
      </Stack>
    </Flex>
  );
}
