import { create } from "zustand";

import { PropertyResponse, User } from "@/types";
import { apiRequest } from "@/utils";
interface UserStore {
  savedProperties: PropertyResponse[];
  listedProperties: string[];
  currentUser?: User;
  fetchSavedProperties: () => Promise<void>;
  getSavedProperties: () => PropertyResponse[];
  getSavedPropertiesIds: () => string[];
  saveProperty: (propertyId: string, userId: string) => Promise<void>;
  setCurrentUser: (user: User) => void;
  clearUser: () => void;
  loading: boolean;
  error: string | null;
}
const useUserStore = create<UserStore>((set, get) => ({
  loading: false,
  error: null,
  savedProperties: [],
  listedProperties: [],
  currentUser: undefined,
  fetchSavedProperties: async () => {
    try {
      set({ loading: true });
      const response = await apiRequest<PropertyResponse[]>({
        url: "/property/saved",
        method: "GET",
      });

      if (response) {
        set({ savedProperties: response });
      } else {
        set({ savedProperties: [] });
      }
    } catch (error) {
      throw error;
    } finally {
      set({ loading: false });
    }
  },
  setCurrentUser: (user) => set({ currentUser: user }),
  saveProperty: async (propertyId, userId) => {
    try {
      const { error } = await apiRequest({
        url: "/property/save",
        method: "POST",
        data: {
          propertyId: propertyId,
          userId: Number(userId),
        },
      });

      if (error) throw error;
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },
  clearUser: () => set({ currentUser: undefined }),
  getSavedProperties: () => get().savedProperties,
  getSavedPropertiesIds: () =>
    get().savedProperties.map((property) => property.id),
}));

export default useUserStore;
