import { Model, DataTypes, Optional } from "sequelize";
import db from "../../config_postgres";
import Property from "../Property/Property";
import { PropertyHistoryAttributes } from "./propertyPriceHistory.interface";
interface PropertyHistoryCreationAttributes extends Optional<PropertyHistoryAttributes, "id"> {}

export interface PropertyOutput extends Required<PropertyHistoryAttributes> {}
class PropertyPriceHistory
 extends Model<PropertyHistoryAttributes, PropertyHistoryCreationAttributes>
 implements PropertyHistoryAttributes
{
 public id!: number;
 public propertyId!: string;
 public price!: number;
 public changedAt!: Date;
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
