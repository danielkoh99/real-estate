import { Model, DataTypes, Optional } from "sequelize";

import db from "../../config_postgres";

import { PropertyImageAttributes } from "./image.interface";
interface PropertyImageCreationAttributes extends Optional<PropertyImageAttributes, "id"> {}

class PropertyImage
 extends Model<PropertyImageAttributes, PropertyImageCreationAttributes>
 implements PropertyImageAttributes
{
 public id!: string;
 public url!: string;
 public propertyId!: string;
}

PropertyImage.init(
 {
  id: {
   type: DataTypes.STRING,
   defaultValue: DataTypes.UUIDV4,
   primaryKey: true,
  },
  url: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  propertyId: {
   type: DataTypes.STRING(10),
   allowNull: false,
  },
 },
 { tableName: "images", timestamps: true, sequelize: db, paranoid: true }
);
export default PropertyImage;
