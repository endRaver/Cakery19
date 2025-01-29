import cloudinary from "../lib/cloudinary.js";
import { Product } from "../models/product.model.js";
import {
  deleteFromCloudinary,
  uploadToCloudinary,
} from "../services/cloudinaryService.js";

export const createProduct = async (req, res, next) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ message: "No image file uploaded" });
    }

    const { name, description, category, variants } = req.body;

    // Use `JSON.parse` to convert strings to objects/arrays
    let parsedVariants;
    let parsedCategory;
    try {
      parsedVariants =
        typeof variants === "string" ? JSON.parse(variants) : variants;
      parsedCategory =
        typeof category === "string" ? JSON.parse(category) : category;
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON format" });
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
          const imageUrl = await uploadToCloudinary(
            imageFile,
            "Cakery19/products"
          );
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
      description,
      variants: parsedVariants,
      category: parsedCategory,
      imageUrl: imageUrls,
    });

    await product.save();
    res.status(201).json(product);
  } catch (error) {
    console.log("Error in create product", error);
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { name, description, category, variants, imageUrl } = req.body;
    const { id } = req.params;

    // Use `JSON.parse` to convert strings to objects/arrays
    let parsedVariants;
    let parsedCategory;
    let parsedImageUrl;
    try {
      parsedVariants =
        typeof variants === "string" ? JSON.parse(variants) : variants;
      parsedCategory =
        typeof category === "string" ? JSON.parse(category) : category;
      parsedImageUrl =
        typeof imageUrl === "string" ? JSON.parse(imageUrl) : imageUrl;
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON format" });
    }

    // Upload new image to Cloudinary
    const imageFiles = req.files;
    if (imageFiles) {
      let filesArray = Array.isArray(imageFiles)
        ? imageFiles
        : Object.values(imageFiles);

      if (filesArray.length > 0) {
        for (const imageFile of filesArray) {
          if (!imageFile || !imageFile.data) {
            console.error("Invalid file:", imageFile);
            continue;
          }
          try {
            const imageUrl = await uploadToCloudinary(
              imageFile,
              "Cakery19/products"
            );
            parsedImageUrl.push(imageUrl);
          } catch (error) {
            console.error("Error uploading file:", error);
          }
        }
      } else {
        console.log(
          "No image files uploaded or files are not in the expected format."
        );
      }
    }

    // Create an update object with only the fields to be updated
    const updateData = {
      name,
      description,
      variants: parsedVariants,
      category: parsedCategory,
      imageUrl: parsedImageUrl,
    };

    // Update the product using the updateData object
    const updatedProduct = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
    });

    res.status(200).json({ updatedProduct, message: "Product updated" });
  } catch (error) {
    console.log("Error in update product", error);
    next(error);
  }
};

export const deleteProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { imageUrl } = req.body;

    let parsedImageUrl;
    try {
      parsedImageUrl =
        typeof imageUrl === "string" ? JSON.parse(imageUrl) : imageUrl;
    } catch (err) {
      return res.status(400).json({ message: "Invalid JSON format" });
    }

    for (const imageUrl of parsedImageUrl) {
      await deleteFromCloudinary(imageUrl);
    }

    const deletedProduct = await Product.findByIdAndDelete(id);
    res
      .status(200)
      .json({ deletedProduct, message: "Product deleted successfully" });
  } catch (error) {
    console.log("Error in delete product", error);
    next(error);
  }
};

export const checkAdmin = async (req, res, next) => {
  res.status(200).json({ admin: true });
};
