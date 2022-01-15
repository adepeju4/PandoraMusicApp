import { Box, Input } from "@chakra-ui/react";
import { useWindowDimensions } from "../lib/hooks";

export function PlaylistNameInput({
  title,
  variant,
  getPlaylistData,
  readOnly,
  onEdit,
}) {
  const { width: screensize } =
    typeof window !== "undefined" && useWindowDimensions();
  return (
    <Box>
      <Input
        variant={variant}
        value={title}
        onChange={getPlaylistData}
        height={"100px"}
        fontSize={screensize <= 500 ? "2.5rem" : "6xl"}
        onClick={onEdit}
        isReadOnly={readOnly}
        placeholder="playlist title"
      />
    </Box>
  );
}
