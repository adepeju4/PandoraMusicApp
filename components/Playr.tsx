import {
  Box,
  ButtonGroup,
  IconButton,
  Center,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
  Flex,
  Text,
} from "@chakra-ui/react";
import ReactHowler from "react-howler";

import { useEffect, useRef, useState } from "react";

import {
  MdShuffle,
  MdSkipPrevious,
  MdSkipNext,
  MdOutlinePlayCircleFilled,
  MdOutlinePauseCircleFilled,
  MdOutlineRepeat,
} from "react-icons/md";

import { useStoreActions } from "easy-peasy";

const Player = () => {
  return (
    <Box>
      <Box>{/* <ReactHowler /> */}</Box>
      <Center>
        <ButtonGroup>
          <IconButton
            outline="none"
            aria-label="shuffle"
            fontSize="24px"
            variant="link"
            icon={<MdShuffle />}
          />
          <IconButton
            outline="none"
            aria-label="skip"
            fontSize="24px"
            variant="link"
            icon={<MdSkipPrevious />}
          />
          <IconButton
            outline="none"
            aria-label="play"
            fontSize="40px"
            color="white"
            variant="link"
            icon={<MdOutlinePlayCircleFilled />}
          />
          <IconButton
            outline="none"
            aria-label="pause"
            fontSize="40px"
            variant="link"
            icon={<MdOutlinePauseCircleFilled />}
          />
          <IconButton
            outline="none"
            aria-label="skipNext"
            fontSize="24px"
            variant="link"
            icon={<MdSkipNext />}
          />
          <IconButton
            outline="none"
            aria-label="repeat"
            fontSize="24px"
            variant="link"
            icon={<MdOutlineRepeat />}
          />
        </ButtonGroup>
      </Center>
      <Box color="gray.600">
        <Flex justify="center" align="center">
          <Box>
            <Text fontSize="xs">1:21</Text>
          </Box>
          <Box width="80%">
            <RangeSlider
              aria-label={["min", "max"]}
              min={0}
              max={321}
              id="player-range"
              step={0.1}
            >
              <RangeSliderTrack bg="gray.800">
                <RangeSliderFilledTrack bg="gray.600" />
              </RangeSliderTrack>
              <RangeSliderThumb index={0} />
            </RangeSlider>
          </Box>
        </Flex>
      </Box>
    </Box>
  );
};

export default Player;
