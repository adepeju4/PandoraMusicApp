import { Box } from "@chakra-ui/layout";

import React from "react";

function PlayerLayout({ children }) {
  return (
    <Box width="100vw" height="100vh">
      <Box
        position="absolute"
        top="0"
        width="250px"
        left="0"
        marginBottom="100px"
      >
        Sidebar
      </Box>
      <Box marginLeft="250px">{children}</Box>
      <Box position="absolute" left="0" bottom="0">
        player
      </Box>
    </Box>
  );
}

export default PlayerLayout;