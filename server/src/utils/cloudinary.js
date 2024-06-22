import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({ 
  cloud_name: "dobiyrxct",
  api_key: "791988521236739", 
  api_secret: "A4kzGAt_0efWZJhTTtsgu9j16DM",
});

const uploadOnCloudinary = async (localFilePath) => {
  try {
    if (!localFilePath) return null;
    console.log(localFilePath);
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: "auto"
    });
    console.log("File is uploaded on Cloudinary", response.url);
    fs.unlinkSync(localFilePath); // Remove local file
    return response;
  } 
  catch (err) {
    console.log("Cloudinary upload failed", err);
    fs.unlinkSync(localFilePath); // Clean up on failure
    return null;
  }
};

export { uploadOnCloudinary };
