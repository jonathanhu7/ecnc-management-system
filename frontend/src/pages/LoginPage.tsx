import {
  Button,
  Container,
  FormControl,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
} from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Logo from "../assets/fastapi-logo.svg";
import { LoginRequest, useAuth } from "../hooks/useAuth";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const { register, handleSubmit } = useForm();
  const { login } = useAuth();

  // 处理提交逻辑
  const onSubmit = (data: FieldValues) => {
    const loginData: LoginRequest = {
      username: data.username,
      password: data.password,
    };
    login(loginData);
  };

  return (
    // Container 作为 form 用来处理表单
    // form 是 React 内置元素，而 Container 是 Chakra UI 的内置元素
    // 使用 Container 来代替 form 统一使用 Chakra UI 元素
    <Container
      as="form"
      h="100vh"
      maxW="sm"
      centerContent
      alignItems="stretch"
      justifyContent="center"
      gap={4}
    >
      {/* logo */}
      <Image
        src={Logo}
        alt="FastAPI logo"
        maxW="2xs"
        alignSelf="center"
        height="auto"
      />
      {/* 表单部分 */}
      <FormControl id="username">
        {/* 用户名 */}
        <Input
          id="username"
          {...register("username")}
          placeholder="NetID"
          type="text"
          required
        />
      </FormControl>
      <FormControl id="password">
        {/* 密码 */}
        <InputGroup>
          <Input
            id="password"
            {...register("password")}
            placeholder="密码"
            type={showPassword ? "text" : "password"}
            required
          />
          {/* 是否显示密码的图标 */}
          <InputRightElement>
            <Icon
              as={showPassword ? PiEyeLight : PiEyeSlash}
              onClick={() => setShowPassword(!showPassword)}
              // 设置鼠标移动到图标上变成点击的形状
              _hover={{
                cursor: "pointer",
              }}
            />
          </InputRightElement>
        </InputGroup>
      </FormControl>
      {/* 提交按钮 */}
      <Button colorScheme="teal" size="md" type="submit">
        登录
      </Button>
    </Container>
  );
};

export default LoginPage;
