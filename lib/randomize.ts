import { useStoreActions } from "easy-peasy";

export const randomize = (array: any, mode: String) => {
  const w = [...array];
  let currentIndex = w.length,
    randomIndex;

  while (currentIndex != 0) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    [w[currentIndex], w[randomIndex]] = [w[randomIndex], w[currentIndex]];
  }
  if (mode !== "songs") {
    return w[0];
  }

  return w;
};
