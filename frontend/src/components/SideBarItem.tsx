import { Flex, Icon, Text } from "@chakra-ui/react";
import { IconType } from "react-icons";

interface Props {
  reactIcon: IconType;
  navText: string;
}

const SidebarItem = ({ reactIcon, navText }: Props) => {
  return (
    <Flex alignItems="center" mb={5}>
      <Icon as={reactIcon} boxSize={5} mr={2}></Icon>
      <Text fontSize="xl">{navText}</Text>
    </Flex>
  );
};

export default SidebarItem;
