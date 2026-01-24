import express from "express";
import { getDashboardStats } from "../controllers/dashboard.controller.js";
import auth from "../middleware/auth.middleware.js";
import { adminOnly } from "../middleware/role.middleware.js";

const router = express.Router();

router.get("/", auth, adminOnly, getDashboardStats);

export default router;
