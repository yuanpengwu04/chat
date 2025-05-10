import express from "express";
import protectRoute from "../middleware/protectRoute.js";
import {
  deleteAccount,
  getUserForSidebar,
  update,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", protectRoute, getUserForSidebar);

router.post("/update", protectRoute, update);

router.post("/delete", protectRoute, deleteAccount);

export default router;
