import User from "../model/userModel.js";
import { uploadOnCloudinary } from "../config/cloudinary.js";

export const getCurrentUser = async (req, res) => {
  try {
    const user = await User.findById(req.userId)
      .select("-password")
      .populate("enrolledCourses");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    return res.status(200).json(user);
  } catch (error) {
    return res.status(500).json({ message: `Get current Error ${error}` });
  }
};

export const updateProfile = async (req, res) => {
  // console.log("Uploaded file:", req.file);
  try {
    const userId = req.userId;
    const { description, name } = req.body;

    // Build update object - only include photoUrl if a new file is uploaded
    const updateData = { name, description };

    if (req.file) {
      const photoUrl = await uploadOnCloudinary(req.file.path);
      updateData.photoUrl = photoUrl;
    }

    const user = await User.findByIdAndUpdate(userId, updateData, {
      new: true,
    }).select("-password");

    if (!user) {
      return res.status(400).json({ message: "User not Found" });
    }

    return res.status(200).json(user);
  } catch (error) {
    console.error("Update profile error:", error);
    return res
      .status(500)
      .json({ message: `Update User Error ${error.message}` });
  }
};
