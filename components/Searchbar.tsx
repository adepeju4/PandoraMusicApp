import { Input } from "@chakra-ui/react";

function Searchbar({ setSearchItem }) {
  return (
    <Input
      placeholder="search"
      type={"text"}
      size={"sm"}
      marginTop={"15px"}
      borderRadius={"10px"}
      outline={"none"}
      border={"1px solid #fff"}
    />
  );
}

export default Searchbar;
