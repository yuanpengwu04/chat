import express from "express";
import { getConversationsByUserId } from "../controllers/conversation.controller.js";
import protectRoute from "../middleware/protectRoute.js";

const router = express.Router();

router.get("/:userId", protectRoute, getConversationsByUserId);

export default router;
