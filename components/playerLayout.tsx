import React, { useState } from "react";
import { Box, useMediaQuery } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";

import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import PlayerBar from "./Playerbar";

function PlayerLayout({ children }) {
  const [matches] = useMediaQuery("(max-width:880px)");
  const [show, setshow] = useState(false);

  const showNav = () => {
    setshow(true);
  };
  const hideNav = () => {
    setshow(false);
  };

  return (
    <Box width="100vw" height="100vh">
      {matches && (
        <Box position={"fixed"} top={"20px"} left={"20px"} width={"100px"}>
          <HamburgerIcon
            w={6}
            h={6}
            color="white"
            onClick={showNav}
            zIndex={"5"}
          />
        </Box>
      )}
      <Box
        position="absolute"
        top="0"
        width="250px"
        left="0"
        marginBottom="100px"
        display={matches ? "none" : "block"}
      >
        <Sidebar />
      </Box>
      {setshow && (
        <Box>
          <MobileNav show={show} hide={hideNav} />
        </Box>
      )}
      <Box marginLeft={matches ? "0" : "250px"}>
        <Box height="calc(100vh - 100px)">{children}</Box>
      </Box>
      <Box position="absolute" left="0" bottom="0">
        <PlayerBar />
      </Box>
    </Box>
  );
}

export default PlayerLayout;
