import { Model, DataTypes } from "sequelize";
import db from "../../db/config";
import User from "./User";
interface PropertyAttributes {
  id: number;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  price?: number;
  size?: number;
  type: PropertyType;
}
enum PropertyType {
  APARTMENT = "apartment",
  HOUSE = "house",
}

export interface PropertyOutput extends Required<PropertyAttributes> {}
class Property
  extends Model<PropertyAttributes, PropertyAttributes>
  implements PropertyAttributes
{
  public id!: number;
  public email!: string;
  public name!: string;
  public type!: PropertyType;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
Property.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    type: {
      type: DataTypes.ENUM,
      values: ["agent", "user"],
      allowNull: false,
    },
    name: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    timestamps: true,
    sequelize: db,
    paranoid: true,
  }
);

// Define Property model interface
// interface PropertyAttributes {
//   id: number;
//   title: string;
//   content: string;
//   userId: number;
// }

// interface PropertyInstance
//   extends Sequelize.Instance<PropertyAttributes>,
//     PropertyAttributes {}

// const Property = sequelize.define<PropertyInstance>("Property", {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   title: Sequelize.STRING,
//   content: Sequelize.TEXT,
//   userId: Sequelize.INTEGER,
// });

Property.belongsTo(User, { foreignKey: "id" });
export default Property;
