import {
  Box,
  Table,
  Thead,
  Tr,
  Th,
  Td,
  Tbody,
  IconButton,
} from "@chakra-ui/react";

import { BsFillPlayFill } from "react-icons/bs";

import { AiOutlineClockCircle } from "react-icons/ai";
import { formatDate, formatTime } from "../lib/formatters";

const SongsTable = ({ songs }) => {
  console.log(songs);
  return (
    <Box bg="transparent">
      <Box padding="10px" marginBottom="20px">
        <IconButton
          icon={<BsFillPlayFill />}
          aria-label="play"
          colorScheme="green"
          size="lg"
          isRound
          marginBottom="30px"
        />
        <Table variant="unstyled" color="#fff">
          <Thead borderBottom="1px solid" borderColor="rgba(255,255,255,.2)">
            <Tr>
              <Th>#</Th>
              <Th>Title</Th>
              <Th>Date Added</Th>
              <Th>
                <AiOutlineClockCircle />
              </Th>
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
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
};

export default SongsTable;
