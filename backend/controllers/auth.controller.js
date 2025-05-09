import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import License from "../models/license.model.js";
import generateTokenAndSetCookies from "../utils/generateToken.js";

export const signup = async (req, res) => {
  try {
    const {
      fullName,
      username,
      password,
      confirmPassword,
      gender,
      licenseKey,
    } = req.body;

    const license = await License.findOne({ key: licenseKey });

    if (!license) {
      return res.status(400).json({
        valid: false,
        error: "Invalid license key",
      });
    }

    if (!license.isActive) {
      return res.status(400).json({
        valid: false,
        error: "License is deactivated",
      });
    }

    if (license.expiresAt && new Date(license.expiresAt) < new Date()) {
      return res.status(400).json({
        valid: false,
        error: "License has expired",
      });
    }

    // Device registration check
    if (license.used) {
      return res.status(400).json({
        valid: false,
        error: "License is already used",
      });
    }

    if (password !== confirmPassword) {
      return res.status(400).json({ error: "Passwords do not match." });
    }

    const user = await User.findOne({ username });

    if (user) {
      return res.status(400).json({ error: "Username already exists." });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const defaultProfilePicURI = `https://avatar.iran.liara.run/username?username=${fullName}`;

    const newUser = new User({
      fullName,
      username,
      password: hashedPassword,
      gender,
      profilePic: defaultProfilePicURI,
    });

    if (newUser) {
      generateTokenAndSetCookies(newUser._id, res);
      await newUser.save();

      license.used = true;
      license.userId = newUser._id;
      await license.save();

      res.status(201).json({
        _id: newUser._id,
        fullName: newUser.fullName,
        username: newUser.username,
        profilePic: newUser.profilePic,
      });
    } else {
      res.status(400).json({ error: "Invalid user data." });
    }
  } catch (error) {
    console.log("Error in signup controller.", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      user?.password || ""
    );
    if (!isPasswordCorrect) {
      return res.status(400).json({ error: "Invalid username or password" });
    }

    generateTokenAndSetCookies(user._id, res);

    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in login controller.", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", { maxAge: 0 });
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    console.log("Error in login controller.", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
