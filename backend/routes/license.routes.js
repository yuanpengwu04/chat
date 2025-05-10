import express from "express";

import License from "../models/license.model.js";
import {
  generateLicenseKey,
  generateChecksum,
} from "../utils/generateLicense.js";
import {
  licenseKeyGenerate,
  licenseKeyValidate,
} from "../controllers/license.controller.js";

const router = express.Router();

router.post("/generate", licenseKeyGenerate);

// Validate license key
router.post("/validate", licenseKeyValidate);

export default router;
