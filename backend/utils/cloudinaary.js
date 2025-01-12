import { v2 as cloudinary } from "cloudinary";
import { v4 as uuid } from "uuid";
import { getBase64 } from "./helper.js";

// Function to upload files to Cloudinary
export const uploadFilesToCloudinary = async (files = []) => {
  const uploadPromises = files.map((file) => {
    return new Promise((resolve, reject) => {
      cloudinary.uploader.upload(
        getBase64(file),
        {
          public_id: uuid(),
          resource_type: "auto",
          folder: "chat-app",
        },
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      );
    });
  });

  try {
    const result = await Promise.all(uploadPromises);
    const fromattedResult = result.map((file) => ({
      public_id: file.public_id,
      url: file.secure_url,
    }));
    return fromattedResult;
  } catch (error) {
    console.log(error);
  }
};

export const deleteFilesFromCloudinary = async (publicIds = []) => {
  try {
    const deletePromises = publicIds.map((publicId) =>
      cloudinary.uploader.destroy(publicId)
    );
    await Promise.all(deletePromises);
  } catch (error) {
    console.log("Error deleting from Cloudinary:", error);
    throw error; // Rethrow the error so it can be handled properly in the calling function
  }
};
