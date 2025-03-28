import {
  Model,
  DataTypes,
  HasManyGetAssociationsMixin,
  Optional,
} from "sequelize";
import { BPDistricts, LocationData, PropertyAttributes, PropertyCategory, PropertyType } from "./property.interface";
import db from "../../config";
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
  // Association method to get images for a property
  public getImages!: HasManyGetAssociationsMixin<PropertyImage>; // Gets all associated images
}
Property.init(
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      unique: true,
      allowNull: false,
      defaultValue: () => Math.floor(100000000 + Math.random() * 900000000).toString()
    },
    type: {
      type: DataTypes.ENUM,
      values: ["agent", "user"],
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    city: {
      type: DataTypes.STRING(256),
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
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    description: {
      type: DataTypes.STRING(256),
      allowNull: true
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
      allowNull: true,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    size: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    listedByUserId: {
      type: DataTypes.INTEGER,
      allowNull: true,
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
