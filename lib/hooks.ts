import useSWR from "swr";
import fetcher from "./fetcher";
import { useState, useEffect } from "react";

export const useMe = () => {
  const { data, error } = useSWR("/me", fetcher);
  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};
export const usePlaylist = () => {
  const { data, error } = useSWR("/playlists", fetcher);
  return {
    playlists: (data as any) || [],
    isLoading: !data && !error,
    isError: error,
  };
};

function getWindowDimensions() {
  if (typeof window !== "undefined") {
    const { innerWidth: width, innerHeight: height } = window;

    return {
      width,
      height,
    };
  }
}

export function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(
    getWindowDimensions()
  );

  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleResize = () => {
        setWindowDimensions(getWindowDimensions());
      };

      window.addEventListener("resize", handleResize);
      return () => window.removeEventListener("resize", handleResize);
    }
  }, []);

  return windowDimensions;
}
