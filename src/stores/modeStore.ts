import { createStore } from "zustand/vanilla";

export enum Mode {
  Savory = "SAVORY",
  Sweet = "SWEET",
}

export type ModeState = {
  mode: Mode;
};

export type ModeActions = {
  changeMode: (mode: Mode) => void;
};

export type ModeStore = ModeState & ModeActions;

export const defaultInitState: ModeState = {
  mode: Mode.Savory,
};

export const createModeStore = (initState: ModeState = defaultInitState) => {
  return createStore<ModeStore>()((set) => ({
    ...initState,
    changeMode: (mode: Mode) => set(() => ({ mode })),
  }));
};
