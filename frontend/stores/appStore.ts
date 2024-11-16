import { create } from "zustand";

import { Property, PropertyRes } from "@/types";
import apiRequest from "@/utils/customFetch";

interface Filter {
  [key: string]: string | number; // Define filter criteria as needed
}

interface Store {
  properties: Property[];
  loading: boolean;
  error: string | null;
  filters: Filter;
  limit: number;
  page: number;
  totalPages: number;
  totalItems: number;
  fetchProperties: () => Promise<void>;
  fetchUserProperties: () => Promise<void>;
  setFilters: (filters: Filter) => void;
  setPage: (page: number) => void;
  setLimit: (limit: number) => void;
  getLimit: () => string;
  getProperties: () => Property[];
  getLoading: () => boolean;
  getError: () => string | null;
  getFilters: () => Filter;
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
    const { limit, page, filters } = get();

    set({ loading: true, error: null }); // Set loading to true before fetching

    const { response, error } = await apiRequest<PropertyRes>({
      url: "/property",
      method: "GET",
      config: {
        params: {
          limit,
          page,
          ...filters, // Apply filters dynamically
        },
      },
    });

    if (error) {
      set({ error: error.message, loading: false });
    } else if (response) {
      set({
        properties: response.data.properties,
        loading: false,
        totalPages: response.data.totalPages,
        totalItems: response.data.totalItems,
        page: response.data.currentPage,
      });
    }
  },

  fetchUserProperties: async () => {
    set({ loading: true, error: null });
    const { response, error } = await apiRequest<PropertyRes>({
      url: "/user/properties",
      method: "GET",
    });

    if (error) {
      set({ error: error.message, loading: false });
    } else if (response) {
      set({
        properties: response.data.properties, // Assuming response has `properties` array
        loading: false,
      });
    }
  },

  setFilters: (filters) => {
    set({ filters });
    get().fetchProperties();
  },
  setPage: (page) => {
    set({ page }); // Update the page state
    get().fetchProperties(); // Call fetchProperties whenever the page changes
  },
  setLimit: async (limit) => {
    set({ limit }); // Update the limit state
    get().fetchProperties(); // Call fetchProperties whenever the limit changes
  },

  // Selectors to get current state
  getProperties: () => get().properties,
  getLoading: () => get().loading,
  getError: () => get().error,
  getFilters: () => get().filters,
  getLimit: () => get().limit.toString(),
}));

export default usePropertyStore;
