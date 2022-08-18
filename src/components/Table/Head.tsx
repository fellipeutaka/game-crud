import { Box } from "@chakra-ui/react";

export default function Head() {
  return (
    <Box
      as="thead"
      fontSize="xs"
      fontWeight="medium"
      color="white"
      bgColor="gray.700"
      textTransform="uppercase"
    >
      <tr>
        <Box as="th" py="3" px="6" textAlign="center">
          Name
        </Box>
        <Box as="th" py="3" px="6" textAlign="center">
          Description
        </Box>
        <Box as="th" py="3" px="6" textAlign="center">
          Price
        </Box>
        <Box as="th" py="3" px="6" textAlign="center">
          Release date
        </Box>
        <Box as="th" py="3" px="6" textAlign="center">
          Action
        </Box>
      </tr>
    </Box>
  );
}
