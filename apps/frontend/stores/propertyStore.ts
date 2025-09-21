import { create } from "zustand";
import { persist } from "zustand/middleware";

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
  showMap: boolean;
  setShowMap: (value: boolean) => void;
  fetchProperties: () => Promise<PropertyRes | null>;
  fetchUserProperties: () => Promise<void>;
  getAvalaibleCities: () => string[];
  getAvailabelYearsBuilt: () => number[];
  getProperties: () => PropertyResponse[];
  getLoading: () => boolean;
  getError: () => string | null;
  getTotalItems: () => number;
  getIsSaved: (propertyId: string) => boolean;
}

const usePropertyStore = create<Store>()(
  persist(
    (set, get): Store => ({
      properties: [],
      loading: false,
      error: null,
      filters: {},
      limit: 10,
      page: 1,
      totalPages: 1,
      totalItems: 0,
      showMap: false,

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
                ...(filters.level?.length
                  ? { level: filters.level.join(",") }
                  : {}),
              },
            },
          });

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

      setShowMap: (value: boolean) => {
        set({ showMap: value });
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
      getTotalItems: () => get().totalItems,
    }),
    {
      name: "property-store",
      partialize: (state) => ({ showMap: state.showMap }),
    },
  ),
);

export default usePropertyStore;
