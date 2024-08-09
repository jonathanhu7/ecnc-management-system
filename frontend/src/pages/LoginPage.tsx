import LoginForm from "@/components/LoginForm";

const LoginPage = () => {
  return (
    <div className="h-screen">
      {/* 当用手机打开网页时，grid 布局只有一列，当用电脑打开网页时，grid 布局有两列 */}
      <div className="grid w-full h-full grid-cols-1 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <LoginForm />
        </div>
        {/* 电脑端登陆页面的图片 */}
        <div className="hidden md:block">
          <img
            src="/login_page_wallpaper.jpg"
            alt="登陆页面的壁纸"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
