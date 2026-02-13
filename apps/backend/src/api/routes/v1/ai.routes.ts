import { queryAIToFindProperties, queryAIToGenerateDescription } from "@/controllers/ai.controller";
import { Router } from "express";

const aiRouter = Router();


aiRouter.post("/generate-description", queryAIToGenerateDescription);
aiRouter.post("/find-properties", queryAIToFindProperties);
export default aiRouter;