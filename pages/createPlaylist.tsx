import { useState, useRef, useEffect } from "react";
import * as Scroll from "react-scroll";
import { usePlaylist } from "../lib/hooks";
import GradientLayout from "../components/gradientLayout";
import { useRouter } from "next/router";
import { validateToken } from "../lib/auth";
import prisma from "../lib/prisma";
import { useMe } from "../lib/hooks";
import PlaylistTable from "../components/PlaylistTable";
import { Box, Divider, Input, Flex } from "@chakra-ui/react";
import { PlaylistNameInput } from "../components/playlistInput";
import SearchSuggestions from "../components/SearchSuggestions";
import { useStoreActions } from "easy-peasy";
import fetcher from "../lib/fetcher";

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
const bg = getBGColor(Math.random() * 100);

export default function CreatePlaylist({ songs: songsData }) {
  const { user } = useMe();

  const [readOnly, setreadOnly] = useState(true);

  const [searchTerm, setsearchTerm] = useState("");

  const [isLoading, setisLoading] = useState(false);

  const [title, settitle] = useState(
    user && `Playlist #${user.playlistsCount + 1}`
  );

  const [onSavePlaylist, setonSavePlaylist] = useState(false);
  const [displaySuggestions, setdisplaySuggestions] = useState(false);

  const [songs, setsongs] = useState([]);

  const router = useRouter();

  const suggestionsRef = useRef(null);

  const scroll = Scroll.animateScroll;

  const { playlists } = usePlaylist();

  const setPlaylists = useStoreActions((state: any) => state.setPlaylists);

  const onEdit = () => {
    setreadOnly(false);
  };
  const onSaveTitle = (e) => {
    settitle(e.target.value);
  };

  const handleSearchChange = (e) => {
    setsearchTerm(e.target.value);
  };

  const onRemoveSong = (index) => {
    setsongs((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async () => {
    setisLoading(true);
    const playlistData = {
      name: title,
      user: {
        connect: { id: user.id },
      },
      song: {
        connect: songs.map((song) => {
          return { id: song.id };
        }),
      },
    };
    const create = await fetcher("createPlaylist", playlistData);

    if (create) {
      setisLoading(false);
      setonSavePlaylist(true);

      router.push(`/playlist/${create.id}`);
    }
  };

  useEffect(() => {
    if (onSavePlaylist) {
      setPlaylists(playlists ? playlists : []);
    }
  }, [onSavePlaylist]);

  useEffect(() => {
    if (displaySuggestions) {
      suggestionsRef.current.scrollIntoView({ behavior: "smooth" });
    } else {
      scroll.scrollToTop();
    }
  }, [displaySuggestions]);

  return (
    <GradientLayout
      color={bg}
      subtitle="playlist"
      title={
        <PlaylistNameInput
          variant={"unstyled"}
          title={title}
          getPlaylistData={onSaveTitle}
          readOnly={readOnly}
          onEdit={onEdit}
        />
      }
      playlist={true}
      description={"add songs that fits your mood"}
      roundImage={false}
      image="https://images.unsplash.com/photo-1518609878373-06d740f60d8b?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTF8fHBsYXlsaXN0fGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
    >
      <Box>
        <Box color={"#fff"} paddingX={"30px"}>
          {songs.length === 0 ? (
            <Box>Add songs to playlist</Box>
          ) : (
            <PlaylistTable
              isLoading={isLoading}
              submit={handleSubmit}
              songs={songs}
              removeTrack={onRemoveSong}
            />
          )}
        </Box>
        <Divider color={"gray.500"} marginTop={"20px"} />
        <Box>
          <Flex
            justifyContent={"flex-start"}
            alignItems={"center"}
            flexDirection={"column"}
            marginTop={"20px"}
          >
            <Input
              width={"75%"}
              outline={"none"}
              placeholder="Search for songs to add"
              color={"white"}
              onChange={handleSearchChange}
              value={searchTerm}
              onFocus={() => {
                setdisplaySuggestions(true);
              }}
            />

            <SearchSuggestions
              searchTerm={searchTerm}
              setdisplaySuggestions={setdisplaySuggestions}
              setsongs={setsongs}
              songs={songsData}
              currentlist={songs}
              display={displaySuggestions}
              ref={suggestionsRef}
            />
          </Flex>
        </Box>
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
  const songs = await prisma.song.findMany({});

  return {
    props: { songs },
  };
};
