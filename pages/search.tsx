import { Box, Flex, Spinner, useMediaQuery } from "@chakra-ui/react";
import GradientLayout from "../components/gradientLayout";
import Searchbar from "../components/Searchbar";
import { useStoreActions, useStoreState } from "easy-peasy";
import { AiOutlinePlus, AiOutlineCheck } from "react-icons/ai";
import { BsPlayFill } from "react-icons/bs";
import { artistsData } from "../prisma/songsData";
import React, { useState } from "react";
import fetcher from "../lib/fetcher";
import { useMe } from "../lib/hooks";
import { validateToken } from "../lib/auth";
import prisma from "../lib/prisma";

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

export default function Search({ librarySongs }) {
  const { user } = useMe();

  const [searchTerm, setsearchTerm] = useState("");

  const setActiveSong = useStoreActions((state: any) => state.changeActiveSong);

  const playSongs = useStoreActions((store: any) => store.changeActiveSongs);

  const [addedStyle, setaddedStyle] = useState({});

  const [isLoading, setisLoading] = useState({});

  const [playing, setplaying] = useState({});

  let addedToLibrary = {};

  const handleSearch = (e: any) => {
    setsearchTerm(e.target.value);
  };

  const addToLibrary = async (song, index) => {
    const { name, duration, url, artist } = song;

    setisLoading({ ...isLoading, [index]: true });

    const data = {
      name,
      duration,
      url,
      artist: artist.name,
      user: {
        connect: { id: user.id },
      },
    };

    const addSong = await fetcher("addToLibrary", data);

    if (addSong) {
      setaddedStyle({ ...addedStyle, [index]: true });
      setisLoading({ ...isLoading, [index]: false });
    }
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

  filterSongs.forEach((song, i) => {
    librarySongs.includes(song.name)
      ? (addedToLibrary = { ...addedToLibrary, [i]: true })
      : false;
  });

  const handlePlay = (song, index) => {
    setActiveSong(song);
    playSongs([song]);
    setplaying({ [index]: "green" });
  };

  let basis;
  const [md] = useMediaQuery("(max-width:998px)");
  const [sm] = useMediaQuery("(max-width:400px)");

  if (sm) {
    basis = "100%";
  } else if (md) {
    basis = "49%";
  } else {
    basis = "32%";
  }

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
      <Box paddingX={sm ? "30px" : "20px"}>
        <Flex justifyContent={"space-evenly"} flexFlow={"row wrap"} gap={"2%"}>
          {filterSongs.map((song, i) => (
            <Box
              flexBasis={basis}
              height={"300px"}
              position={"relative"}
              background={`url(https://picsum.photos/400?random=${song.id})`}
              backgroundSize={"cover"}
              backgroundPosition={"center"}
              backgroundRepeat={"no-repeat"}
              cursor={"pointer"}
              marginTop={"10px"}
              key={"songs" + i}
            >
              <Flex
                position={"absolute"}
                width={"100%"}
                bottom={"0px"}
                paddingLeft={"0.5rem"}
                paddingRight={"0.5rem"}
                background={"rgba(255, 255, 255, .8)"}
                color={"#000"}
                justifyContent={"space-between"}
                alignItems={"center"}
              >
                <Box fontSize={"15px"}>{song.name}</Box>
                <Flex gap={"1"} alignItems={"center"} justifyContent={"center"}>
                  <BsPlayFill
                    onClick={() => handlePlay(song, i)}
                    fontSize={"23px"}
                    color={playing[i]}
                  />

                  {isLoading[i] && (
                    <Spinner
                      size={"xs"}
                      emptyColor="gray.200"
                      color="green.500"
                    />
                  )}
                  {!(addedToLibrary[i] || addedStyle[i]) && !isLoading[i] && (
                    <AiOutlinePlus
                      onClick={() => {
                        addToLibrary(song, i);
                      }}
                    />
                  )}

                  {(addedToLibrary[i] || addedStyle[i]) && (
                    <AiOutlineCheck color="green" />
                  )}
                </Flex>
              </Flex>
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

export const getServerSideProps = async ({ req }) => {
  let user;

  try {
    user = validateToken(req.cookies.ACCESS_TOKEN);
  } catch (error) {
    return {
      redirect: {
        permanent: false,
        destination: "/signin",
      },
    };
  }
  const Songs = await prisma.library.findMany({
    where: {
      userId: user.id,
    },
  });

  const librarySongs = Songs.map((song) => song.name);

  return {
    props: { librarySongs },
  };
};
