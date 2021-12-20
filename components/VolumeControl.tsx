import {
  Box,
  Flex,
  IconButton,
  RangeSlider,
  RangeSliderFilledTrack,
  RangeSliderThumb,
  RangeSliderTrack,
} from "@chakra-ui/react";

import { useEffect, useRef, useState } from "react";

import {
  BsFillVolumeUpFill,
  BsVolumeMuteFill,
  BsVolumeDownFill,
} from "react-icons/bs";

import React from "react";

function VolumeControl({ soundRef, mute, setmute }) {
  const minVolume = 0.0;
  const maxVolume = 1.0;
  const [volume, setVolume] = useState(0.0);
  const [isIncreasing, setIsIncreasing] = useState(false);

  useEffect(() => {
    let startId;

    if (!isIncreasing) {
      const f = () => {
        setVolume(soundRef.current.volume());
        startId = requestAnimationFrame(f);
      };

      startId = requestAnimationFrame(f);
      return () => cancelAnimationFrame(startId);
    }

    cancelAnimationFrame(startId);
  }, [isIncreasing]);

  const onSeek = (e) => {
    setVolume(parseFloat(e[0]));
    soundRef.current.volume(e[0]);
    setIsIncreasing(true);
  };

  const onMute = (e) => {
    setmute(true);
  };
  const unMute = (e) => {
    setmute(false);
  };

  return (
    <Box>
      <Flex justifyContent="flex-end" alignItems="center">
        <Box>
          {mute && (
            <IconButton
              outline="none"
              variant="link"
              aria-label="mute"
              fontSize="24px"
              marginRight="10px"
              colorScheme={"gray"}
              onClick={unMute}
              icon={<BsVolumeMuteFill />}
            />
          )}

          {!mute && volume > 0.4 && (
            <IconButton
              outline="none"
              variant="link"
              aria-label="volumeUp"
              fontSize="24px"
              marginRight="10px"
              colorScheme={"gray"}
              onClick={onMute}
              icon={<BsFillVolumeUpFill />}
            />
          )}
          {!mute && volume <= 0.4 && (
            <IconButton
              outline="none"
              variant="link"
              aria-label="volumeUp"
              fontSize="24px"
              marginRight="10px"
              colorScheme={"gray"}
              onClick={onMute}
              icon={<BsVolumeDownFill />}
            />
          )}
        </Box>
        <Box width="50%">
          <RangeSlider
            aria-label={["min", "max"]}
            step={0.1}
            min={minVolume}
            max={maxVolume}
            id="volume-range"
            onChange={onSeek}
            value={mute ? [0, 0] : [volume]}
            onChangeStart={() => setIsIncreasing(true)}
            onChangeEnd={() => setIsIncreasing(false)}
          >
            <RangeSliderTrack bg="gray.800">
              <RangeSliderFilledTrack bg="gray.600" />
            </RangeSliderTrack>
            <RangeSliderThumb index={0} />
          </RangeSlider>
        </Box>
      </Flex>
    </Box>
  );
}

export default VolumeControl;
