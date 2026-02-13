import { z, ZodTypeAny } from "zod";
import { GenerateContentConfig } from "@google/genai";
import { askGemini } from "@/services/gemini.service";

// Generic AI client interface
export interface AIClient {
 ask(
  prompt: string,
  format: GenerateContentConfig["responseMimeType"],
  responseSchema: GenerateContentConfig["responseSchema"]
 ): Promise<string>;
}

// Generic DB adapter interface
export interface DatabaseAdapter<TFilter, TResult> {
 findByFilters(filters: TFilter): Promise<TResult[]>;
}

// Generic AI client using Gemini
export class GeminiClient implements AIClient {
 async ask(
  prompt: string,
  format: GenerateContentConfig["responseMimeType"],
  responseSchema: GenerateContentConfig["responseSchema"]
 ): Promise<string> {
  // Call your Gemini AI service here
  return await askGemini(prompt, format, responseSchema);
 }
}

// Generic DB adapter implementation
export class GenericAdapter<TFilter, TResult> implements DatabaseAdapter<TFilter, TResult> {
 constructor(private finder: (filters: TFilter) => Promise<TResult[]>) {}

 async findByFilters(filters: TFilter): Promise<TResult[]> {
  return this.finder(filters);
 }
}

// Fully generic AI query
export class AIQuery<TInput, TSchema extends ZodTypeAny, TResult> {
 constructor(
  private ai: AIClient,
  private adapter: DatabaseAdapter<z.infer<TSchema>, TResult>,
  private schema: TSchema
 ) {}

 async execute(
  prompt: TInput,
  format: GenerateContentConfig["responseMimeType"],
  responseSchema: GenerateContentConfig["responseSchema"]
 ): Promise<TResult[]> {
  const raw = await this.ai.ask(prompt as unknown as string, format, responseSchema);

  let parsed: any;
  try {
   parsed = JSON.parse(raw);
  } catch {
   throw new Error("AI did not return valid JSON");
  }

  const safe = this.schema.safeParse(parsed);
  if (!safe.success) {
   console.error("Zod validation errors:", safe.error.format());
   throw new Error("Invalid AI output");
  }

  return this.adapter.findByFilters(safe.data);
 }
}
