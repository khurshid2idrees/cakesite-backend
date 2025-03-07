const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Function to upload multiple images
const uploadImagesToCloudinary = async (files) => {
  try {
    const uploadPromises = files.map((file) => {
      return cloudinary.uploader.upload(file.path, {
        folder: "ecommerce/products", // Folder in Cloudinary
        resource_type: "image",
      });
    });

    const uploadedImages = await Promise.all(uploadPromises);
    return uploadedImages.map((img) => img.secure_url); // Return array of image URLs
  } catch (error) {
    console.error("Cloudinary Upload Error:", error);
    throw new Error("Image upload failed");
  }
};

module.exports = { cloudinary, uploadImagesToCloudinary };
