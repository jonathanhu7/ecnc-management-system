import {
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  Icon,
  Image,
  Input,
  InputGroup,
  InputRightElement,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import Logo from "../assets/fastapi-logo.svg";
import { PiEyeLight, PiEyeSlash } from "react-icons/pi";
import { useAuth } from "../hooks/useAuth";

const LoginPage = () => {
  const [showPassword, setShowPassword] = useState<Boolean>(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { authError, login } = useAuth();

  // 处理提交逻辑
  const onSubmit = async (data: FieldValues) => {
    await login({ username: data.username, password: data.password });
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
      onSubmit={handleSubmit(onSubmit)}
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
      <FormControl id="username" isInvalid={!!errors.username || !!authError}>
        {/* 用户名 */}
        <Input
          id="username"
          {...register("username", { required: "请输入用户名" })}
          placeholder="NetID"
          type="text"
        />
        {/* 当不填写用户名的时候就会触发下面错误信息，具体是通过识别 FormControl 时候 valid 来触发的 */}
        {errors.username && (
          <FormErrorMessage>
            {errors.username.message as string}
          </FormErrorMessage>
        )}
      </FormControl>
      <FormControl id="password" isInvalid={!!errors.password || !!authError}>
        {/* 密码 */}
        <InputGroup>
          <Input
            id="password"
            {...register("password", { required: "请输入密码" })}
            placeholder="密码"
            type={showPassword ? "text" : "password"}
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
        {/* 当不填写密码的时候就会触发下面错误信息 */}
        {errors.password && (
          <FormErrorMessage>
            {errors.password.message as string}
          </FormErrorMessage>
        )}
      </FormControl>
      {/* 如果登录失败，错误信息会出现在下面 */}
      {authError && <Text color="red">{authError}</Text>}
      {/* 提交按钮 */}
      <Button colorScheme="teal" size="md" type="submit">
        登录
      </Button>
    </Container>
  );
};

export default LoginPage;
