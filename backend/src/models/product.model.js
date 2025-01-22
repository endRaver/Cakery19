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
          type: Number,
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
    imageUrl: [
      {
        type: String,
        required: true,
      },
    ],
    signature: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  }
);

export const Product = mongoose.model("Product", productSchema);
