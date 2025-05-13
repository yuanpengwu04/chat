import express from "express";

import License from "../models/license.model.js";
import {
  generateLicenseKey,
  generateChecksum,
} from "../utils/generateLicense.js";

export const licenseKeyGenerate = async (req, res) => {
  try {
    const { userId, maxDevices, expiresInDays } = req.body;

    const key = generateLicenseKey();

    const expiresAt = expiresInDays
      ? new Date(Date.now() + expiresInDays * 24 * 60 * 60 * 1000)
      : null;

    const license = new License({
      key,
      userId,
      maxDevices: maxDevices || 1,
      expiresAt,
    });

    await license.save(); //console.log(license);

    res.status(201).json({
      success: true,
      license: {
        key,
        expiresAt,
        maxDevices: license.maxDevices,
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "License generation failed",
      error: error.message,
    });
	console.log(error.message);
  }
};

export const licenseKeyValidate = async (req, res) => {
  try {
    const { key } = req.body;

    if (!key) {
      return res.status(400).json({
        valid: false,
        message: "License key is required",
      });
    }

    const license = await License.findOne({ key });

    if (!license) {
      return res.json({
        valid: false,
        message: "Invalid license key",
      });
    }

    if (!license.isActive) {
      return res.json({
        valid: false,
        message: "License is deactivated",
      });
    }

    if (license.expiresAt && new Date(license.expiresAt) < new Date()) {
      return res.json({
        valid: false,
        message: "License has expired",
      });
    }

    // Device registration check
    if (license.used) {
      return res.json({
        valid: false,
        message: "License is used",
      });
    }

    license.used = true;
    await license.save();

    res.json({
      valid: true,
      expiresAt: license.expiresAt,
    });
  } catch (error) {
    res.status(500).json({
      valid: false,
      message: "Validation error",
      error: error.message,
    });
  }
};
