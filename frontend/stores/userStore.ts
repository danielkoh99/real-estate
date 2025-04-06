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
  saveProperty: (propertyId: string, userId: number) => Promise<void>;
  setCurrentUser: (user: User) => void;
  clearUser: () => void;
}
const useUserStore = create<UserStore>((set, get) => ({
  savedProperties: [],
  listedProperties: [],
  currentUser: undefined,
  fetchSavedProperties: async () => {
    try {
      const { response, error } = await apiRequest<BaseProperty[]>({
        url: "/property/saved",
        method: "GET",
      });

      if (error) {
        console.error("Error fetching saved properties:", error);

        return;
      }

      if (response && response.data) {
        set({ savedProperties: response.data });
      } else {
        console.warn("No properties found in API response.");
      }
    } catch (err) {
      console.error("Unexpected error fetching saved properties:", err);
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
          userId: userId,
        },
      });

      if (error) throw error;
    } catch (error) {
      console.error("Error saving property:", error);
    }
  },
  clearUser: () => set({ currentUser: undefined }),
  getSavedProperties: () => get().savedProperties,
  getSavedPropertiesIds: () =>
    get().savedProperties.map((property) => property.id),
}));

export default useUserStore;
