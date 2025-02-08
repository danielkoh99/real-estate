import { create } from "zustand";

import { PropertyFilters, SortDirection } from "@/types";

interface PropertyStore {
  updateFilters: (newFilters: Partial<PropertyFilters>) => void;
  resetFilters: () => void;
  filters: PropertyFilters;
}
export const useQueryStore = create<PropertyStore>((set) => ({
  filters: {
    page: 1,
    limit: 10,
    priceMin: null,
    priceMax: null,
    sizeMin: null,
    sizeMax: null,
    yearBuilt: null,
    type: null,
    sortBy: "",
    sortDirection: SortDirection.asc,
    districts: [],
  },

  updateFilters: (newFilters: Partial<PropertyFilters>) => {
    set((state) => ({
      filters: {
        ...state.filters,
        ...newFilters,
      },
    }));
  },
  resetFilters: () => {
    const defaultFilters: PropertyFilters = {
      page: 1,
      limit: 10,
      priceMin: null,
      priceMax: null,
      sizeMin: null,
      sizeMax: null,
      type: null,
      sortBy: "",
      sortDirection: SortDirection.asc,
      yearBuilt: null,
      districts: [],
    };

    set({ filters: defaultFilters });
  },
}));
