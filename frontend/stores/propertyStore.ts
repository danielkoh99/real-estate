import { create } from "zustand";

import { useQueryStore } from "./queryStore";
import useUserStore from "./userStore";

import { PropertyResponse, PropertyRes } from "@/types";
import { apiRequest } from "@/utils/index";

interface Filter {
  [key: string]: string | number;
}

interface Store {
  properties: PropertyResponse[];
  loading: boolean;
  error: string | null;
  filters: Filter;
  limit: number;
  page: number;
  totalPages: number;
  totalItems: number;
  fetchProperties: () => Promise<PropertyRes | null>;
  getAvalaibleCities: () => string[];
  getAvailabelYearsBuilt: () => number[];
  getProperties: () => PropertyResponse[];
  getLoading: () => boolean;
  getError: () => string | null;
  getTotalItems: () => number;
  getIsSaved: (propertyId: string) => boolean;
}

const usePropertyStore = create<Store>((set, get) => ({
  properties: [],
  loading: false,
  error: null,
  filters: {},
  limit: 10,
  page: 1,
  totalPages: 1,
  totalItems: 0,

  fetchProperties: async () => {
    const { filters } = useQueryStore.getState();

    set({ loading: true, error: null });
    try {
      const response = await apiRequest<PropertyRes>({
        url: "/property",
        method: "GET",
        config: {
          params: {
            ...filters,
            ...(filters.districts?.length
              ? { districts: filters.districts.join(",") }
              : {}),
          },
        },
      });

      console.log(response);
      set({
        properties: response.properties,
        loading: false,
        totalPages: response.totalPages,
        totalItems: response.totalItems,
        page: response.currentPage,
      });

      return response;
    } catch (error: any) {
      set({ error: error.message, loading: false });

      return null;
    }
  },

  fetchUserProperties: async () => {
    set({ loading: true, error: null });
    try {
      const response = await apiRequest<PropertyRes>({
        url: "/user/properties",
        method: "GET",
      });

      set({
        properties: response.properties,
        loading: false,
      });
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  getAvalaibleCities: () => {
    const cities = get().properties.map((property) => property.city);

    return cities;
  },
  getAvailabelYearsBuilt: () => {
    const years = get().properties.map((property) => property.yearBuilt);

    return years;
  },
  getIsSaved(propertyId) {
    const { getSavedPropertiesIds } = useUserStore.getState();

    return getSavedPropertiesIds().includes(propertyId);
  },
  getProperties: () => get().properties,
  getLoading: () => get().loading,
  getError: () => get().error,
  getFilters: () => get().filters,
  getTotalItems: () => get().totalItems,
}));

export default usePropertyStore;
