import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});
export const uploadOnCloudinary = async (filePath) => {
  try {

    // console.log("API KEY:", process.env.CLOUDINARY_API_KEY);
    if (!filePath) {
      return null;
    }

    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    fs.unlinkSync(filePath);
    return response.secure_url;
  } catch (error) {
    console.error("Cloudinary upload failed:", error);
    fs.unlinkSync(filePath); // remove the file from local storage.
    return null;
  }
};
