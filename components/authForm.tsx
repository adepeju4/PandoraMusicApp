import { Box, Flex, Input, Button, Text } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { FC, useState } from "react";
import NextImage from "next/image";
import { auth } from "../lib/mutations";
import { useWindowDimensions } from "../lib/hooks";

const AuthForm: FC<{ mode: "signin" | "signup" }> = ({ mode }) => {
  const [firstName, setfirstName] = useState("");
  const [lastName, setlastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, seterror] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    seterror("");

    const Auth = await auth(mode, { firstName, lastName, email, password });

    setIsLoading(false);

    if (Auth.error) seterror(Auth.error);
    else router.push("/");
  };

  const { width: screensize } =
    typeof window !== "undefined" && useWindowDimensions();

  return (
    <Box height="100vh" width="100vw" bg="black" color="white">
      <Flex
        justify="center"
        align="center"
        height="100px"
        borderBottom="white 1px solid"
      >
        <NextImage src="/logo.svg" height={60} width={120} />
      </Flex>
      <Flex justify="center" align="center" height="calc(100vh - 100px)">
        <Box
          paddingX={screensize >= 650 ? "50px" : "20px"}
          paddingY={screensize >= 650 ? "50px" : "30px"}
          bg="gray.900"
          borderRadius="6px"
          maxWidth={screensize >= 600 ? "50%" : "90%"}
        >
          <form onSubmit={handleSubmit}>
            {error && <Text color="red.600"> {error}</Text>}

            {mode === "signup" && (
              <>
                <Input
                  placeholder="firstName"
                  type="text"
                  onChange={(e) => setfirstName(e.target.value)}
                  marginBottom={"15px"}
                />
                <Input
                  placeholder="lastName"
                  type="text"
                  onChange={(e) => setlastName(e.target.value)}
                  marginBottom={"15px"}
                />
              </>
            )}

            <Input
              placeholder="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              marginBottom={"15px"}
            />
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              marginBottom={"15px"}
            />
            {mode === "signup" ? (
              <Box
                onClick={() => {
                  router.push("/signin");
                }}
                color={"gray.500"}
                sx={{ cursor: "pointer", marginY: "10px" }}
              >
                already a member? signin
              </Box>
            ) : (
              <Box
                onClick={() => {
                  router.push("/signup");
                }}
                color={"gray.500"}
                sx={{ cursor: "pointer", marginY: "10px" }}
              >
                don't have an account? signup
              </Box>
            )}
            <Button
              type="submit"
              bg="green.500"
              isLoading={isLoading}
              sx={{
                "&:hover": {
                  bg: "green.300",
                },
              }}
            >
              {mode}
            </Button>
          </form>
        </Box>
      </Flex>
    </Box>
  );
};

export default AuthForm;
