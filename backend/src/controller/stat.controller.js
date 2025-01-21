import { Product } from "../models/product.model.js";
import { User } from "../models/user.model.js";

export const getStats = async (req, res, next) => {
  try {
    const [totalProducts, totalUsers] = await Promise.all([
      Product.countDocuments(),
      User.countDocuments(),
    ]);

    res.status(200).json({
      totalProducts,
      totalUsers,
    });
  } catch (error) {
    next(error);
  }
};
