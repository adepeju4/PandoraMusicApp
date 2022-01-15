import React, { useState } from "react";
import {
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerHeader,
  DrawerBody,
} from "@chakra-ui/react";
import NextImage from "next/image";
import NextLink from "next/link";
import {
  Box,
  List,
  ListItem,
  ListIcon,
  Divider,
  LinkBox,
  LinkOverlay,
} from "@chakra-ui/layout";
import {
  MdHome,
  MdSearch,
  MdLibraryMusic,
  MdPlaylistAdd,
  MdFavorite,
} from "react-icons/md";
import { usePlaylist } from "../lib/hooks";
import { Spinner } from "@chakra-ui/react";
import { useStoreActions, useStoreState } from "easy-peasy";

const navMenu = [
  {
    name: "Home",
    icon: MdHome,
    route: "/",
  },
  {
    name: "Search",
    icon: MdSearch,
    route: "/search",
  },
  {
    name: "Your Library",
    icon: MdLibraryMusic,
    route: "/library",
  },
];

const musicMenu = [
  {
    name: "Create Playlist",
    icon: MdPlaylistAdd,
    route: "/createPlaylist",
  },
  {
    name: "Favorites",
    icon: MdFavorite,
    route: "/favorites",
  },
];

function MobileNav({ show, hide }) {
  const { playlists, isLoading, isError } = usePlaylist();

  return (
    <Drawer placement={"left"} onClose={hide} isOpen={show} size={"xs"}>
      <DrawerOverlay />
      <DrawerContent>
        <DrawerBody bg={"black"}>
          <Box
            width="100%"
            height="100%"
            bg="black"
            paddingX="5px"
            color="gray"
          >
            <Box paddingY="20px" height="100%">
              <Box width="120px" marginBottom="20px" paddingX="20px">
                <NextImage src="/logo.svg" height={60} width={120} />
              </Box>
              <Box marginBottom="20px">
                <List spacing={2}>
                  {navMenu.map((menu) => (
                    <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
                      <LinkBox>
                        <NextLink href={menu.route} passHref>
                          <LinkOverlay>
                            <ListIcon
                              as={menu.icon}
                              color="white"
                              marginRight="20px"
                            />
                            {menu.name}
                          </LinkOverlay>
                        </NextLink>
                      </LinkBox>
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Box marginTop="20px">
                <List spacing={2}>
                  {musicMenu.map((menu) => (
                    <ListItem paddingX="20px" fontSize="16px" key={menu.name}>
                      <LinkBox>
                        <NextLink href={menu.route} passHref>
                          <LinkOverlay>
                            <ListIcon
                              as={menu.icon}
                              color="white"
                              marginRight="20px"
                            />
                            {menu.name}
                          </LinkOverlay>
                        </NextLink>
                      </LinkBox>
                    </ListItem>
                  ))}
                </List>
              </Box>
              <Divider color="gray.800" />
              <Box height="60%" overflowY="auto" paddingY="20px">
                <List spacing={2}>
                  {isError && []}
                  {isLoading && <Spinner />}
                  {playlists.map((playlist) => (
                    <ListItem paddingX="20px" key={playlist.id}>
                      <LinkBox>
                        <NextLink
                          href={{
                            pathname: "/playlist/[id]",
                            query: { id: playlist.id },
                          }}
                          passHref
                        >
                          <LinkOverlay>{playlist.name}</LinkOverlay>
                        </NextLink>
                      </LinkBox>
                    </ListItem>
                  ))}
                </List>
              </Box>
            </Box>
          </Box>
        </DrawerBody>
      </DrawerContent>
    </Drawer>
  );
}

export default MobileNav;
