interface LocationAttributes {
    id: number;
    lat: number;
    lon: number;
    boundingbox: [number, number, number, number];
    createdAt?: Date;
    updatedAt?: Date;
}