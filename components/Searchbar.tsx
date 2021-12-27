import { Input } from "@chakra-ui/react";

function Searchbar({ searchTerm, onSaveSearchTerm }) {
  return (
    <Input
      placeholder="search"
      type={"text"}
      size={"sm"}
      marginTop={"15px"}
      borderRadius={"10px"}
      outline={"none"}
      border={"1px solid #fff"}
      value={searchTerm}
      onChange={onSaveSearchTerm}
    />
  );
}

export default Searchbar;
