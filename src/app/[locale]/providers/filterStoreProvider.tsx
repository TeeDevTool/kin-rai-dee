"use client";

import {
  createFilterStore,
  type FilterState,
  type FilterStore,
} from "@/app/[locale]/stores/filterStore";
import { type ReactNode, createContext, useRef, useContext } from "react";
import { useStore } from "zustand";

export type FilterStoreApi = ReturnType<typeof createFilterStore>;

export const FilterStoreContext = createContext<FilterStoreApi | undefined>(
  undefined,
);
export interface FilterStoreProviderProps {
  children: ReactNode;
  initState?: FilterState;
}

export const FilterStoreProvider = ({
  children,
  initState,
}: FilterStoreProviderProps) => {
  const storeRef = useRef<FilterStoreApi>(null);
  if (!storeRef.current) {
    storeRef.current = createFilterStore(initState);
  }

  return (
    <FilterStoreContext.Provider value={storeRef.current}>
      {children}
    </FilterStoreContext.Provider>
  );
};

export const useFilterStore = <T,>(selector: (store: FilterStore) => T): T => {
  const filterStoreContext = useContext(FilterStoreContext);

  if (!filterStoreContext) {
    throw new Error(`useFilterStore must be used within FilterStoreProvider`);
  }

  return useStore(filterStoreContext, selector);
};
