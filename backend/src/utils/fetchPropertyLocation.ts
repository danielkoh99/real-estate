import axios, { AxiosResponse } from "axios";
import { LocationData } from "../db/models/Property/property.interface";
interface LocationSuccessResponse {
    lat: number;
    lon: number;
    boundingbox: [number, number, number, number];
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
            return { lat: 0, lon: 0, boundingbox: [0, 0, 0, 0] };
        }

        const locationData = locationResponse.data[0];
        const mappedBoundingBox = locationData.boundingbox.map(b => parseFloat(b)) as [number, number, number, number];

        return {
            lat: parseFloat(locationData.lat),
            lon: parseFloat(locationData.lon),
            boundingbox: mappedBoundingBox
        };
    } catch (error) {
        return { message: "Error fetching location" };
    }
};
export default fetchPropertyLocation;