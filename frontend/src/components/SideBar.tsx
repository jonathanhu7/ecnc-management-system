import { Box, Flex, Image, Spacer } from "@chakra-ui/react";
import Logo from "../assets/fastapi-logo.svg";
import { navItems } from "../routes";
import SidebarItems from "./SideBarItems";
import UserInfoCard from "./UserInfoCard";

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
      <Image src={Logo} maxW="3xs" alignSelf="center" mt={8} />
      <Flex flexDirection="column" alignItems="left" mt={14} ml={7}>
        {navItems.map((item) => (
          <SidebarItems
            key={item.id}
            reactIcon={item.icon}
            navText={item.text}
          />
        ))}
      </Flex>
      <Spacer />
      <UserInfoCard />
    </Flex>
  );
};

export default Sidebar;
