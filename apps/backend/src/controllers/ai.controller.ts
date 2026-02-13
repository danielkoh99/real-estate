import { Request, Response } from "express";
import { askGemini } from "../services/gemini.service";
import { Type } from "@google/genai";
import Property, { PropertyAttributes } from "@/db/models/Property/Property";
import { getPropertiesByFilter } from "@/services/property.service";
import { BPDistricts, PropertyCategory, PropertyType } from "@real-estate/shared";
import { propertyFiltersSchema } from "@/schemas";
import { GenericAdapter, GeminiClient, AIQuery } from "@/AIClient/AIClient";
import { AILanguages, GeminiPromptFormats } from "@/AIClient/types";
import z from "zod";
// export async function queryAIToFindProperties(req: Request<{}, {}, { prompt: string }>, res: Response) {
//   try {
//     const { prompt } = req.body;

//     console.log("Prompt sent to Gemini:", prompt);
//     const answer = await askGemini(
//       prompt, "application/json", {
//       type: Type.OBJECT,
//       properties: {
//         address: { type: Type.STRING },
//         sizeMin: { type: Type.NUMBER },
//         sizeMax: { type: Type.NUMBER },
//         bedrooms: { type: Type.NUMBER },
//         bathrooms: { type: Type.NUMBER },
//         yearBuilt: { type: Type.NUMBER },
//         priceMin: { type: Type.NUMBER },
//         priceMax: { type: Type.NUMBER },
//         type: { type: Type.STRING, enum: Object.values(PropertyType) },
//         category: { type: Type.STRING, enum: Object.values(PropertyCategory) },
//         district: {
//           type: Type.ARRAY,
//           items: { type: Type.STRING, enum: Object.values(BPDistricts) },
//         },
//         city: { type: Type.STRING },
//         parkingSpace: { type: Type.BOOLEAN },
//         hasElevator: { type: Type.BOOLEAN },
//         hasGarden: { type: Type.BOOLEAN },
//         hasTerrace: { type: Type.BOOLEAN },
//         level: { type: Type.STRING },
//         petFriendly: { type: Type.BOOLEAN },
//       },
//       required: ["type", "city", "priceMin", "priceMax", "sizeMin", "sizeMax"],
//     },
//     );
//     const parsedAnswer = JSON.parse(answer);
//     const safeFilters = propertyFiltersSchema.safeParse(
//       parsedAnswer
//     );
//     console.log("Safe filters:", safeFilters);
//     if (!safeFilters.success) {
//       return res.status(400).json({ error: "Invalid or irrelevant search prompt", details: safeFilters.error.errors });
//     }
//     console.log("Parsed answer from Gemini:", parsedAnswer);
//     const properties = await getPropertiesByFilter(safeFilters.data);
//     console.log("Properties found:", properties);
//     return res.json(properties.properties);

//   } catch (err) {
//     console.error(err);
//     return res.status(500).json({ error: "AI service failed" });
//   }
// }

export async function queryAIToFindProperties(req: Request<{}, {}, { prompt: string }>, res: Response) {
  try {
    const { prompt } = req.body;
    const geminiClient = new GeminiClient();
    // const propertyAdapter = new GenericAdapter<z.infer<typeof propertyFiltersSchema>, any>(
    //   async (filters) => (await getPropertiesByFilter(filters)).properties
    // );
    // const query = new PropertySearchQuery(aiClient, propertyAdapter);
    const propertyAdapter = new GenericAdapter<typeof propertyFiltersSchema._type, Property>(
      async (filters) => (await getPropertiesByFilter(filters)).properties
    );

    const propertySearch = new AIQuery<string, typeof propertyFiltersSchema, Property>(
      geminiClient,
      propertyAdapter,
      propertyFiltersSchema
    );
    const properties = await propertySearch.execute(prompt, GeminiPromptFormats.JSON, {
      type: Type.OBJECT,
      properties: {
        address: { type: Type.STRING },
        sizeMin: { type: Type.NUMBER },
        sizeMax: { type: Type.NUMBER },
        bedrooms: { type: Type.NUMBER },
        bathrooms: { type: Type.NUMBER },
        yearBuilt: { type: Type.NUMBER },
        priceMin: { type: Type.NUMBER },
        priceMax: { type: Type.NUMBER },
        type: { type: Type.STRING, enum: Object.values(PropertyType) },
        category: { type: Type.STRING, enum: Object.values(PropertyCategory) },
        districts: {
          type: Type.ARRAY,
          items: { type: Type.STRING, enum: Object.values(BPDistricts) },
        },
        city: { type: Type.STRING },
        parkingSpace: { type: Type.BOOLEAN },
        hasElevator: { type: Type.BOOLEAN },
        hasGarden: { type: Type.BOOLEAN },
        hasTerrace: { type: Type.BOOLEAN },
        level: { type: Type.STRING },
        petFriendly: { type: Type.BOOLEAN },
      },
      additionalProperties: true,
      required: ["type", "city", "type", "priceMin", "priceMax", "sizeMin", "sizeMax"],
    });

    return res.json(properties);

  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "AI service failed" });
  }
}
export async function queryAIToGenerateDescription(req: Request<{}, {}, PropertyAttributes>, res: Response) {

  try {
    const {
      address,
      price,
      type,
      size,
      bedrooms,
      bathrooms,
      yearBuilt,
      category,
      city,
      district,
      parkingSpace,
      hasElevator,
      hasGarden,
      hasTerrace,
      level,
      petFriendly
    } = req.body;
    const prompt = `
    Generate a natural and appealing 5-sentence real estate description based on the following property data:

    - Address: ${address}
    - Price: ${price}
    - Type: ${type}
    - Size: ${size} sqm
    - Bedrooms: ${bedrooms}
    - Bathrooms: ${bathrooms}
    - Year Built: ${yearBuilt}
    - Category: ${category}
    - City: ${city}
    - District: ${district}
    - Parking Space: ${parkingSpace}
    - Has Elevator: ${hasElevator}
    - Has Garden: ${hasGarden}
    - Has Terrace: ${hasTerrace}
    - Level: ${level}
    - Pet Friendly: ${petFriendly}
    Ensure the description highlights key features and appeals to potential buyers or renters.
    `;
    console.log("Prompt sent to Gemini:", prompt);
    const answer = await askGemini(prompt, "text/plain");
    res.json({ answer });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI service failed" });
  }
}

// also search inside the description