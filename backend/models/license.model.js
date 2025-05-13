import mongoose from "mongoose";

const LicenseSchema = new mongoose.Schema({
  key: { type: String, required: true, unique: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  isActive: { type: Boolean, default: true },
  maxDevices: { type: Number, required: true, unique: false, default: 1 },
  createdAt: { type: Date, default: Date.now },
  expiresAt: Date,
  used: { type: Boolean, default: false },
  metadata: mongoose.Schema.Types.Mixed,
});

const License = mongoose.model("License", LicenseSchema);

export default License;
