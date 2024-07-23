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

const LoginPage = () => {
  return (
    <Center h="100vh">
      <Stack>
        <Image src={logo} maxW="40" mb="8" mx="auto" />
        <form>
          <Stack my="4" spacing="6">
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <FaRegUserCircle color="gray" />
              </InputLeftElement>
              <Input name="email" type="email" size="md" placeholder="NetID" />
              <InputRightAddon>@mail2.sysu.edu.cn</InputRightAddon>
            </InputGroup>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <CiLock />
              </InputLeftElement>
              <Input
                name="password"
                type="password"
                size="md"
                placeholder="密码"
              />
            </InputGroup>
            <Button colorScheme="teal" size="md">
              登录
            </Button>
          </Stack>
        </form>
      </Stack>
    </Center>
  );
};

export default LoginPage;
