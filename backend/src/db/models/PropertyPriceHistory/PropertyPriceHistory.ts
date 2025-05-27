import {
 Model,
 DataTypes,
 InferAttributes,
 InferCreationAttributes,
 CreationOptional,
} from "sequelize";
import db from "../../config_postgres";

class PropertyPriceHistory extends Model<
 InferAttributes<PropertyPriceHistory>,
 InferCreationAttributes<PropertyPriceHistory>
> {
 declare id: CreationOptional<number>;
 declare propertyId: string;
 declare price: number;
 declare changedAt: Date;
}

PropertyPriceHistory.init(
 {
  id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   autoIncrement: true,
  },
  propertyId: {
   type: DataTypes.STRING(10),
   allowNull: false,
  },
  price: {
   type: DataTypes.FLOAT,
   allowNull: false,
  },
  changedAt: {
   type: DataTypes.DATE,
   defaultValue: DataTypes.NOW,
  },
 },
 {
  tableName: "property_price_history",
  sequelize: db,
  timestamps: false,
 }
);

export default PropertyPriceHistory;
