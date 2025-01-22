import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { config } from "dotenv";

config();

const products = [
  {
    name: "Berrytale",
    variants: [
      {
        size: 14,
        price: 10.5,
        portionSize: {
          from: 2,
          to: 4,
        },
      },
      {
        size: 16,
        price: 15.5,
        portionSize: {
          from: 3,
          to: 6,
        },
      },
    ],
    description: "This is a product description",
    category: ["signature", "delicacies"],
    imageUrl: [
      "/frontend/public/cakes/Berrytale/Berrytale1.jpg",
      "/frontend/public/cakes/Berrytale/Berrytale2.jpg",
    ],
    signature: true,
  },
  {
    name: "Berry Truffle",
    variants: [
      {
        size: 12,
        price: 12.0,
        portionSize: {
          from: 2,
          to: 5,
        },
      },
      {
        size: 18,
        price: 20.0,
        portionSize: {
          from: 4,
          to: 8,
        },
      },
    ],
    description: "Rich chocolate cake with layers of cream.",
    category: ["delicacies"],
    imageUrl: [
      "/frontend/public/cakes/Berry_truffle/BerryTruffle1.jpg",
      "/frontend/public/cakes/Berry_truffle/BerryTruffle2.jpg",
    ],
    signature: false,
  },
  {
    name: "Mango Lush",
    variants: [
      {
        size: 10,
        price: 8.5,
        portionSize: {
          from: 1,
          to: 3,
        },
      },
      {
        size: 14,
        price: 14.0,
        portionSize: {
          from: 3,
          to: 5,
        },
      },
    ],
    description: "Light and fluffy vanilla cake with buttercream.",
    category: ["delicacies"],
    imageUrl: [
      "/frontend/public/cakes/Mango_lush/MangoLush1.jpg",
      "/frontend/public/cakes/Mango_lush/MangoLush2.jpg",
    ],
    signature: false,
  },
  {
    name: "Raspberry Story",
    variants: [
      {
        size: 12,
        price: 15.0,
        portionSize: {
          from: 2,
          to: 4,
        },
      },
      {
        size: 16,
        price: 22.0,
        portionSize: {
          from: 4,
          to: 6,
        },
      },
    ],
    description: "Classic red velvet cake with cream cheese frosting.",
    category: [],
    imageUrl: [
      "/frontend/public/cakes/Raspberry_story/RaspberryStory1.jpg",
      "/frontend/public/cakes/Raspberry_story/RaspberryStory2.jpg",
    ],
    signature: true,
  },
  {
    name: "Schoggi Glee",
    variants: [
      {
        size: 10,
        price: 9.0,
        portionSize: {
          from: 1,
          to: 3,
        },
      },
      {
        size: 14,
        price: 16.0,
        portionSize: {
          from: 3,
          to: 5,
        },
      },
    ],
    description: "Refreshing lemon cake with zesty frosting.",
    category: [],
    imageUrl: [
      "/frontend/public/cakes/Schoggi_glee/SchoggiGleeCake1.jpg",
      "/frontend/public/cakes/Schoggi_glee/SchoggiGleeCake2.jpg",
    ],
    signature: false,
  },
  {
    name: "Blueberry Muse",
    variants: [
      {
        size: 12,
        price: 11.0,
        portionSize: {
          from: 2,
          to: 4,
        },
      },
      {
        size: 16,
        price: 18.0,
        portionSize: {
          from: 4,
          to: 6,
        },
      },
    ],
    description: "Moist carrot cake with cream cheese frosting.",
    category: [],
    imageUrl: [
      "/frontend/public/cakes/Blueberry_muse_cupcakes/BlueberryMuse1.jpg",
      "/frontend/public/cakes/Blueberry_muse_cupcakes/BlueberryMuse2.jpg",
    ],
    signature: false,
  },
  {
    name: "Chocolate Spell",
    variants: [
      {
        size: 10,
        price: 10.0,
        portionSize: {
          from: 1,
          to: 3,
        },
      },
      {
        size: 14,
        price: 17.0,
        portionSize: {
          from: 3,
          to: 5,
        },
      },
    ],
    description: "Delicious shortcake layered with fresh strawberries.",
    category: [],
    imageUrl: [
      "/frontend/public/cakes/Chocolate_spell_cupcakes/Chocolate_Spell1.jpg",
      "/frontend/public/cakes/Chocolate_spell_cupcakes/Chocolate_Spell2.jpg",
    ],
    signature: true,
  },
  {
    name: "Dreamy Berry",
    variants: [
      {
        size: 12,
        price: 13.0,
        portionSize: {
          from: 2,
          to: 4,
        },
      },
      {
        size: 16,
        price: 19.0,
        portionSize: {
          from: 4,
          to: 6,
        },
      },
    ],
    description: "Classic pineapple upside-down cake.",
    category: [],
    imageUrl: [
      "/frontend/public/cakes/Dreamy_berry_cupcakes/DreamyBerry1.jpg",
      "/frontend/public/cakes/Dreamy_berry_cupcakes/DreamyBerry2.jpg",
    ],
    signature: false,
  },
];

const seedProducts = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);

    // Clear existing Products
    await Product.deleteMany({});

    // Insert new Products
    await Product.insertMany(products);

    console.log("Products seeded successfully!");
  } catch (error) {
    console.error("Error seeding songs:", error);
  } finally {
    mongoose.connection.close();
  }
};

seedProducts();
