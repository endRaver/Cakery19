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
    if (!req.files || !req.files.image) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const { name, sizes, description, category } = req.body;
    const imageFile = req.files.image;

    const imageUrl = await uploadToCloudinary(imageFile);

    const product = new Product({
      name,
      variants: JSON.parse(sizes),
      description,
      category,
      imageUrl,
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
