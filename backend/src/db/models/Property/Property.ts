import { Model, DataTypes, HasManyGetAssociationsMixin, Optional } from "sequelize";
import { nanoid } from "nanoid";
import {
 BPDistricts,
 LocationData,
 PropertyAttributes,
 PropertyCategory,
 PropertyType,
} from "./property.interface";
import db from "../../config_postgres";

import PropertyImage from "../Image/Image";
import PropertyPriceHistory from "../PropertyPriceHistory/PropertyPriceHistory";
interface PropertyCreationAttributes extends Optional<PropertyAttributes, "id"> {}

export interface PropertyOutput extends Required<PropertyAttributes> {}
class Property
 extends Model<PropertyAttributes, PropertyCreationAttributes>
 implements PropertyAttributes
{
 public size!: number;
 public id!: string;
 public listedByUserId?: number;
 public savedByUserId?: number[];
 public address!: string;
 public price!: number;
 public type!: PropertyType;
 public bedrooms!: number;
 public bathrooms!: number;
 public city!: string;
 public district?: BPDistricts;
 public squarMeterPrice?: number;
 public category!: PropertyCategory;
 public description?: string;
 public yearBuilt!: number;
 public locationId!: number;
 public location?: LocationData;
 public priceHistory?: PropertyPriceHistory[];
 public priceChange?: number;
 public oldPrice?: number;
 public readonly images?: PropertyImage[];
 public readonly createdAt!: Date;
 public readonly updatedAt!: Date;
 public readonly deletedAt!: Date;
 public getImages!: HasManyGetAssociationsMixin<PropertyImage>;
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
   type: DataTypes.ENUM,
   values: Object.values(PropertyType),
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
   type: DataTypes.ENUM,
   values: Object.values(PropertyCategory),
   allowNull: false,
  },
  district: {
   type: DataTypes.ENUM,
   values: Object.values(BPDistricts),
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
 },
 { tableName: "properties", timestamps: true, sequelize: db, paranoid: true }
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
