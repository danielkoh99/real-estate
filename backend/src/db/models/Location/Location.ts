import { Model, DataTypes } from "sequelize";
import db from "../../config";

class Location extends Model {
    public id!: number;
    public lat!: string;
    public lon!: string;
    public boundingBox!: string[];

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
            type: DataTypes.STRING,
            allowNull: false,
        },
        lon: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        boundingBox: {
            type: DataTypes.TEXT,
            allowNull: true,
            get() {
                const rawValue = this.getDataValue("boundingBox");
                return rawValue ? JSON.parse(rawValue) : null;
            },
            set(value: string[]) {
                this.setDataValue("boundingBox", JSON.stringify(value));
            },
        },
    },
    { tableName: "locations", sequelize: db, timestamps: true }
);

export default Location;