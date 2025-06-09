import { BPDistricts } from "@shared/types/propertyTypes";
import { nanoid } from "nanoid";
import {
 CreationOptional,
 DataTypes,
 HasManyGetAssociationsMixin,
 InferAttributes,
 InferCreationAttributes,
 Model,
 NonAttribute,
} from "sequelize";

import db from "../../config_postgres";
import PropertyImage from "../Image/Image";
import PropertyPriceHistory from "../PropertyPriceHistory/PropertyPriceHistory";
import { LocationData, PropertyCategory, PropertyType } from "./property.interface";
export type PropertyAttributes = InferCreationAttributes<Property>;
class Property extends Model<InferAttributes<Property>, InferCreationAttributes<Property>> {
 declare id: CreationOptional<string>;
 declare type: PropertyType;
 declare address: string;
 declare city: string;
 declare locationId: number;
 declare bedrooms: number;
 declare squarMeterPrice: number;
 declare description: string;
 declare bathrooms: number;
 declare category: PropertyCategory;
 declare district: CreationOptional<BPDistricts | null>;
 declare yearBuilt: number;
 declare price: number;
 declare size: number;
 declare listedByUserId: number;
 declare dogFriendly: boolean;
 declare level: number;
 declare buildingType: "panel" | "brick";
 declare hasGarden: boolean;
 declare hasTerrace: boolean;
 declare heatingType: "gas" | "electric" | "central" | "other";
 declare parkingSpace: boolean;
 declare hasElevator: boolean;

 declare oldPrice: CreationOptional<number>;
 declare priceChange: CreationOptional<number>;
 declare createdAt: CreationOptional<Date>;
 declare updatedAt: CreationOptional<Date>;
 declare deletedAt: CreationOptional<Date>;

 // Non-database fields
 declare location?: NonAttribute<LocationData>;
 declare priceHistory?: NonAttribute<PropertyPriceHistory[]>;
 declare readonly images?: NonAttribute<PropertyImage[]>;

 // Association mixins
 declare getImages: HasManyGetAssociationsMixin<PropertyImage>;
}
Property.init(
 {
  id: {
   type: DataTypes.STRING(10),
   primaryKey: true,
   unique: true,
   allowNull: false,
   defaultValue: () => nanoid(10),
  },
  type: {
   type: DataTypes.ENUM(...Object.values(PropertyType)),
   allowNull: false,
  },
  address: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  city: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  locationId: {
   type: DataTypes.INTEGER,
   allowNull: false,
  },
  bedrooms: {
   type: DataTypes.INTEGER,
   allowNull: false,
  },
  squarMeterPrice: {
   type: DataTypes.FLOAT,
   allowNull: false,
  },
  description: {
   type: DataTypes.STRING(1000),
   allowNull: false,
  },
  bathrooms: {
   type: DataTypes.INTEGER,
   allowNull: false,
  },
  category: {
   type: DataTypes.ENUM(...Object.values(PropertyCategory)),
   allowNull: false,
  },
  district: {
   type: DataTypes.ENUM(...Object.values(BPDistricts)),
   allowNull: true,
  },
  yearBuilt: {
   type: DataTypes.INTEGER,
   allowNull: false,
  },
  price: {
   type: DataTypes.FLOAT,
   allowNull: false,
  },
  oldPrice: {
   type: DataTypes.FLOAT,
   allowNull: true,
  },
  priceChange: {
   type: DataTypes.FLOAT,
   allowNull: true,
  },
  size: {
   type: DataTypes.INTEGER,
   allowNull: false,
  },
  listedByUserId: {
   type: DataTypes.INTEGER,
   allowNull: false,
  },
  dogFriendly: {
   type: DataTypes.BOOLEAN,
   allowNull: false,
  },
  level: {
   type: DataTypes.INTEGER,
   allowNull: false,
  },
  buildingType: {
   type: DataTypes.ENUM("panel", "brick"),
   allowNull: false,
  },
  hasGarden: {
   type: DataTypes.BOOLEAN,
   allowNull: false,
  },
  hasTerrace: {
   type: DataTypes.BOOLEAN,
   allowNull: false,
  },
  heatingType: {
   type: DataTypes.ENUM("gas", "electric", "central", "other"),
   allowNull: false,
  },
  parkingSpace: {
   type: DataTypes.BOOLEAN,
   allowNull: false,
  },
  hasElevator: {
   type: DataTypes.BOOLEAN,
   allowNull: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
 },
 {
  sequelize: db,
  tableName: "properties",
  timestamps: true,
  paranoid: true,
 }
);
Property.addHook("beforeCreate", async (property) => {
 console.log("beforeCreate property");
 property.dataValues.oldPrice = property.dataValues.price;
 property.dataValues.priceChange = 0;
});

Property.addHook("beforeUpdate", async (property) => {
 const oldPrice = property.previous("price") as number;
 property.dataValues.priceChange = ((property.dataValues.price - oldPrice) / oldPrice) * 100;
 await PropertyPriceHistory.create({
  propertyId: property.getDataValue("id"),
  price: property.dataValues.price,
  changedAt: new Date(),
 });
});
export default Property;
