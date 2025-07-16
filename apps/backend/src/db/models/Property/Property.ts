import {
 BPDistricts,
 BuildingType,
 HeatingType,
 PromotionType,
 PropertyCategory,
 PropertyType,
} from "@real-estate/shared";
import { nanoid } from "nanoid";
import {
 CreationOptional,
 DataTypes,
 HasManyGetAssociationsMixin,
 InferAttributes,
 InferCreationAttributes,
 Model,
 NonAttribute,
} from "sequelize";

import db from "../../config_postgres";
import PropertyImage from "../Image/Image";
import PropertyPriceHistory from "../PropertyPriceHistory/PropertyPriceHistory";
import { LocationData } from "./property.interface";

export type PropertyAttributes = InferCreationAttributes<Property>;

class Property extends Model<InferAttributes<Property>, InferCreationAttributes<Property>> {
 declare id: CreationOptional<string>;
 declare type: PropertyType;
 declare address: string;
 declare city: string;
 declare locationId: number;
 declare bedrooms: number;
 declare squarMeterPrice: number;
 declare description: string;
 declare bathrooms: number;
 declare category: PropertyCategory;
 declare district: CreationOptional<BPDistricts | null>;
 declare yearBuilt: number;
 declare price: number;
 declare size: number;
 declare listedByUserId: number;
 declare petFriendly: boolean;
 declare level: number;
 declare buildingType: CreationOptional<BuildingType>;
 declare hasGarden: boolean;
 declare hasTerrace: boolean;
 declare heatingType: CreationOptional<HeatingType>;
 declare parkingSpace: boolean;
 declare hasElevator: boolean;
 declare promotionType: CreationOptional<PromotionType>;
 declare oldPrice: CreationOptional<number>;
 declare priceChange: CreationOptional<number>;
 declare createdAt: CreationOptional<Date>;
 declare updatedAt: CreationOptional<Date>;
 declare deletedAt: CreationOptional<Date>;

 declare location?: NonAttribute<LocationData>;
 declare priceHistory?: NonAttribute<PropertyPriceHistory[]>;
 declare images?: NonAttribute<PropertyImage[]>;

 declare getImages: HasManyGetAssociationsMixin<PropertyImage>;
}

Property.init(
 {
  id: {
   type: DataTypes.STRING(10),
   primaryKey: true,
   unique: true,
   allowNull: false,
   defaultValue: () => nanoid(10),
  },
  type: {
   type: DataTypes.ENUM(...Object.values(PropertyType)),
   allowNull: false,
  },
  address: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  city: {
   type: DataTypes.STRING,
   allowNull: false,
  },
  locationId: {
   type: DataTypes.INTEGER,
   allowNull: false,
  },
  bedrooms: {
   type: DataTypes.INTEGER,
   allowNull: false,
  },
  squarMeterPrice: {
   type: DataTypes.FLOAT,
   allowNull: false,
  },
  description: {
   type: DataTypes.STRING(1000),
   allowNull: false,
  },
  bathrooms: {
   type: DataTypes.INTEGER,
   allowNull: false,
  },
  category: {
   type: DataTypes.ENUM(...Object.values(PropertyCategory)),
   allowNull: false,
  },
  district: {
   type: DataTypes.ENUM(...Object.values(BPDistricts)),
   allowNull: true,
  },
  yearBuilt: {
   type: DataTypes.INTEGER,
   allowNull: false,
  },
  price: {
   type: DataTypes.FLOAT,
   allowNull: false,
  },
  oldPrice: {
   type: DataTypes.FLOAT,
   allowNull: true,
  },
  priceChange: {
   type: DataTypes.FLOAT,
   allowNull: true,
   defaultValue: 0,
  },
  size: {
   type: DataTypes.INTEGER,
   allowNull: false,
  },
  listedByUserId: {
   type: DataTypes.INTEGER,
   allowNull: false,
  },
  petFriendly: {
   type: DataTypes.BOOLEAN,
   allowNull: true,
  },
  level: {
   type: DataTypes.INTEGER,
   allowNull: true,
  },
  buildingType: {
   type: DataTypes.ENUM(...Object.values(BuildingType)),
   allowNull: true,
  },
  hasGarden: {
   type: DataTypes.BOOLEAN,
   allowNull: true,
  },
  hasTerrace: {
   type: DataTypes.BOOLEAN,
   allowNull: true,
  },
  heatingType: {
   type: DataTypes.ENUM(...Object.values(HeatingType)),
   allowNull: true,
  },
  parkingSpace: {
   type: DataTypes.BOOLEAN,
   allowNull: true,
  },
  hasElevator: {
   type: DataTypes.BOOLEAN,
   allowNull: true,
  },
  promotionType: {
   type: DataTypes.INTEGER,
   allowNull: true,
   defaultValue: PromotionType.None,
   validate: {
    isIn: [[...Object.values(PromotionType).filter((v) => typeof v === "number")]],
   },
  },
  createdAt: DataTypes.DATE,
  updatedAt: DataTypes.DATE,
  deletedAt: DataTypes.DATE,
 },
 {
  sequelize: db,
  tableName: "properties",
  timestamps: true,
  paranoid: true,
 }
);

Property.addHook("beforeCreate", async (property) => {
 property.dataValues.oldPrice = property.dataValues.price;
});

Property.addHook("beforeUpdate", async (property) => {
 const oldPrice = property.previous("price") as number;
 property.dataValues.priceChange = ((property.dataValues.price - oldPrice) / oldPrice) * 100;
 property.dataValues.promotionType =
  property.dataValues.price > oldPrice ? PromotionType.PriceIncrease : PromotionType.PriceDecrease;

 await PropertyPriceHistory.create({
  propertyId: property.getDataValue("id"),
  price: property.dataValues.price,
  changedAt: new Date(),
 });
});

export default Property;
