import {
  Button,
  Center,
  Image,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightAddon,
  Stack,
} from "@chakra-ui/react";
import { FaRegUserCircle } from "react-icons/fa";
import { CiLock } from "react-icons/ci";
import logo from "../assets/fastapi-logo.svg";
import { useForm } from "react-hook-form";

const LoginPage = () => {
  const { register, handleSubmit } = useForm();

  return (
    <Center h="100vh">
      <Stack w="40vh">
        <Image src={logo} maxW={60} mb={2} mx="auto" />
        <form onSubmit={handleSubmit((data) => console.log(data))}>
          <Stack my={4} spacing={6}>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaRegUserCircle color="gray" />
              </InputLeftElement>
              <Input
                {...register("NetID")}
                type="text"
                size="md"
                placeholder="NetID"
                className="form-control"
              />
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <CiLock />
              </InputLeftElement>
              <Input
                {...register("password")}
                type="password"
                size="md"
                placeholder="密码"
                className="form-control"
              />
            </InputGroup>
            <Button colorScheme="teal" size="md" type="submit">
              登录
            </Button>
          </Stack>
        </form>
      </Stack>
    </Center>
  );
};

export default LoginPage;
