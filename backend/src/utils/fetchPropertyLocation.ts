import axios, { AxiosResponse } from "axios";
import { LocationData } from "../db/models/Property/property.interface";
interface LocationSuccessResponse {
    lat: number;
    lon: number;
    minLat: number;
    maxLat: number;
    minLon: number;
    maxLon: number;
}

interface LocationErrorResponse {
    message: string;
}

type LocationResponse = LocationSuccessResponse | LocationErrorResponse;
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
            lat: parseFloat(locationData.lat),
            lon: parseFloat(locationData.lon),
            minLat: parseFloat(locationData.boundingbox[0]),
            maxLat: parseFloat(locationData.boundingbox[1]),
            minLon: parseFloat(locationData.boundingbox[2]),
            maxLon: parseFloat(locationData.boundingbox[3]),
        };
    } catch (error) {
        return { message: "Error fetching location" };
    }
};
export default fetchPropertyLocation;