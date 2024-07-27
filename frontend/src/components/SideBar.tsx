import { Flex, Image, Spacer } from "@chakra-ui/react";
import Logo from "../assets/fastapi-logo.svg";
import { navItems } from "../routes";
import SidebarItem from "./SideBarItem";
import UserInfoCard from "./UserInfoCard";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <Flex
      flexDirection="column"
      bg="white"
      h="100vh"
      p={12}
      position="sticky"
      border="1px"
      borderColor="gray.200"
    >
      <Link to={"/"}>
        <Image src={Logo} maxW="3xs" alignSelf="center" mt={8} />
      </Link>
      <Flex flexDirection="column" alignItems="left" mt={14} ml={7}>
        {navItems.map((item) => (
          <Link to={`/${item.url}`} key={item.id}>
            <SidebarItem reactIcon={item.icon} navText={item.text} />
          </Link>
        ))}
      </Flex>
      <Spacer />
      <UserInfoCard />
    </Flex>
  );
};

export default Sidebar;
