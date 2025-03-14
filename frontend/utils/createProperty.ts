import { apiRequest } from "./customFetch";

import { AddProperty } from "@/types";

export const createProperty = async <T>(formData: AddProperty) => {
    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
        if (key !== "images") {
            formDataToSend.append(key, String(value));
        }
    });

    if (formData.images) {
        formData.images.forEach((file) => {
            formDataToSend.append("images", file);
        });
    }
    const response = await apiRequest<T>({
        url: `/property`,
        method: "POST",
        data: formDataToSend,
        config: {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        },
    });

    return response.response?.data as T;
};
