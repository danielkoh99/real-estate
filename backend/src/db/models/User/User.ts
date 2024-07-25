import {
  Model,
  DataTypes,
  Optional,
  Association,
  BelongsToManyAddAssociationMixin,
  BelongsToManyAddAssociationsMixin,
  BelongsToManyCountAssociationsMixin,
  BelongsToManyCreateAssociationMixin,
  BelongsToManyGetAssociationsMixin,
  BelongsToManyHasAssociationMixin,
  BelongsToManyRemoveAssociationMixin,
  BelongsToManyRemoveAssociationsMixin,
  BelongsToManySetAssociationsMixin,
} from "sequelize";
import db from "../../config";
import Property from "../Property/Property";
import { UserAttributes, Roles } from "./user.interface";
// Define creation attributes for the User model
interface UserCreationAttributes extends Optional<UserAttributes, "id"> {}
class User extends Model<UserAttributes, UserCreationAttributes> {
  public id!: number;
  public password!: string;
  public email!: string;
  public username!: string;
  public role!: Roles;
  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
  // Association methods for listed properties
  public addListedProperty!: BelongsToManyAddAssociationMixin<Property, number>;
  public addListedProperties!: BelongsToManyAddAssociationsMixin<
    Property,
    number
  >;
  public getListedProperties!: BelongsToManyGetAssociationsMixin<Property>;
  public hasListedProperty!: BelongsToManyHasAssociationMixin<Property, number>;
  public countListedProperties!: BelongsToManyCountAssociationsMixin;
  public createListedProperty!: BelongsToManyCreateAssociationMixin<Property>;
  public removeListedProperty!: BelongsToManyRemoveAssociationMixin<
    Property,
    number
  >;
  public removeListedProperties!: BelongsToManyRemoveAssociationsMixin<
    Property,
    number
  >;
  public setListedProperties!: BelongsToManySetAssociationsMixin<
    Property,
    number
  >;

  // Association methods for saved properties
  public addSavedProperty!: BelongsToManyAddAssociationMixin<Property, number>;
  public addSavedProperties!: BelongsToManyAddAssociationsMixin<
    Property,
    number
  >;
  public getSavedProperties!: BelongsToManyGetAssociationsMixin<Property>;
  public hasSavedProperty!: BelongsToManyHasAssociationMixin<Property, number>;
  public countSavedProperties!: BelongsToManyCountAssociationsMixin;
  public createSavedProperty!: BelongsToManyCreateAssociationMixin<Property>;
  public removeSavedProperty!: BelongsToManyRemoveAssociationMixin<
    Property,
    number
  >;
  public removeSavedProperties!: BelongsToManyRemoveAssociationsMixin<
    Property,
    number
  >;
  public setSavedProperties!: BelongsToManySetAssociationsMixin<
    Property,
    number
  >;

  // Possible inclusions
  public readonly savedProperties?: Property[];
  public readonly listedProperties?: Property[];

  public static associations: {
    listedProperties: Association<User, Property>;
    savedProperties: Association<User, Property>;
  };
}
User.init(
  {
    id: {
      type: DataTypes.INTEGER.UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
    },
    role: {
      type: DataTypes.ENUM,
      values: ["agent", "user"],
      allowNull: false,
    },
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    email: {
      type: DataTypes.STRING,
      unique: true,
    },
  },
  {
    tableName: "users",
    timestamps: true,
    sequelize: db,
    paranoid: true,
  }
);
User.hasMany(Property, {
  as: "listedProperties",
  foreignKey: "listedByUserId",
});
User.belongsToMany(Property, {
  through: "UserSavedProperties",
  as: "savedProperties",
  foreignKey: "userId",
});

Property.belongsTo(User, { as: "listedByUser", foreignKey: "listedByUserId" });
Property.belongsToMany(User, {
  through: "UserSavedProperties",
  as: "savedByUsers",
  foreignKey: "propertyId",
});

export default User;