import db from "./config";
import { faker } from "@faker-js/faker";
import Property from "./models/Property/Property";
import User from "./models/User/User";
import {
  PropertyAttributes,
  PropertyType,
} from "./models/Property/property.interface";
import { Roles, UserAttributes } from "./models/User/user.interface";
import { hashPassword } from "../utils/auth.utils";

function generateRandomSize(min: number, max: number): number {
  return Math.floor(Math.random() * (max - min + 1)) + min;
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
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: hashedPassword,
        role: faker.helpers.arrayElement<Roles>([Roles.agent, Roles.user]),
      });
    }

    // Create users and store references
    const createdUsers = await User.bulkCreate(users, { returning: true });

    // Generate random properties
    const properties: PropertyAttributes[] = [];
    for (let i = 0; i < 30; i++) {
      properties.push({
        id: faker.string.uuid(),
        listedByUserId: faker.helpers.arrayElement(createdUsers).id,
        size: generateRandomSize(15, 200),
        title: faker.location.street(),
        address: faker.location.streetAddress(),
        price: parseFloat(faker.commerce.price()),
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
    console.error("Error seeding data:", error);
    process.exit(1);
  }
}

seed();