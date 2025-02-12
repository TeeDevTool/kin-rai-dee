import { z } from "zod";
import { createStore } from "zustand/vanilla";

export enum Category {
  Noodle = "NOODLE",
  Spicy = "SPICY",
  NonSpicy = "NON_SPICY",
  Healthy = "HEALTHY",
  SoftDiet = "SOFT_DIET",
}

export enum Region {
  Northern = "NORTHERN",
  Esan = "ESAN",
  Southern = "SOUTHERN",
  Central = "CENTRAL",
}

export enum Cuisine {
  Thai = "THAI",
  Chinese = "CHINESE",
  Korean = "KOREAN",
  Japanese = "JAPANESE",
  Vietnamese = "VIETNAMESE",
  Western = "WESTERN",
}

const ALL_CATEGORIES = [
  Category.Noodle,
  Category.Spicy,
  Category.NonSpicy,
  Category.Healthy,
  Category.SoftDiet,
];
const ALL_REGIONS = [
  Region.Northern,
  Region.Esan,
  Region.Southern,
  Region.Central,
];
const ALL_CUISINES = [
  Cuisine.Thai,
  Cuisine.Chinese,
  Cuisine.Korean,
  Cuisine.Japanese,
  Cuisine.Vietnamese,
  Cuisine.Western,
];

export const filterSchema = z.object({
  categories: z.array(z.nativeEnum(Category)),
  regions: z.array(z.nativeEnum(Region)),
  cuisines: z.array(z.nativeEnum(Cuisine)),
});

export type FilterState = z.infer<typeof filterSchema>;

export type FilterActions = {
  setRegions: (regions: Region) => void;
  setCategories: (categories: Category) => void;
  setCuisines: (cuisines: Cuisine) => void;
  setFilterAll: () => void;
  getIsFilterAll: () => boolean;
};

export type FilterStore = FilterState & FilterActions;

export const defaultInitState: FilterState = {
  categories: ALL_CATEGORIES,
  regions: ALL_REGIONS,
  cuisines: ALL_CUISINES,
};

function setFilter<T>(filter: T, filterList: T[]) {
  return filterList.includes(filter)
    ? filterList.filter((f) => f !== filter)
    : [...filterList, filter];
}

function getIsFilterAll(state: FilterState) {
  return !(
    ALL_CATEGORIES.some((category) => !state.categories.includes(category)) ||
    ALL_REGIONS.some((region) => !state.regions.includes(region)) ||
    ALL_CUISINES.some((cuisine) => !state.cuisines.includes(cuisine))
  );
}

function setFilterAll(state: FilterState) {
  return getIsFilterAll(state)
    ? {
        categories: [],
        regions: [],
        cuisines: [],
      }
    : {
        categories: ALL_CATEGORIES,
        regions: ALL_REGIONS,
        cuisines: ALL_CUISINES,
      };
}

export const createFilterStore = (
  initState: FilterState = defaultInitState,
) => {
  return createStore<FilterStore>()((set, get) => ({
    ...initState,
    setFilterAll: () => set((state) => ({ ...setFilterAll(state) })),
    setRegions: (regions: Region) =>
      set((state) => ({ regions: setFilter(regions, state.regions) })),
    setCategories: (categories: Category) =>
      set((state) => ({ categories: setFilter(categories, state.categories) })),
    setCuisines: (cuisines: Cuisine) =>
      set((state) => ({ cuisines: setFilter(cuisines, state.cuisines) })),
    getIsFilterAll: () => getIsFilterAll(get()),
  }));
};
