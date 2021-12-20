import { Box, Text, Flex } from "@chakra-ui/layout";
import { Image } from "@chakra-ui/react";
import { useMe } from "../lib/hooks";
import { useStoreState } from "easy-peasy";
import GradientLayout from "../components/gradientLayout";
import { artistsData } from "../prisma/songsData";
import prisma from "../lib/prisma";

const Home = ({ artists }) => {
  const { user } = useMe();

  const mapSongs = artistsData.map((artist) => artist["songs"]);

  console.log(mapSongs);

  return (
    <GradientLayout
      roundImage
      color="gray"
      subtitle="profile"
      title={`${user?.firstName} ${user?.lastName}`}
      description={`${user?.playlistsCount} public playlists`}
      image="https://dl.dropboxusercontent.com/s/bgiv0ssz3xpotz9/peep.png?dl=0"
    >
      <Box color="white" paddingX="40px">
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top artist this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex>
          {artists.map((artist) => (
            <Box paddingX="10px" width="20%" key={`artist${artist.id}`}>
              <Box bg="gray.900" borderRadius="4px" padding="15px" width="100%">
                <Image
                  src="https://placekitten.com/300/300"
                  borderRadius="100%"
                />
                <Box marginTop="20px">
                  <Text fontSize="large">{artist.name}</Text>
                  <Text fontSize="x-small">Artist</Text>
                </Box>
              </Box>
            </Box>
          ))}
        </Flex>
      </Box>
      <Box color="white" paddingX="40px" paddingY={"40px"}>
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top tracks this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex direction={"column"}>
          {[].length === 0 && <Text color={"gray.500"}> No top songs yet</Text>}
          {[].map((song: any, i: any) => (
            <Box key={`songs${song.id}`}>
              <Flex direction={"row"}>
                <Box>{i + 1}</Box>
                <Box>{song.name}</Box>
              </Flex>
            </Box>
          ))}
        </Flex>
      </Box>
    </GradientLayout>
  );
};

export const getServerSideProps = async () => {
  const artists = await prisma.artist.findMany({});
  return {
    props: { artists },
  };
};

export default Home;
