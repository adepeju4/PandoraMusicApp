import { createStore, action } from "easy-peasy";

export const store = createStore({
  activeSongs: [],
  activeSong: null,
  random: [],
  library: [],
  changeActiveSongs: action((state: any, payload) => {
    state.activeSongs = payload;
  }),
  changeActiveSong: action((state: any, payload) => {
    state.activeSong = payload;
  }),
  changerandom: action((state: any, payload) => {
    state.random = payload;
  }),
  setLibrary: action((state: any, payload) => {
    state.library = payload;
  }),
});
