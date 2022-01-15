import { Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";

import { Image } from "@chakra-ui/react";

function GradientLayout({
  color,
  children,
  image,
  subtitle,
  title,
  description,
  roundImage,
}) {
  const [matches] = useMediaQuery("(max-width:600px)");
  return (
    <Box
      height="100%"
      overflowY="auto"
      bgGradient={`linear(${color}.500 0%, ${color}.600 15%, ${color}.700 40%, rgba(0,0,0,0.95) 75%)`}
    >
      <Flex
        bg={`${color}.600`}
        padding="40px"
        align={matches ? "center" : "end"}
        direction={matches ? "column" : "row"}
      >
        <Box padding="20px">
          <Image
            boxSize="160px"
            boxShadow="2xl"
            src={image}
            borderRadius={roundImage ? "100%" : "3px"}
            objectFit={"cover"}
          />
        </Box>
        <Flex
          padding="20px"
          lineHeight="40px"
          color="white"
          direction={"column"}
          justifyContent={matches && "center"}
          alignItems={matches && "center"}
          textAlign={matches ? "center" : "left"}
        >
          <Text fontSize="x-small" fontWeight="bold" casing="uppercase">
            {subtitle}
          </Text>
          <Text fontSize="6xl" lineHeight={"55px"}>
            {title}
          </Text>
          <Text fontSize="x-small">{description}</Text>
        </Flex>
      </Flex>
      <Box paddingY="50px">{children}</Box>
    </Box>
  );
}

export default GradientLayout;
