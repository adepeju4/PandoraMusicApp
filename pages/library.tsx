import GradientLayout from "../components/gradientLayout";
import SongTable from "../components/songsTable";
import { Box } from "@chakra-ui/layout";
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

const bg = getBGColor(Math.random() * 10);

function library({ songs }) {
  return (
    <GradientLayout
      color={bg}
      subtitle=""
      title={`Your Library`}
      description={"Personalized Library"}
      roundImage
      playlist={false}
      image="https://images.unsplash.com/photo-1597374459522-88a0516f6873?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxzZWFyY2h8MTZ8fHNvbmdzfGVufDB8fDB8fA%3D%3D&auto=format&fit=crop&w=800&q=60"
    >
      <Box paddingX={"20px"} color={"white"}>
        All Tracks
      </Box>
      <SongTable songs={songs} />
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
  const songs = await prisma.library.findMany({
    where: {
      userId: user.id,
    },
  });

  return {
    props: { songs },
  };
};

export default library;
