import { CreateUser, UpdateUser } from "@/types";
import { apiRequest } from "@/utils";

const updateUserProfile = async ({
    userId,
    data,
}: {
    userId: string;
    data: Partial<UpdateUser>;
}) => {
    const response = await apiRequest<Partial<UpdateUser>>({
        url: `/user/${userId}`,
        method: "PATCH",
        data: data,
        config: {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    });

    return response;
};
const deleteUserProfile = async (userId: string) => {
    const response = await apiRequest({
        url: `/user/${userId}`,
        method: "DELETE",
    });

    return response;
};
const signUpUser = async (data: Partial<CreateUser>) => {
    const response = await apiRequest<Partial<CreateUser>>({
        url: "/auth/signup",
        method: "POST",
        data: data,
    });

    return response;
};

export { updateUserProfile, deleteUserProfile, signUpUser };
