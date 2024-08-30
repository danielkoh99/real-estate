import { Model, DataTypes, HasManyGetAssociationsMixin } from "sequelize";
import { PropertyAttributes, PropertyType } from "./property.interface";
import db from "../../config";
import PropertyImage from "../Image/Image";

export interface PropertyOutput extends Required<PropertyAttributes> {}
class Property
  extends Model<PropertyAttributes, PropertyAttributes>
  implements PropertyAttributes
{
  public size?: number | undefined;
  public id!: string;
  public listedByUserId?: number;
  public savedByUserId?: number[];
  public title!: string;
  public address!: string;
  public price!: number;
  public type!: PropertyType;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  public readonly images?: PropertyImage[];
  // Association method to get images for a property
  public getImages!: HasManyGetAssociationsMixin<PropertyImage>; // Gets all associated images
}
Property.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["agent", "user"],
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(128),
      allowNull: false,
    },
    address: {
      type: DataTypes.STRING(256),
      allowNull: false,
    },
    price: {
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
// One-to-Many association: Property has many Images
Property.hasMany(PropertyImage, {
  foreignKey: "propertyId",
  as: "images", // Alias for association
});

PropertyImage.belongsTo(Property, {
  foreignKey: "propertyId",
  as: "property",
});
export default Property;
