import cloudinary from "../lib/cloudinary.js";
import { Product } from "../models/product.model.js";

// helper function for cloudinary uploads
const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resource_type: "auto",
    });

    return result.secure_url;
  } catch (error) {
    console.log("Error in uploadToCloudinary", error);
    throw new Error("Error uploading to cloudinary");
  }
};

export const createProduct = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const { name, description, category, variants } = req.body;

    let parsedVariants;
    try {
      parsedVariants =
        typeof variants === "string" ? JSON.parse(variants) : variants;
    } catch (err) {
      return res
        .status(400)
        .json({ message: "Invalid JSON format for variants" });
    }

    const imageFiles = req.files;
    let filesArray = Array.isArray(imageFiles)
      ? imageFiles
      : Object.values(imageFiles);

    let imageUrls = [];
    if (filesArray.length > 0) {
      for (const imageFile of filesArray) {
        if (!imageFile || !imageFile.data) {
          console.error("Invalid file:", imageFile);
          continue;
        }
        try {
          const imageUrl = await uploadToCloudinary(imageFile);
          imageUrls.push(imageUrl);
        } catch (error) {
          console.error("Error uploading file:", error);
        }
      }
    } else {
      console.log(
        "No image files uploaded or files are not in the expected format."
      );
    }

    const product = new Product({
      name,
      variants: parsedVariants,
      description,
      category,
      imageUrl: imageUrls,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.log("Error in create product", error);
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;

    await Product.findByIdAndDelete(id);
    res.status(200).json({ product, message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in delete product", error);
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};
