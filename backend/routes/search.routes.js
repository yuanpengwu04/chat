import express from "express";
import { searchUsers } from "../controllers/search.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/users", protectRoute, searchUsers);

export default router;
