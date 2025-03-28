import axios, { AxiosResponse } from "axios";
import { LocationData } from "../db/models/Property/property.interface";
interface LocationResponse {
    lat?: string;
    lon?: string;
    boundingBox?: string;
    message?: string;
}

const fetchPropertyLocation = async (address: string): Promise<LocationResponse> => {
    try {
        const locationResponse: AxiosResponse<LocationData[]> = await axios.get(
            `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(address)}`
        );

        if (!locationResponse.data.length) {
            return { message: "Could not find location" };
        }

        const locationData = locationResponse.data[0];
        return {
            lat: locationData.lat,
            lon: locationData.lon,
            boundingBox: JSON.stringify(locationData.boundingbox),
        };
    } catch (error) {
        console.error("Error fetching location", error);
        return { message: "An error occurred" };
    }
};

export default fetchPropertyLocation;