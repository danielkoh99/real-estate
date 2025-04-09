import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  Optional,
} from "sequelize";
import { nanoid } from "nanoid";
import { BPDistricts, LocationData, PropertyAttributes, PropertyCategory, PropertyType } from "./property.interface";
import db from "../../config_postgres";

import PropertyImage from "../Image/Image";
import Location from "../Location/Location";
interface PropertyCreationAttributes
  extends Optional<PropertyAttributes, "id"> { }

export interface PropertyOutput extends Required<PropertyAttributes> { }
class Property
  extends Model<PropertyAttributes, PropertyCreationAttributes>
  implements PropertyAttributes {
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
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly images?: PropertyImage[];
  public getImages!: HasManyGetAssociationsMixin<PropertyImage>;
}
Property.init(
  {
    id: {
      type: DataTypes.STRING(10),
      primaryKey: true,
      unique: true,
      allowNull: false,
      defaultValue: () => nanoid(10)
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
      type: DataTypes.STRING(1024),
      allowNull: false
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
export default Property;
