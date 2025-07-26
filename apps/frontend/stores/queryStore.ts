import { create } from "zustand";
import { BuildingType, HeatingType } from "@real-estate/shared";

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
    districts: null,
    petFriendly: null,
    level: null,
    buildingType: null as BuildingType | null,
    hasGarden: null,
    hasTerrace: null,
    heatingType: null as HeatingType | null,
    parkingSpace: null,
    hasElevator: null,
    oldPriceMin: null,
    oldPriceMax: null,
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
      yearBuilt: null,
      type: null,
      sortBy: "",
      sortDirection: SortDirection.asc,
      districts: [],
      petFriendly: null,
      level: [],
      buildingType: null,
      hasGarden: null,
      hasTerrace: null,
      heatingType: null,
      parkingSpace: null,
      hasElevator: null,
    };

    set({ filters: defaultFilters });
  },
}));
