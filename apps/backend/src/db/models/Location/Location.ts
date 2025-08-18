import { DataTypes, InferAttributes, InferCreationAttributes, Model } from "sequelize";

import db from "../../config_postgres";

class Location extends Model<InferAttributes<Location>, InferCreationAttributes<Location>> {
 declare id: number;
 declare lat: number;
 declare lon: number;
 declare boundingbox: number[];
 declare readonly createdAt: Date;
 declare readonly updatedAt: Date;
}

Location.init(
 {
  id: {
   type: DataTypes.INTEGER,
   primaryKey: true,
   autoIncrement: true,
  },
  lat: {
   type: DataTypes.DOUBLE,
   allowNull: false,
  },
  lon: {
   type: DataTypes.DOUBLE,
   allowNull: false,
  },
  boundingbox: {
   type: DataTypes.ARRAY(DataTypes.DOUBLE),
   allowNull: true,
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
 },
 {
  tableName: "locations",
  sequelize: db,
  timestamps: true,
 }
);

export default Location;
