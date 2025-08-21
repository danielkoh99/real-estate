import { useMutation } from "@tanstack/react-query";

import toast from "@/utils/toast";
import {
  deleteUserProfile,
  updatePassword,
  updateUserProfile,
} from "@/services/user";

const useUserMutations = () => {
  const updateMutation = useMutation({
    mutationFn: updateUserProfile,
    mutationKey: ["updateProfile"],
    onSuccess: (response) => {
      toast.success(
        "Success",
        response.message ?? "Profile updated successfully"
      );
    },
    onError: (error: any) => {
      toast.error("Error", error.message);
    },
  });

  const deleteMutation = useMutation({
    mutationFn: deleteUserProfile,
    mutationKey: ["deleteProfile"],
    onSuccess: (response) => {
      toast.success("Profile deleted successfully", response.message ?? "");
    },
    onError: (error: any) => {
      toast.error("Failed to delete profile", error.message);
    },
  });
  const updatePasswordMutation = useMutation({
    mutationFn: updatePassword,
    mutationKey: ["updatePassword"],
    onSuccess: (response) => {
      toast.success(
        "Success",
        response.message ?? "Password updated successfully"
      );
    },
    onError: (error: any) => {
      toast.error("Error", error.message);
    },
  });

  return {
    updateMutation,
    deleteMutation,
    updatePasswordMutation,
  };
};

export default useUserMutations;
