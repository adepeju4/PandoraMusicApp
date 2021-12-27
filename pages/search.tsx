import { Box, Flex, Text, Image } from "@chakra-ui/react";
import GradientLayout from "../components/gradientLayout";
import Searchbar from "../components/Searchbar";
import { useStoreActions, useStoreState } from "easy-peasy";
import { artistsData } from "../prisma/songsData";
import React, { useState, useEffect } from "react";

const getBGColor = (id) => {
  const colors = [
    "red",
    "green",
    "blue",
    "orange",
    "purple",
    "gray",
    "teal",
    "yellow",
  ];

  return colors[id - 1] || colors[Math.floor(Math.random() * colors.length)];
};

const bg = getBGColor("pink");

export default function Search() {
  const [searchTerm, setsearchTerm] = useState("");

  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong);
  const activeSong = useStoreState((state: any) => state.activeSong);
  const playSongs = useStoreActions((store: any) => store.changeActiveSongs);

  const handleSearch = (e: any) => {
    setsearchTerm(e.target.value);
  };

  const allSongs = artistsData.map((item, i) => {
    return {
      id: i + 1,
      name: item.songs[0].name,
      duration: item.songs[0].duration,
      url: item.songs[0].url,
      artist: {
        name: item.name,
      },
    };
  });

  const filterSongs = allSongs.filter((song) => {
    if (searchTerm) {
      return song.name.toLowerCase().includes(searchTerm.toLowerCase());
    }
    return true;
  });

  const handlePlay = (song) => {
    setActiveSong(song);
    playSongs([song, ...filterSongs]);
  };

  return (
    <GradientLayout
      color={bg}
      subtitle="search"
      title={`Search Tracks`}
      description={
        <Searchbar searchTerm={searchTerm} onSaveSearchTerm={handleSearch} />
      }
      roundImage
      image="https://media.istockphoto.com/photos/3d-microphone-icon-isolated-on-white-background-3d-rendering-icon-picture-id1317330756?b=1&k=20&m=1317330756&s=170667a&w=0&h=d85OVzcjWJe9ITBMhwSo6O-BYS4Ewe7rN2ltPrXI4Og="
    >
      <Box>
        <Flex justifyContent={"space-evenly"} flexFlow={"row wrap"} gap={"2%"}>
          {filterSongs.map((song, i) => (
            <Box
              flexBasis={"23%"}
              height={"200px"}
              position={"relative"}
              background={`url(https://picsum.photos/400?random=${song.id})`}
              backgroundSize={"cover"}
              backgroundPosition={"center"}
              backgroundRepeat={"no-repeat"}
              cursor={"pointer"}
              marginTop={"10px"}
              key={"songs" + i}
              onClick={() => handlePlay(song)}
            >
              <Box
                position={"absolute"}
                width={"100%"}
                bottom={"0px"}
                paddingLeft={"0.5rem"}
                paddingRight={"0.5rem"}
                background={"rgba(255, 255, 255, .5)"}
                color={"#000"}
              >
                {song.name}
              </Box>
            </Box>
          ))}
          {!filterSongs[0] && (
            <Box color={"#fff"}>No songs with the title {searchTerm}</Box>
          )}
        </Flex>
      </Box>
    </GradientLayout>
  );
}
