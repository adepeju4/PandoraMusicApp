import { Box } from "@chakra-ui/layout";
import {
  Table,
  Thead,
  Td,
  Tr,
  Tbody,
  Th,
  IconButton,
  useMediaQuery,
  Spinner,
} from "@chakra-ui/react";
import {
  AiOutlineClockCircle,
  AiOutlinePlus,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import { formatTime, formatDate } from "../lib/formatters";

const PlaylistTable = ({ isLoading, submit, removeTrack, songs }) => {
  const [matches] = useMediaQuery("(max-width:530px)");

  return (
    <Box bg="transparent" color="white">
      <Box padding={matches ? "5px" : "10px"} marginBottom="20px">
        <Box
          marginBottom="30px"
          display={"flex"}
          alignItems="center"
          onClick={submit}
          cursor={"pointer"}
        >
          <IconButton
            icon={isLoading ? <Spinner /> : <AiOutlinePlus fontSize="30px" />}
            aria-label="create-playlist"
            colorScheme="green"
            size="lg"
            isRound
          />
          <Box marginLeft={"20px"}>Create Playlist</Box>
        </Box>
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
            <Tr>
              <Th display={matches ? "none" : "block"}>#</Th>
              <Th>Title</Th>
              <Th display={matches ? "none" : "block"}>Date Added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
              <Th>Remove</Th>
            </Tr>
          </Thead>
          <Tbody>
            {songs.map((song, i) => (
              <Tr
                sx={{
                  transition: "all .3s ",
                  "&:hover": {
                    bg: "rgba(255,255,255, 0.1)",
                  },
                }}
                key={song.id}
                cursor="pointer"
              >
                <Td display={matches ? "none" : "block"}>{i + 1}</Td>
                <Td>{song.name}</Td>
                <Td display={matches ? "none" : "block"}>
                  {formatDate(song.createdAt)}
                </Td>
                <Td>{formatTime(song.duration)}</Td>
                <Td>
                  {" "}
                  <IconButton
                    icon={<AiOutlineMinusCircle fontSize="10px" />}
                    aria-label="remove"
                    colorScheme="red"
                    size="xs"
                    isRound
                    onClick={() => {
                      removeTrack(i);
                    }}
                  />
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default PlaylistTable;
