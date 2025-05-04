import { apiRequest } from "./customFetch";

import { AddProperty } from "@/types";

export const createProperty = async <T>(formData: AddProperty): Promise<T> => {
    const formDataToSend = new FormData();

    Object.entries(formData).forEach(([key, value]) => {
        if (key !== "images") {
            formDataToSend.append(key, String(value));
        }
    });

    if (formData.images && formData.images.length > 0) {
        formData.images.forEach((file) => {
            formDataToSend.append("images", file);
        });
    } else {
        throw new Error("Please upload at least one image");
    }

    try {

        const data = await apiRequest<T>({
            url: "/property",
            method: "POST",
            data: formDataToSend,
            config: {
                headers: {
                    "Content-Type": "multipart/form-data",
                },
            },
        });

        return data;
    } catch (error) {
        console.error("Error in createProperty:", error);
        throw error;
    }
};
