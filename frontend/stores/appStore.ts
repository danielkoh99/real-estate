import { create } from "zustand";
import Router from "next/router";

import { Property, PropertyRes } from "@/types";
import { apiRequest } from "@/utils/index";

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
  getPage: () => number;
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

    set({ loading: true, error: null });

    const { response, error } = await apiRequest<PropertyRes>({
      url: "/property",
      method: "GET",
      config: {
        params: {
          limit,
          page,
          ...filters,
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
        properties: response.data.properties,
        loading: false,
      });
    }
  },

  setFilters: (filters) => {
    set({ filters });
    get().fetchProperties();
  },

  setPage: (page) => {
    set({ page });
    const { query } = Router;

    // Update URL
    Router.push(
      {
        pathname: Router.pathname,
        query: { ...query, page }, // Update page in the query params
      },
      undefined,
      { shallow: true },
    );
  },

  setLimit: (limit) => {
    set({ limit });
    const { query } = Router;

    // Update URL
    Router.push(
      {
        pathname: Router.pathname,
        query: { ...query, limit }, // Update limit in the query params
      },
      undefined,
      { shallow: true },
    );

    get().fetchProperties();
  },

  getProperties: () => get().properties,
  getLoading: () => get().loading,
  getError: () => get().error,
  getFilters: () => get().filters,
  getLimit: () => get().limit.toString(),
  getPage: () => get().page,
}));

export default usePropertyStore;
