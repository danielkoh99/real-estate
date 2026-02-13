import { GenerateContentConfig } from "@google/genai";

enum AILanguages {
    EN = "en",
    HU = "hu",
}
interface DatabaseAdapter<TFilter, TResult> {
    findByFilters(filters: TFilter): Promise<TResult[]>;
}
interface AIClient {
    ask(prompt: string, format: GenerateContentConfig["responseMimeType"], responseSchema: GenerateContentConfig["responseSchema"]): Promise<string>;
}

enum GeminiPromptFormats {
    JSON = "application/json",
    TEXT = "text/plain"
}
export { AILanguages, DatabaseAdapter, AIClient, GeminiPromptFormats };