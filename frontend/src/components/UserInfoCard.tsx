import { Box, Flex, Heading, Image, Text } from "@chakra-ui/react";
import Avatar from "../assets/avatar.jpg";
import { useAuth } from "../hooks/useAuth";

const UserInfoCard = () => {
  const { currentUser } = useAuth();
  console.log(currentUser);

  return (
    <Flex alignItems="center" borderTop="1px" pt={8} borderColor="gray.400">
      <Image src={Avatar} borderRadius="full" boxSize="50px" />
      <Box ml={3}>
        <Heading fontSize="25px">{currentUser?.name}</Heading>
        <Text textColor="gray.500">
          {currentUser?.username} ({currentUser?.role})
        </Text>
      </Box>
    </Flex>
  );
};

export default UserInfoCard;
