import { Box } from "@chakra-ui/layout";
import { Table, Thead, Td, Tr, Tbody, Th, IconButton } from "@chakra-ui/react";
import { useEffect } from "react";
import {
  AiOutlineClockCircle,
  AiOutlinePlus,
  AiOutlineMinusCircle,
} from "react-icons/ai";
import { formatTime, formatDate } from "../lib/formatters";

const PlaylistTable = ({ submit, removeTrack, songs }) => {
  return (
    <Box bg="transparent" color="white">
      <Box padding="10px" marginBottom="20px">
        <Box marginBottom="30px" display={"flex"} alignItems="center">
          <IconButton
            icon={<AiOutlinePlus fontSize="30px" />}
            aria-label="create-playlist"
            colorScheme="green"
            size="lg"
            isRound
            onClick={submit}
          />
          <Box marginLeft={"20px"}>Create Playlist</Box>
        </Box>
        <Table variant="unstyled">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,0.2)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
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
                <Td>{i + 1}</Td>
                <Td>{song.name}</Td>
                <Td>{formatDate(song.createdAt)}</Td>
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