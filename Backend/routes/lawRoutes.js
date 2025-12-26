// backend/routes/lawRoutes.js
import express from "express";
import { getCategories, getLawsByCategory, explainCategory, explainLaw } from "../controllers/lawController.js";

const router = express.Router();

router.get("/categories", getCategories);
router.get("/:category", getLawsByCategory);
router.post("/explain-category", explainCategory);
router.post("/explain-law", explainLaw);

export default router;
