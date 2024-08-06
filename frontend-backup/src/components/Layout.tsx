import { Flex, Box } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";
import SideBar from "./SideBar";

const Layout = () => {
  return (
    <Flex>
      <SideBar />
      {/* flex="1" 能够使组件占满剩余空间 */}
      <Box flex="1" bg="gray.50">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default Layout;
