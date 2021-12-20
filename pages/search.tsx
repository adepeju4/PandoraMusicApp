import { Box, Flex, Text, Image } from "@chakra-ui/react";
import GradientLayout from "../components/gradientLayout";
import Searchbar from "../components/Searchbar";

import React from "react";

export default function Search() {
  return (
    <GradientLayout
      color="yellow"
      subtitle="search"
      title={`Search Tracks`}
      description={<Searchbar setSearchItem={"text"} />}
      roundImage
      image="https://media.istockphoto.com/photos/3d-microphone-icon-isolated-on-white-background-3d-rendering-icon-picture-id1317330756?b=1&k=20&m=1317330756&s=170667a&w=0&h=d85OVzcjWJe9ITBMhwSo6O-BYS4Ewe7rN2ltPrXI4Og="
    >
      <Box>search</Box>
    </GradientLayout>
  );
}
