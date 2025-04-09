import { Model, DataTypes, Optional } from "sequelize";

import db from "../../config_postgres";

interface LocationCreationAttributes extends Optional<LocationAttributes, "id"> { }
export interface LocationOutput extends Required<LocationAttributes> { }
class Location extends Model<LocationAttributes, LocationCreationAttributes> {
    public id!: number;
    public lat!: number;
    public lon!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;
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
        }
    },
    {
        tableName: "locations",
        sequelize: db,
        timestamps: true,
    }
);

export default Location;