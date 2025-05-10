import User from "../models/user.model.js";
import bcrypt from "bcryptjs";

export const getUserForSidebar = async (req, res) => {
  try {
    const loggedInUserId = req.user._id;

    const users = await User.find({ _id: { $ne: loggedInUserId } }).select(
      "-password"
    );

    res.status(200).json(users);
  } catch (error) {
    console.error("Error in getUserForSidebar: ", error.message);
    res.status(500).json({ error: "Internal Server Error." });
  }
};

export const update = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    const user = await User.findById(req.user._id);
    if (!user) {
      res.status(400).json({ error: "User not found." });
    }
    if (fullName) user.fullName = fullName;
    if (username) {
      const exUser = await User.findOne({ username });
      if (exUser) {
        return res.status(400).json({ error: "Username is already taken." });
      }
      user.username = username;
    }
    if (password) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      user.password = hashedPassword;
    }
    if (gender) user.gender = gender;
    await user.save();
    res.status(201).json({
      _id: user._id,
      fullName: user.fullName,
      username: user.username,
      profilePic: user.profilePic,
    });
  } catch (error) {
    console.log("Error in update controller.", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const deleteAccount = async (req, res) => {
  try {
    await User.deleteOne({ _id: req.user._id });
    res.status(201).json({ message: "Account deletion success." });
  } catch (error) {
    console.log("Error in delete controller.", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
