import { v2 as cloudinary } from "cloudinary";
import fs from "fs/promises"; // Async fs

// Configure Cloudinary once
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

export const uploadOnCloudinary = async (filePath) => {
  if (!filePath) return null;

  try {
    const result = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // Delete local file safely
    try {
      await fs.unlink(filePath);
    } catch (err) {
      console.log("File delete error:", err);
    }

    return result.secure_url;
  } catch (error) {
    try {
      await fs.unlink(filePath);
    } catch (err) {}
    console.log("Cloudinary upload error:", error);
    throw error; // Let controller handle
  }
};
