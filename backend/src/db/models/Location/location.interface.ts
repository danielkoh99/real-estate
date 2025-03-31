interface LocationAttributes {
    id: number;
    lat: number;
    lon: number;
    minLat: number;
    maxLat: number;
    minLon: number;
    maxLon: number;
    boundingBox: [number, number, number, number];
    createdAt?: Date;
    updatedAt?: Date;
}