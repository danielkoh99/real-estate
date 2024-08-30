import { Model, DataTypes } from "sequelize";
import db from "../../config";
import { PropertyImageAttributes } from "./image.interface";
class PropertyImage
  extends Model<PropertyImageAttributes>
  implements PropertyImageAttributes
{
  public id!: string;
  public url!: string; // Stores the image URL
  public propertyId!: string; // Foreign key to the Property model
}

PropertyImage.init(
  {
    id: {
      type: DataTypes.STRING,
      primaryKey: true,
    },
    url: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    propertyId: {
      type: DataTypes.UUID, // Foreign key, assuming Property's id is UUID
      allowNull: false,
    },
  },
  { tableName: "images", timestamps: true, sequelize: db, paranoid: true }
);
export default PropertyImage;
