import React from "react";
import { Box, Text, Flex, keyframes } from "@chakra-ui/react";

function ArtistsSlide({ artists }) {
  const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-250px * 9));
  }
`;
  return (
    <Box
      display={"grid"}
      placeItems={"center"}
      overflow={"hidden"}
      margin={"auto"}
      position={"relative"}
      width={"100%"}
      height={"250px"}
      _before={{
        background:
          "linear-gradient(to right, rgba(136,136,136,1) 0%, rgba(136,136,136,0) 100%)",
        content: `""`,
        height: "100%",
        position: "absolute",
        width: "15%",
        zIndex: "2",
        left: "0",
        top: "0",
      }}
      _after={{
        background:
          "linear-gradient(to right, rgba(136,136,136,1) 0%, rgba(136,136,136,0) 100%)",
        content: `""`,
        height: "100%",
        position: "absolute",
        width: "15%",
        zIndex: "2",
        right: "0",
        top: "0",
        transform: "rotateZ(180deg)",
      }}
    >
      <Box
        display={"flex"}
        width={"calc(250px * 18)"}
        animation={`${scroll} 40s linear infinite`}
      >
        {[...artists].concat(artists).map((song) => (
          <Box
            key={`songSlide${song.id * Math.random()}`}
            height={"200px"}
            width={"250px"}
            display={"flex"}
            alignItems={"center"}
            padding={"15px"}
            sx={{ perspective: "100px" }}
          >
            <>
              <Box
                width={"100%"}
                height={"100%"}
                position={"relative"}
                background={`url(https://picsum.photos/400?color-block&random=${song.id})`}
                backgroundSize={"cover"}
                backgroundPosition={"center"}
                backgroundRepeat={"no-repeat"}
                cursor={"pointer"}
                transition={"transform 1s"}
                sx={{
                  "&:hover": {
                    cursor: "pointer",
                    transform: "translateZ(20px)",
                  },
                }}
              >
                <Box
                  position={"absolute"}
                  top={"0"}
                  left={"0"}
                  background={"rgba(0,0,0,.5)"}
                  width={"100%"}
                  height={"100%"}
                  color={"#fff"}
                  cursor={"pointer"}
                  display={"flex"}
                  alignItems={"center"}
                  justifyContent={"center"}
                >
                  {song.name}
                </Box>
              </Box>
            </>
          </Box>
        ))}
      </Box>
    </Box>
  );
}

export default ArtistsSlide;
