import { Product } from "../models/product.model.js";

export const getAllProducts = async (req, res, next) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    next(error);
  }
};

export const getProductById = async (req, res, next) => {
  try {
    const { productId } = req.params;

    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(product);
  } catch (error) {
    next(error);
  }
};

export const getProductsByCategory = async (req, res, next) => {
  const { categories, amount } = req.body;

  try {
    const pipeline = [];

    // If categories is not empty, add the $match stage
    if (categories && categories.length > 0) {
      pipeline.push({
        $match: { category: { $in: categories } },
      });
    }

    // If amount is greater than 0, add the $sample stage
    if (amount > 0) {
      pipeline.push({ $sample: { size: amount } });
    }

    pipeline.push({
      $project: {
        _id: 1,
        name: 1,
        variants: 1,
        imageUrl: 1,
        description: 1,
      },
    });

    const products = await Product.aggregate(pipeline);
    res.json(products);
  } catch (error) {
    next(error);
  }
};
