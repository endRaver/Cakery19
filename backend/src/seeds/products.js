import mongoose from "mongoose";
import { Product } from "../models/product.model.js";
import { config } from "dotenv";

config();

const products = [
  {
    name: "Berrytale",
    variants: [
      {
        size: "14 cm",
        price: 90.0,
        portionSize: {
          from: 2,
          to: 4,
        },
      },
      {
        size: "16 cm",
        price: 120.0,
        portionSize: {
          from: 3,
          to: 6,
        },
      },
      {
        size: "18 cm",
        price: 150.0,
        portionSize: {
          from: 3,
          to: 6,
        },
      },
    ],
    description:
      "Decorated with fresh blueberries and homegrown herbs from my garden.",
    category: ["signature", "cakes"],
    imageUrl: [
      "/cakes/Berrytale/Berrytale1.jpg",
      "/cakes/Berrytale/Berrytale2.jpg",
    ],
  },
  {
    name: "Berry Truffle",
    variants: [
      {
        size: "14 cm",
        price: 110.0,
        portionSize: {
          from: 2,
          to: 4,
        },
      },
      {
        size: "16 cm",
        price: 140.0,
        portionSize: {
          from: 3,
          to: 6,
        },
      },
      {
        size: "18 cm",
        price: 170.0,
        portionSize: {
          from: 3,
          to: 6,
        },
      },
    ],
    description:
      "Gorgeous, fragrant and absolutely delicious combination of raspberry and chocolate.",
    category: ["cakes"],
    imageUrl: [
      "/cakes/Berry_truffle/BerryTruffle1.jpg",
      "/cakes/Berry_truffle/BerryTruffle2.jpg",
    ],
  },
  {
    name: "Mango Lush",
    variants: [
      {
        size: "14 cm",
        price: 80.0,
        portionSize: {
          from: 2,
          to: 4,
        },
      },
      {
        size: "16 cm",
        price: 110.0,
        portionSize: {
          from: 3,
          to: 6,
        },
      },
      {
        size: "18 cm",
        price: 140.0,
        portionSize: {
          from: 3,
          to: 6,
        },
      },
    ],
    description:
      "Juicy mango filling, silky mango cream and bright lemon curd is seriously a heavenly match.",
    category: ["cakes"],
    imageUrl: [
      "/cakes/Mango_lush/MangoLush1.jpg",
      "/cakes/Mango_lush/MangoLush2.jpg",
    ],
  },
  {
    name: "Raspberry Story",
    variants: [
      {
        size: "16 cm",
        price: 70.0,
        portionSize: {
          from: 2,
          to: 4,
        },
      },
      {
        size: "20 cm",
        price: 90.0,
        portionSize: {
          from: 4,
          to: 6,
        },
      },
    ],
    description:
      "Chocolate crust, melt-in-your mouth raspberry filling covered in raspberry ganache.",
    category: ["cakes", "signature"],
    imageUrl: [
      "/cakes/Raspberry_story/RaspberryStory1.jpg",
      "/cakes/Raspberry_story/RaspberryStory2.jpg",
    ],
  },
  {
    name: "Schoggi Glee",
    variants: [
      {
        size: "14 cm",
        price: 90.0,
        portionSize: {
          from: 2,
          to: 4,
        },
      },
      {
        size: "16 cm",
        price: 120.0,
        portionSize: {
          from: 3,
          to: 6,
        },
      },
      {
        size: "18 cm",
        price: 150.0,
        portionSize: {
          from: 3,
          to: 6,
        },
      },
    ],
    description: "A dream came true for any chocolate lover.",
    category: ["cakes"],
    imageUrl: ["/cakes/Schoggi_glee/SchoggiGleeCake1.jpg"],
  },
  {
    name: "Blueberry Muse",
    variants: [
      {
        size: "6 pieces",
        price: 42.0,
        portionSize: {
          from: 2,
          to: 4,
        },
      },
    ],
    description:
      "Delightful summer flavors packed into a cupcake! Sweet blueberry cream and tangy lemon curd make every bite a sunny treat.",
    category: ["delicacies"],
    imageUrl: [
      "/cakes/Blueberry_muse_cupcakes/BlueberryMuse1.jpg",
      "/cakes/Blueberry_muse_cupcakes/BlueberryMuse2.jpg",
    ],
  },
  {
    name: "Chocolate Spell",
    variants: [
      {
        size: "6 pieces",
        price: 39.0,
        portionSize: {
          from: 1,
          to: 3,
        },
      },
    ],
    description:
      "Indulge yourself with rich chocolate salted caramel and caramelized hazelnuts.",
    category: ["delicacies", "signature"],
    imageUrl: [
      "/cakes/Chocolate_spell_cupcakes/Chocolate_Spell1.jpg",
      "/cakes/Chocolate_spell_cupcakes/Chocolate_Spell2.jpg",
    ],
  },
  {
    name: "Dreamy Berry",
    variants: [
      {
        size: "6 pieces",
        price: 42.0,
        portionSize: {
          from: 2,
          to: 4,
        },
      },
    ],
    description:
      "Tender, luscious and delightful with sweet vanilla cream and juicy berry filling.",
    category: ["delicacies"],
    imageUrl: [
      "/cakes/Dreamy_berry_cupcakes/DreamyBerry1.jpg",
      "/cakes/Dreamy_berry_cupcakes/DreamyBerry2.jpg",
    ],
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
