import { createStore } from "zustand/vanilla";
import { persist, createJSONStorage } from "zustand/middleware";

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

export type ModeStoreApi = {
  getState: () => ModeStore;
  getInitialState: () => ModeStore;
  setState: (
    partial:
      | ModeStore
      | Partial<ModeStore>
      | ((state: ModeStore) => ModeStore | Partial<ModeStore>),
  ) => void;
  subscribe: (
    listener: (state: ModeStore, prevState: ModeStore) => void,
  ) => () => void;
  persist: {
    rehydrate: () => Promise<void> | void;
    hasHydrated: () => boolean;
  };
};

export const createModeStore = (
  initState: ModeState = defaultInitState,
): ModeStoreApi => {
  return createStore<ModeStore>()(
    persist(
      (set) => ({
        ...initState,
        changeMode: (mode: Mode) => set(() => ({ mode })),
      }),
      {
        name: "kin-rai-dee-mode",
        storage: createJSONStorage(() => localStorage),
        skipHydration: true,
      }
    )
  ) as unknown as ModeStoreApi;
};
