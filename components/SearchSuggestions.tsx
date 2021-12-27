import { Box, Flex, Divider, SlideFade } from "@chakra-ui/react";
import { AiOutlineClose } from "react-icons/ai";
import { forwardRef } from "react";

const SearchSuggestions = (props, ref) => {
  const {
    songs,
    searchTerm,
    setdisplaySuggestions,
    setsongs,
    currentlist,
    display,
  } = props;

  const onSaveSongs = (song) => {
    if (!currentlist.includes(song)) {
      setsongs((prev) => {
        return [...prev, song];
      });
    }
  };

  const filterSongs = songs.filter((song) => {
    if (searchTerm) {
      return song.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  return (
    <Flex
      ref={ref}
      justifyContent={"center"}
      alignItems={"center"}
      flexDirection={"column"}
      width={"75%"}
      marginTop={"10px"}
      borderRadius={"10px"}
      cursor={display && "pointer"}
      padding={"20px"}
      position={"relative"}
      background={display ? "whiteAlpha.800" : "transparent"}
    >
      {display && (
        <Box
          position={"absolute"}
          top={"0px"}
          right={"30px"}
          marginTop={".5rem"}
          onClick={() => {
            setdisplaySuggestions(false);
          }}
        >
          <AiOutlineClose />
        </Box>
      )}
      {filterSongs.length === 0 && (
        <Box> No song or artist with the title '{searchTerm}' </Box>
      )}
      {filterSongs.map((song, i) => (
        <Flex
          flexFlow={"column noWrap"}
          width={"100%"}
          justifyContent={"space-between"}
          paddingTop={".5rem"}
          paddingX={".5rem"}
          key={song.id}
          onClick={() => {
            onSaveSongs(song);
          }}
        >
          <SlideFade
            in={display}
            unmountOnExit={display === false ? true : false}
          >
            {song.name}
            <Divider />
          </SlideFade>
        </Flex>
      ))}
    </Flex>
  );
};

export default forwardRef(SearchSuggestions);
