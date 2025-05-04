import fs from "fs"
// import db from "./config";
import db from "./config_postgres";
import { faker } from "@faker-js/faker";
import Property from "./models/Property/Property";
import User from "./models/User/User";
import {
  BPDistricts,
  PropertyAttributes,
  PropertyCategory,
  PropertyType,
} from "./models/Property/property.interface";
import { Roles, UserAttributes } from "./models/User/user.interface";
import { hashPassword } from "../utils/auth.utils";
import logger from "../logger/logger";
import PropertyImage from "./models/Image/Image";
import path from "path";
import { __dirname } from "../utils";
import { createLocation } from "../services/location.service";
import { nanoid } from "nanoid";
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
      url: faker.image.urlLoremFlickr({
        category: faker.helpers.arrayElement(["apartment", "house"]),
        width: 400,
        height: 400,
      }),
      propertyId,
    });
  }
  return await PropertyImage.bulkCreate(images);
}
const generateRandomLocation = () => {
  const lat = faker.location.latitude({ precision: 6 }).toString();
  const lon = faker.location.longitude({ precision: 6 }).toString();
  // 1 km bounding area
  const minLat = parseFloat(lat) - 0.01;
  const maxLat = parseFloat(lat) + 0.01;
  const minLon = parseFloat(lon) - 0.01;
  const maxLon = parseFloat(lon) + 0.01;
  const boundingbox = [minLat, maxLat, minLon, maxLon]
  return { lat, lon, boundingbox };
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
    await db.authenticate()
    await db.sync({ force: true });

    await removeUploads()
    const users: UserAttributes[] = [];
    const hashedPassword = hashPassword("admin");

    for (let i = 0; i < 10; i++) {
      users.push({
        id: i + 1,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email({
          firstName: faker.person.firstName(),
          lastName: faker.person.lastName(),
        }),
        phone: faker.phone.number({ style: 'international' }),
        password: hashedPassword,
        role: faker.helpers.arrayElement<Roles>([Roles.agent, Roles.user]),
      });
    }
    users.push({
      id: 11,
      firstName: "John",
      lastName: "Doe",
      phone: "+1234567890",
      email: "admin@admin.com",
      password: hashedPassword,
      role: Roles.user,
    });
    const createdUsers = await User.bulkCreate(users, { returning: true });
    const properties: PropertyAttributes[] = [];

    const locationPromises = Array.from({ length: 200 }).map(async () => {
      const { lat, lon, boundingbox } = generateRandomLocation();
      return await createLocation({ lat, lon, boundingbox });
    });
    const locations = await Promise.all(locationPromises);

    for (let i = 0; i < 200; i++) {
      const location = locations[i];
      const price = parseFloat(faker.commerce.price());
      const size = randomInt(15, 200);
      const randomCity = getRandomCityOrBudapest();

      const district =
        randomCity === "Budapest"
          ? faker.helpers.arrayElement(Object.values(BPDistricts))
          : null;

      const property: PropertyAttributes = {
        id: nanoid(10),
        listedByUserId: faker.helpers.arrayElement(createdUsers).id,
        size,
        city: randomCity,
        district: district ?? null,
        address: faker.location.streetAddress({ useFullAddress: true }),
        bedrooms: faker.number.int({ min: 1, max: 6 }),
        bathrooms: faker.number.int({ min: 1, max: 3 }),
        yearBuilt: faker.number.int({ min: 1900, max: 2024 }),
        description: faker.lorem.paragraphs(2),
        squarMeterPrice: parseFloat((price / size).toFixed(2)),
        category: faker.helpers.arrayElement(Object.values(PropertyCategory)),
        price,
        locationId: location.id,
        type: faker.helpers.arrayElement<PropertyType>([
          PropertyType.APARTMENT,
          PropertyType.HOUSE,
        ]),
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
    }
    for (const user of createdUsers) {
      const userProperties = createdProperties.filter(
        (property) => property.listedByUserId === user.id
      );
      await user.setListedProperties(userProperties);
    }

    for (const user of createdUsers) {
      const randomProperties = faker.helpers.arrayElements(
        createdProperties,
        2
      );
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
