import { Model, DataTypes } from "sequelize";
import db from "../../db/config";
import Property from "./Property";
interface UserAttributes {
  id: number;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
  role: Roles;
}
enum Roles {
  AGENT = "agent",
  USER = "user",
}

export interface UserOutput extends Required<UserAttributes> {}
class User extends Model<UserAttributes, UserOutput> implements UserAttributes {
  public id!: number;
  public email!: string;
  public name!: string;
  public role!: Roles;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
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

// Define Post model interface
// interface PostAttributes {
//   id: number;
//   title: string;
//   content: string;
//   userId: number;
// }

// interface PostInstance
//   extends Sequelize.Instance<PostAttributes>,
//     PostAttributes {}

// const Post = sequelize.define<PostInstance>("Post", {
//   id: {
//     type: Sequelize.INTEGER,
//     primaryKey: true,
//     autoIncrement: true,
//   },
//   title: Sequelize.STRING,
//   content: Sequelize.TEXT,
//   userId: Sequelize.INTEGER,
// });

// Define association between User and Post models
User.hasMany(Property, { foreignKey: "id" });
export default User;
