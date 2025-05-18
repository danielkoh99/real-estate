import { PropertyImageAttributes } from "../Image/image.interface";

interface PropertyAttributes {
 id: string;
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
 district?: BPDistricts | null;
 squarMeterPrice?: number;
 yearBuilt?: number;
 description?: string;
 savedByUserId?: number[];
 listedByUserId?: number;
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

enum BPDistricts {
 I = "I",
 II = "II",
 III = "III",
 IV = "IV",
 V = "V",
 VI = "VI",
 VII = "VII",
 VIII = "VIII",
 IX = "IX",
 X = "X",
 XI = "XI",
 XII = "XII",
 XIII = "XIII",
 XIV = "XIV",
 XV = "XV",
 XVI = "XVI",
 XVII = "XVII",
 XVIII = "XVIII",
 XIX = "XIX",
 XX = "XX",
 XXI = "XXI",
 XXII = "XXII",
 XXIII = "XXIII",
}
enum PropertyType {
 APARTMENT = "Apartment",
 HOUSE = "House",
}
enum PropertyCategory {
 USED = "Used",
 NEW = "New",
 NEWLY_BUILT = "Newly Built",
 UNDER_CONSTRUCTION = "Under Construction",
 RENOVATED = "Renovated",
 LUXURY = "Luxury",
 COMMERCIAL = "Commercial",
 INDUSTRIAL = "Industrial",
 VACATION_HOME = "Vacation Home",
 OTHER = "Other",
}
export { PropertyAttributes, PropertyType, PropertyCategory, BPDistricts, LocationData };
