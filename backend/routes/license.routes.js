import express from "express";

import {
  licenseKeyGenerate,
  licenseKeyValidate,
} from "../controllers/license.controller.js";

const router = express.Router();

router.post("/generate", licenseKeyGenerate);

// Validate license key
router.post("/validate", licenseKeyValidate);

export default router;
