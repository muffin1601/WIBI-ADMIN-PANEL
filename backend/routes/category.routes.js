import express from "express";
import { getAllCategoriesWithSubcategories } from "../controllers/category.controller.js";

const router = express.Router();

router.get("/", getAllCategoriesWithSubcategories);

export default router;
