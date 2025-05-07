import { useMutation } from "@tanstack/react-query";

import toast from "@/utils/toast";
import { deleteUserProfile, updateUserProfile } from "@/services/user";

export const useUserMutations = () => {
    const updateMutation = useMutation({
        mutationFn: updateUserProfile,
        onSuccess: (response) => {
            toast.success(
                "Success",
                response.message ?? "Profile updated successfully",
            );
        },
        onError: (error: any) => {
            toast.error("Error", error.message);
        },
    });

    const deleteMutation = useMutation({
        mutationFn: deleteUserProfile,
        onSuccess: (response) => {
            toast.success("Profile deleted successfully", response.message ?? "");
        },
        onError: (error: any) => {
            toast.error("Failed to delete profile", error.message);
        },
    });

    return {
        updateMutation,
        deleteMutation,
    };
};
