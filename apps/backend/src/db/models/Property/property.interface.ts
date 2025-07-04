import { BPDistricts, PropertyCategory, PropertyType } from "@real-estate/shared";

import { PropertyImageAttributes } from "../Image/image.interface";

interface PropertyAttributes {
 id?: string;
 createdAt?: Date;
 updatedAt?: Date;
 price: number;
 size: number;
 address: string;
 bedrooms: number;
 bathrooms: number;
 type: PropertyType;
 category: PropertyCategory;
 city: string;
 district: BPDistricts;
 squarMeterPrice?: number;
 yearBuilt: number;
 description: string;
 savedByUserId: number[];
 listedByUserId: number;
 images?: PropertyImageAttributes[];
 locationId: number;
 oldPrice?: number;
 priceChange?: number;
}
interface LocationData {
 lat: string;
 lon: string;
 boundingbox: [string, string, string, string];
}

export { LocationData, PropertyAttributes };
