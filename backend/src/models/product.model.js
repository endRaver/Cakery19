import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    variants: [
      {
        size: {
          type: String,
          required: true,
        },
        price: {
          type: Number,
          required: true,
        },
        portionSize: {
          from: {
            type: Number,
            required: true,
          },
          to: {
            type: Number,
            required: true,
          },
        },
      },
    ],
    description: {
      type: String,
      required: true,
    },
    category: [
      {
        type: String,
        required: false,
      },
    ],
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
