import Location from "../db/models/Location/Location";

const getAllLocations = async (whereClause?: any) => {
 const location = await Location.findAll(whereClause);
 return location;
};
const getLocationById = async (id: number) => {
 const location = await Location.findByPk(id);
 return location;
};
const createLocation = async (data: any) => {
 const location = await Location.create(data);
 return location;
};
export { createLocation,getAllLocations, getLocationById };
