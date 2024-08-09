import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
} from "./ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useState } from "react";
import { AxiosError } from "axios";
import { useMutation } from "@tanstack/react-query";
import { login, LoginResponse } from "@/api/authApi";
import { ErrorResponse } from "@/api/errorResponse";

// zod 是一个用于声明和验证数据结构的 TypeScript 优化库
// 以下代码定义了 zod 的验证模式，其要求用户必须输入用户名和密码
const formSchema = z.object({
  username: z.string().min(1, {
    message: "请输入用户名",
  }),
  password: z.string().min(1, {
    message: "请输入密码",
  }),
});

const LoginForm = () => {
  // react-hook-form 是一个用来处理表单状态的库
  // 可以用其中的 useForm 钩子函数来构建表单
  // useForm 钩子函数能够配合 zod 来进行数据验证
  // z.infer<typeof formSchema> 来推断表单数据结构，这样可以确保表单字段和 formSchema 保持一致
  const form = useForm<z.infer<typeof formSchema>>({
    // 设置使用 zod 解析器来验证表单数据
    resolver: zodResolver(formSchema),
    // 设置表单默认值
    defaultValues: {
      username: "",
      password: "",
    },
  });

  // isVisible 表示密码是否可见
  const [isVisible, setVisible] = useState(false);

  // 使用 react-query 来进行登录请求
  const loginMutation = useMutation<
    LoginResponse,
    AxiosError<ErrorResponse>,
    z.infer<typeof formSchema>
  >({
    mutationFn: login,
    onSuccess: (res) => {
      console.log(res.data);
    },
  });

  // 定义表单提交函数
  // react-hook-form 的 handleSubmit 可以防止默认的提交行为，即调用 event.preventDefault()
  // 故这里我们不需要手动写 event.preventDefault()
  const onSubmit = (data: z.infer<typeof formSchema>) => {
    loginMutation.mutate(data);
  };

  return (
    <div>
      <div className="mb-3">
        <h1 className="text-3xl font-semibold mb-1">登录</h1>
        <p className="text-muted-foreground">
          休对故人思故国，且将新火试新茶。诗酒趁年华。
        </p>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            // control={form.control} 传递表单控制对象，以便 FormField 组件与 React Hook Form 进行交互
            control={form.control}
            name="username"
            // field 是 react-hook-form 提供的一个对象，包含了表单字段的属性和方法
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-base">用户名</FormLabel>
                <FormControl>
                  <Input
                    placeholder="NetID"
                    disabled={loginMutation.isPending}
                    {...field}
                  />
                </FormControl>
                <FormDescription className="text-red-500">
                  {form.formState.errors.username?.message}
                </FormDescription>
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem className="mb-4">
                <FormLabel className="text-base">密码</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      type={isVisible ? "text" : "password"}
                      placeholder="密码"
                      disabled={loginMutation.isPending}
                      {...field}
                    />
                    {/* top-1/2 表示将图标的顶部位置设置为父容器高度的一半 */}
                    {/* -translate-y-1/2 表示将图标沿 Y 轴向上移动其自身高度的一半 */}
                    {/* react icon 可以通过 text 的大小来改变其大小 */}
                    <span
                      // 当在等待后端的响应时，禁用密码可见按钮，并将其颜色设置的灰一些，提示用户此时密码可见按钮不能按
                      className={`absolute right-3 top-1/2 -translate-y-1/2 text-xl cursor-pointer ${
                        loginMutation.isPending &&
                        "pointer-events-none text-gray-500"
                      }`}
                      onClick={() => setVisible(!isVisible)}
                    >
                      {isVisible ? <IoMdEye /> : <IoMdEyeOff />}
                    </span>
                  </div>
                </FormControl>
                <FormDescription className="text-red-500">
                  {form.formState.errors.password?.message}
                </FormDescription>
              </FormItem>
            )}
          />
          {/* 显示服务器传来的错误信息 */}
          {loginMutation.isError && (
            <div className="text-red-500">
              {loginMutation.error.response?.data.message}
            </div>
          )}
          {/* 点击密码是否可见的按钮时，会意外导致如下的按钮的登录文字被选中，故用select-none 来阻止其被选中 */}
          <div className="mt-3 select-none">
            {loginMutation.isPending ? (
              <Button disabled className="w-full">
                <AiOutlineLoading3Quarters className="mr-2 animate-spin" />
                请稍等
              </Button>
            ) : (
              <Button type="submit" className="w-full">
                登录
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoginForm;
