import db from "./config";
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

function randomInt(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomCityOrBudapest() {
  const options = [faker.location.city(), "Budapest"];
  return faker.helpers.arrayElement(options);
}
// Function to create random images for a property
async function generateRandomImages(propertyId: string) {
  const images = [];
  for (let i = 0; i < randomInt(3, 10); i++) {
    // Create 3 random images
    images.push({
      id: faker.string.uuid(),
      url: faker.image.urlLoremFlickr({
        category: faker.helpers.arrayElement(["apartment", "house"]),
        width: 400,
        height: 400,
      }),
      propertyId, // Associate with propertyId
    });
  }
  return await PropertyImage.bulkCreate(images); // Create images in bulk
}

async function seed() {
  try {
    // Sync all models
    await db.sync({ force: true });

    // Generate random users
    const users: UserAttributes[] = [];
    const hashedPassword = hashPassword("admin");

    for (let i = 0; i < 10; i++) {
      users.push({
        id: i + 1,
        firstName: faker.person.firstName(),
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        password: hashedPassword,
        role: faker.helpers.arrayElement<Roles>([Roles.agent, Roles.user]),
      });
    }
    users.push({
      id: 11,
      firstName: "John",
      lastName: "Doe",
      email: "admin@admin.com",
      password: hashedPassword,
      role: Roles.user,
    });
    // Create users and store references
    const createdUsers = await User.bulkCreate(users, { returning: true });

    // Generate random properties
    const properties: PropertyAttributes[] = [];
    for (let i = 0; i < 200; i++) {
      const price = parseFloat(faker.commerce.price())
      const size = randomInt(15, 200)
      const randomCity = getRandomCityOrBudapest()
      const district =
        randomCity === "Budapest"
          ? faker.helpers.arrayElement(Object.values(BPDistricts))
          : undefined;
      properties.push({
        id: faker.string.uuid(),
        listedByUserId: faker.helpers.arrayElement(createdUsers).id,
        size: size,
        city: randomCity,
        district: district,
        address: faker.location.streetAddress({ useFullAddress: true }),
        bedrooms: faker.number.int({ min: 1, max: 6 }),
        bathrooms: faker.number.int({ min: 1, max: 3 }),
        yearBuilt: faker.number.int({ min: 1900, max: 2024 }),
        description: faker.lorem.paragraph(5),
        squarMeterPrice: price / size,
        category: faker.helpers.arrayElement(Object.values(PropertyCategory)),
        price: price,
        type: faker.helpers.arrayElement<PropertyType>([
          PropertyType.APARTMENT,
          PropertyType.HOUSE,
        ]),
      });
    }
    // Create properties and store references
    const createdProperties = await Property.bulkCreate(properties, {
      returning: true,
    });

    // Create random images for each property
    for (const property of createdProperties) {
      await generateRandomImages(property.id); // Generate and associate images
    }
    // Assign listed properties to users
    for (const user of createdUsers) {
      const userProperties = createdProperties.filter(
        (property) => property.listedByUserId === user.id
      );
      await user.setListedProperties(userProperties);
    }

    // Assign saved properties to users
    for (const user of createdUsers) {
      const randomProperties = faker.helpers.arrayElements(
        createdProperties,
        2
      );
      await user.addSavedProperties(randomProperties);
    }
    console.log("Database synced and data seeded!");
    process.exit();
  } catch (error) {
    logger.error("Error seeding data:", error);
    process.exit(1);
  }
}

seed();
