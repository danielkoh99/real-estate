import { Model, DataTypes, Optional } from "sequelize";
import db from "../../config";

interface LocationCreationAttributes extends Optional<LocationAttributes, "id"> { }
export interface LocationOutput extends Required<LocationAttributes> { }
class Location extends Model<LocationAttributes, LocationCreationAttributes> {
    public id!: number;
    public lat!: number;
    public lon!: number;
    public minLat!: number;
    public maxLat!: number;
    public minLon!: number;
    public maxLon!: number;
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
        minLat: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        maxLat: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        minLon: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        maxLon: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        boundingBox: {
            type: DataTypes.VIRTUAL,
            get() {
                const minLat = this.getDataValue('minLat');
                const maxLat = this.getDataValue('maxLat');
                const minLon = this.getDataValue('minLon');
                const maxLon = this.getDataValue('maxLon');
                return [minLat, maxLat, minLon, maxLon];
            },
            set(value) {
                throw new Error('Do not try to set the `boundingBox` value!');
            },
        }
    },
    {
        tableName: "locations",
        sequelize: db,
        timestamps: true,
    }
);

export default Location;