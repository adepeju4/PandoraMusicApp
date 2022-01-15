import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { useStoreState } from "easy-peasy";
import Player from "./Playr";
import VolumeControl from "./VolumeControl";
import { useRef, useState } from "react";

const PlayerBar = () => {
  const songs = useStoreState((state: any) => state.activeSongs);
  const activeSong = useStoreState((state: any) => state.activeSong);
  const random = useStoreState((state: any) => state.random);
  const soundRef = useRef(null);
  const [mute, setmute] = useState(false);

  const [matches] = useMediaQuery("(max-width:690px)");

  return (
    <Box
      height="100px"
      width="100vw"
      bg="gray.900"
      padding="10px"
      overflow={"hidden"}
    >
      <Flex
        align="center"
        justifyContent={"space-between"}
        alignItems={"center"}
        height={matches ? "100%" : "fit-content"}
      >
        {activeSong ? (
          <Box padding={matches ? "5px" : "20px"} color="white" width="30%">
            <Text fontSize="large">{activeSong.name}</Text>
            <Text fontSize="sm">{activeSong.artist.name}</Text>
          </Box>
        ) : null}
        <Box width="40%">
          {activeSong ? (
            <Player
              songs={songs}
              activeSong={activeSong}
              random={random}
              soundRef={soundRef}
              mute={mute}
            />
          ) : null}
        </Box>
        <Box
          width="30%"
          color="white"
          padding="20px"
          display={matches ? "none" : "block"}
        >
          {activeSong ? (
            <VolumeControl soundRef={soundRef} mute={mute} setmute={setmute} />
          ) : null}
        </Box>
      </Flex>
    </Box>
  );
};

export default PlayerBar;
