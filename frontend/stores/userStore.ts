import { create } from "zustand";

import { BaseProperty, User } from "@/types";
import { apiRequest } from "@/utils";
interface UserStore {
  savedProperties: BaseProperty[];
  listedProperties: string[];
  currentUser?: User;
  fetchSavedProperties: () => Promise<void>;
  getSavedProperties: () => BaseProperty[];
  getSavedPropertiesIds: () => string[];
  saveProperty: (propertyId: string, userId: string) => Promise<void>;
  setCurrentUser: (user: User) => void;
  clearUser: () => void;
}
const useUserStore = create<UserStore>((set, get) => ({
  savedProperties: [],
  listedProperties: [],
  currentUser: undefined,
  fetchSavedProperties: async () => {
    try {
      const response = await apiRequest<BaseProperty[]>({
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
    } catch (error) {
      throw error;
    }
  },
  clearUser: () => set({ currentUser: undefined }),
  getSavedProperties: () => get().savedProperties,
  getSavedPropertiesIds: () =>
    get().savedProperties.map((property) => property.id),
}));

export default useUserStore;
