import { createBrowserRouter } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import Layout from "./components/Layout";
import SubmitFreeTimePage from "./pages/SubmitFreeTimePage";
import { RxDashboard } from "react-icons/rx";
import { RxTable } from "react-icons/rx";
import { PiHandWaving } from "react-icons/pi";
import { PiHandsPraying } from "react-icons/pi";
import { TbPencil } from "react-icons/tb";
import { BsPerson } from "react-icons/bs";
import { IoTimeOutline } from "react-icons/io5";

export const navItems = [
  {
    id: 1,
    text: "查看班表",
    icon: RxDashboard,
  },
  {
    id: 2,
    text: "提交班表",
    icon: RxTable,
  },
  {
    id: 3,
    text: "排班",
    icon: TbPencil,
  },
  {
    id: 4,
    text: "考勤",
    icon: BsPerson,
  },
  {
    id: 5,
    text: "请假",
    icon: PiHandsPraying,
  },
  {
    id: 6,
    text: "代班",
    icon: PiHandWaving,
  },
  {
    id: 7,
    text: "查看工时",
    icon: IoTimeOutline,
  },
];

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PrivateRoute>
        <Layout />
      </PrivateRoute>
    ),
    children: [
      {
        path: "homepage",
        element: <HomePage />,
      },
      {
        path: "submit-free-time",
        element: <SubmitFreeTimePage />,
      },
    ],
  },
  {
    path: "/login",
    element: (
      <PublicRoute>
        <LoginPage />
      </PublicRoute>
    ),
  },
]);

export default router;
