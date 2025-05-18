import { User, Property, PropertyImage, PropertyPriceHistory, Location } from ".";
User.hasMany(Property, {
 as: "listedProperties",
 foreignKey: "listedByUserId",
});
User.belongsToMany(Property, {
 through: "UserSavedProperties",
 as: "savedProperties",
 foreignKey: "userId",
});
Property.belongsTo(User, { as: "listedByUser", foreignKey: "listedByUserId" });
Property.belongsToMany(User, {
 through: "UserSavedProperties",
 as: "savedByUsers",
 foreignKey: "propertyId",
});
Property.hasMany(PropertyPriceHistory, {
 foreignKey: "propertyId",
 as: "priceHistory",
});

PropertyPriceHistory.belongsTo(Property, {
 foreignKey: "propertyId",
 as: "property",
});
Property.hasMany(PropertyImage, {
 foreignKey: "propertyId",
 as: "images",
});

PropertyImage.belongsTo(Property, {
 foreignKey: "propertyId",
 as: "property",
});
Property.belongsTo(Location, { foreignKey: "locationId", as: "location" });
Location.hasMany(Property, { foreignKey: "locationId", as: "properties" });
