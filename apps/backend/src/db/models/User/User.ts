import {
 BelongsToManyAddAssociationMixin,
 BelongsToManyAddAssociationsMixin,
 BelongsToManyCountAssociationsMixin,
 BelongsToManyCreateAssociationMixin,
 BelongsToManyGetAssociationsMixin,
 BelongsToManyHasAssociationMixin,
 BelongsToManyRemoveAssociationMixin,
 BelongsToManyRemoveAssociationsMixin,
 BelongsToManySetAssociationsMixin,
 CreationOptional,
 DataTypes,
 InferAttributes,
 InferCreationAttributes,
 Model,
 NonAttribute,
} from "sequelize";

import db from "../../config_postgres";
import Property from "../Property/Property";
import { Roles } from "./user.interface";

class User extends Model<InferAttributes<User>, InferCreationAttributes<User>> {
 declare id: CreationOptional<number>;
 declare firstName: string;
 declare lastName: string;
 declare email: string;
 declare password: string;
 declare role: Roles;
 declare phone: string;
 declare profileImage?: string;
 declare verified: boolean;
 declare createdAt: CreationOptional<Date>;
 declare updatedAt: CreationOptional<Date>;
 declare deletedAt: CreationOptional<Date>;

 declare addListedProperty: BelongsToManyAddAssociationMixin<Property, number>;
 declare addListedProperties: BelongsToManyAddAssociationsMixin<Property, number>;
 declare getListedProperties: BelongsToManyGetAssociationsMixin<Property>;
 declare hasListedProperty: BelongsToManyHasAssociationMixin<Property, number>;
 declare countListedProperties: BelongsToManyCountAssociationsMixin;
 declare createListedProperty: BelongsToManyCreateAssociationMixin<Property>;
 declare removeListedProperty: BelongsToManyRemoveAssociationMixin<Property, number>;
 declare removeListedProperties: BelongsToManyRemoveAssociationsMixin<Property, number>;
 declare setListedProperties: BelongsToManySetAssociationsMixin<Property, number>;

 declare addSavedProperty: BelongsToManyAddAssociationMixin<Property, number>;
 declare addSavedProperties: BelongsToManyAddAssociationsMixin<Property, number>;
 declare getSavedProperties: BelongsToManyGetAssociationsMixin<Property>;
 declare hasSavedProperty: BelongsToManyHasAssociationMixin<Property, number>;
 declare countSavedProperties: BelongsToManyCountAssociationsMixin;
 declare createSavedProperty: BelongsToManyCreateAssociationMixin<Property>;
 declare removeSavedProperty: BelongsToManyRemoveAssociationMixin<Property, number>;
 declare removeSavedProperties: BelongsToManyRemoveAssociationsMixin<Property, number>;
 declare setSavedProperties: BelongsToManySetAssociationsMixin<Property, number>;

 // Associations
 declare savedProperties?: NonAttribute<Property[]>;
 declare listedProperties?: NonAttribute<Property[]>;
}

User.init(
 {
  id: {
   type: DataTypes.INTEGER,
   autoIncrement: true,
   primaryKey: true,
  },
  firstName: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  lastName: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  email: {
   type: DataTypes.STRING,
   unique: true,
   allowNull: false,
  },
  password: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  phone: {
   type: DataTypes.STRING,
   allowNull: true,
   unique: true,
  },
  profileImage: {
   type: DataTypes.STRING,
   allowNull: true,
  },
  role: {
   type: DataTypes.ENUM(...Object.values(Roles)),
   defaultValue: Roles.user,
   allowNull: false,
  },
  verified: {
   type: DataTypes.BOOLEAN,
   allowNull: false,
   defaultValue: false,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
 },
 {
  sequelize: db,
  modelName: "User",
  tableName: "users",
  timestamps: true,
  paranoid: true, // enables deletedAt
 }
);

export default User;
