import { Box, Text, Flex, keyframes } from "@chakra-ui/react";

import { Image } from "@chakra-ui/react";
import { useMe } from "../lib/hooks";
import GradientLayout from "../components/gradientLayout";
import prisma from "../lib/prisma";

const Home = ({ artists, songs }) => {
  const { user } = useMe();

  const scroll = keyframes`
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(calc(-250px * 9));
  }
`;

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
                  src={`https://picsum.photos/400?random=${artist.id}`}
                  borderRadius="100%"
                  objectFit={"cover"}
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
      <Box paddingY={"20px"}>
        <Box marginBottom="40px" color="white" paddingX="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Suggested tracks this month
          </Text>
          <Text fontSize="md">public</Text>
        </Box>
        <Box
          display={"grid"}
          placeItems={"center"}
          overflow={"hidden"}
          margin={"auto"}
          position={"relative"}
          width={"90%"}
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
            {[...songs].concat(songs).map((song) => (
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
      </Box>
      <Box color="white" paddingX="40px" paddingY={"40px"}>
        <Box marginBottom="40px">
          <Text fontSize="2xl" fontWeight="bold">
            Top tracks this month
          </Text>
          <Text fontSize="md">only visible to you</Text>
        </Box>
        <Flex direction={"column"}>
          {!songs ||
            (songs.length === 0 && (
              <Text color={"gray.500"}> No top songs yet</Text>
            ))}
          {songs.slice(3).map((song: any, i: any) => (
            <Box key={`songs${song.id}`}>
              <Flex
                direction={"row"}
                marginBottom={"10px"}
                alignItems={"center"}
              >
                <Flex
                  direction={"row"}
                  width={"70px"}
                  justifyContent={"space-between"}
                  alignItems={"center"}
                >
                  <Box>{i + 1}</Box>
                  <Image
                    src={`https://picsum.photos/400?random=${song.id}`}
                    objectFit={"cover"}
                    width={"50px"}
                    height={"50px"}
                  />
                </Flex>
                <Box marginLeft={"10px"}>{song.name}</Box>
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
  const songs = await prisma.song.findMany({});
  return {
    props: { artists, songs },
  };
};

export default Home;
