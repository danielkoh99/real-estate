import "./models/associations";

import { faker } from "@faker-js/faker";
import {
 BPDistricts,
 BuildingType,
 HeatingType,
 PropertyCategory,
 PropertyType,
} from "@real-estate/shared";
import fs from "fs";
import path from "path";

import logger from "../logger/logger";
import { createLocation } from "../services/location.service";
import { __dirname } from "../utils";
import { hashPassword } from "../utils/auth.utils";
import db from "./config_postgres";
import PropertyImage from "./models/Image/Image";
import Property from "./models/Property/Property";
import PropertyPriceHistory from "./models/PropertyPriceHistory/PropertyPriceHistory";
import User from "./models/User/User";
import { Roles } from "./models/User/user.interface";
function randomInt(min: number, max: number): number {
 return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomCityOrBudapest() {
 const options = [faker.location.city(), "Budapest"];
 return faker.helpers.arrayElement(options);
}
async function generateRandomImages(propertyId: string) {
 const images = [];
 for (let i = 0; i < randomInt(3, 10); i++) {
  images.push({
   id: faker.string.uuid(),
   url: faker.image.urlPicsumPhotos({
    width: 600,
    height: 400,
   }),
   propertyId,
  });
 }
 return await PropertyImage.bulkCreate(images);
}
async function generatePriceHistory(property: Property) {
 const priceHistory = [];
 for (let i = 0; i < randomInt(2, 5); i++) {
  const newPrice = property.price * (1 + randomInt(-10, 10) / 100);
  priceHistory.push({
   propertyId: property.id,
   price: newPrice,
   changedAt: new Date(),
  });
 }
 return await PropertyPriceHistory.bulkCreate(priceHistory);
}
const generateNearbyLocation = (baseLat: number, baseLon: number, offset = 0.01) => {
 const latOffset = (Math.random() - 0.5) * 2 * offset;
 const lonOffset = (Math.random() - 0.5) * 2 * offset;

 const lat = baseLat + latOffset;
 const lon = baseLon + lonOffset;

 return {
  lat: lat.toFixed(6),
  lon: lon.toFixed(6),
  boundingbox: [lat - offset, lat + offset, lon - offset, lon + offset],
 };
};
async function removeUploads() {
 const uploadDirectory = path.join(__dirname, "../../uploads");

 try {
  await fs.promises.rm(uploadDirectory, { recursive: true, force: true });
  console.log("Uploads folder deleted successfully.");
  await fs.promises.mkdir(uploadDirectory, { recursive: true });
  console.log("Uploads folder created successfully.");
 } catch (err) {
  console.error("Error during file operations:", err);
 }
}

async function seed() {
 try {
  await db.authenticate();
  await db.sync({ force: true });

  await removeUploads();
  const users = [];
  const hashedPassword = hashPassword("admin");

  for (let i = 0; i < 10; i++) {
   users.push({
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    email: faker.internet.email({
     firstName: faker.person.firstName(),
     lastName: faker.person.lastName(),
    }),
    phone: faker.phone.number({ style: "international" }),
    password: hashedPassword,
    role: faker.helpers.arrayElement<Roles>([Roles.agent, Roles.user]),
    verified: false,
    profileImage: faker.image.avatar(),
   });
  }
  users.push({
   firstName: "John",
   lastName: "Doe",
   phone: "+1234567890",
   email: "admin@admin.com",
   password: hashedPassword,
   verified: true,
   role: Roles.user,
  });
  const createdUsers = await User.bulkCreate(users, { returning: true });
  const properties = [];
  const baseLat = 47.4979;
  const baseLon = 19.0402;
  const locationPromises = Array.from({ length: 200 }).map(async () => {
   const { lat, lon, boundingbox } = generateNearbyLocation(baseLat, baseLon);
   return await createLocation({ lat, lon, boundingbox });
  });
  const locations = await Promise.all(locationPromises);

  for (let i = 0; i < 100; i++) {
   const location = locations[i];
   const price = parseFloat(faker.commerce.price());
   const size = randomInt(15, 200);
   const randomCity = getRandomCityOrBudapest();

   const district =
    randomCity === "Budapest" ? faker.helpers.arrayElement(Object.values(BPDistricts)) : null;

   const property = {
    listedByUserId: faker.helpers.arrayElement(createdUsers).id,
    size,
    city: randomCity,
    district: district as BPDistricts,
    address: faker.location.streetAddress({ useFullAddress: true }),
    bedrooms: faker.number.int({ min: 1, max: 6 }),
    bathrooms: faker.number.int({ min: 1, max: 3 }),
    yearBuilt: faker.number.int({ min: 1900, max: 2024 }),
    description: faker.lorem.paragraphs(2),
    price,
    squarMeterPrice: parseFloat((price / size).toFixed(2)),
    category: faker.helpers.arrayElement(Object.values(PropertyCategory)),
    locationId: location.id,
    type: faker.helpers.arrayElement([PropertyType.APARTMENT, PropertyType.HOUSE]),
    oldPrice: parseFloat(faker.commerce.price()),
    priceChange: parseFloat(faker.commerce.price()),
    parkingSpace: faker.datatype.boolean(),
    level: faker.number.int({ min: 1, max: 10 }),
    hasElevator: faker.datatype.boolean(),
    hasGarden: faker.datatype.boolean(),
    hasTerrace: faker.datatype.boolean(),
    heatingType: faker.helpers.arrayElement(Object.values(HeatingType)),
    buildingType: faker.helpers.arrayElement(Object.values(BuildingType)),
    dogFriendly: faker.datatype.boolean(),
   };

   properties.push(property);
  }
  for (const prop of properties) {
   for (const key in prop) {
    if (prop[key as keyof typeof prop] === undefined) {
     console.warn(`Property is missing field: ${key}`, prop);
    }
   }
  }
  const createdProperties = await Property.bulkCreate(properties, {
   returning: true,
  });

  for (const property of createdProperties) {
   await generateRandomImages(property.id);
   await generatePriceHistory(property);
  }
  for (const user of createdUsers) {
   const userProperties = createdProperties.filter(
    (property) => property.listedByUserId === user.id
   );
   await user.setListedProperties(userProperties);
  }

  for (const user of createdUsers) {
   const randomProperties = faker.helpers.arrayElements(createdProperties, 2);
   await user.addSavedProperties(randomProperties);
  }
  console.log("Database synced and data seeded!");
  await db.close();
  process.exit();
 } catch (error) {
  logger.error("Error seeding data:", error);
  process.exit(1);
 }
}

seed();
