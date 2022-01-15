import React, { useState, useEffect } from "react";
import { Box } from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { useWindowDimensions } from "../lib/hooks";
import Sidebar from "./Sidebar";
import MobileNav from "./MobileNav";
import PlayerBar from "./Playerbar";

function PlayerLayout({ children }) {
  const [show, setshow] = useState(false);
  const [width, setwidth] = useState(0);

  const { width: screensize } =
    typeof window !== "undefined" && useWindowDimensions();

  const showNav = () => {
    setshow(true);
  };
  const hideNav = () => {
    setshow(false);
  };

  useEffect(() => {
    setwidth(screensize);
  }, [screensize]);

  return (
    <Box width="100vw" height="100vh">
      {width <= 880 && (
        <Box position={"fixed"} top={"20px"} left={"20px"} width={"100px"}>
          <HamburgerIcon
            w={6}
            h={6}
            color="white"
            onClick={showNav}
            zIndex={"50000000000000000"}
          />
        </Box>
      )}
      {width > 880 && (
        <Box
          position="absolute"
          top="0"
          width="250px"
          left="0"
          marginBottom="100px"
        >
          <Sidebar />
        </Box>
      )}

      {setshow && (
        <Box>
          <MobileNav show={show} hide={hideNav} />
        </Box>
      )}
      <Box marginLeft={width <= 880 ? "0px" : "250px"}>
        <Box height="calc(100vh - 100px)">{children}</Box>
      </Box>
      <Box position="fixed" left="0" bottom="0">
        <PlayerBar />
      </Box>
    </Box>
  );
}

export default PlayerLayout;
