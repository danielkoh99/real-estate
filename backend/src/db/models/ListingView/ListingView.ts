import {
  Model,
  DataTypes,
  Optional,
  BelongsToGetAssociationMixin,
} from "sequelize";

import db from "../../config_postgres";

import Property from "../Property/Property";
import { ListingViewAttributes } from "./listingview.interface";

interface ListingViewCreationAttributes
  extends Optional<ListingViewAttributes, "id"> { }

export interface ListingViewOutput extends Required<ListingViewAttributes> { }

class ListingView
  extends Model<ListingViewAttributes, ListingViewCreationAttributes>
  implements ListingViewAttributes {
  public id!: string;
  public propertyId!: string;
  public userId!: string;
  public viewedAt!: Date;

  public getProperty!: BelongsToGetAssociationMixin<Property>;

  public readonly createdAt!: Date;
  public readonly updatedAt!: Date;
}

ListingView.init(
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    propertyId: {
      type: DataTypes.UUID,
      allowNull: false,
      references: {
        model: Property,
        key: "id",
      },
    },
    userId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    viewedAt: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "listing_views",
    sequelize: db,
    timestamps: true,
    paranoid: true,
  }
);

ListingView.belongsTo(Property, {
  foreignKey: "propertyId",
  as: "property",
});

export default ListingView;