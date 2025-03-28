import Location from "../db/models/Location/Location";

const getAllLocations = async () => {
    const location = await Location.findAll();
    return location;
}
export {
    getAllLocations
}