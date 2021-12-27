import { Box, Input } from "@chakra-ui/react";

export function PlaylistNameInput({
  title,
  variant,
  getPlaylistData,
  readOnly,
  onEdit,
}) {
  return (
    <Box>
      <Input
        variant={variant}
        value={title}
        onChange={getPlaylistData}
        height={"50px"}
        fontSize={"50px"}
        onClick={onEdit}
        isReadOnly={readOnly}
        placeholder="playlist title"
      />
    </Box>
  );
}
