import {
 Model,
 DataTypes,
 InferAttributes,
 InferCreationAttributes,
 CreationOptional,
} from "sequelize";

import db from "../../config_postgres";

class PropertyImage extends Model<
 InferAttributes<PropertyImage>,
 InferCreationAttributes<PropertyImage>
> {
 declare id: CreationOptional<string>;
 declare url: string;
 declare propertyId: string;
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
