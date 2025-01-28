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
      "Three-layer cake with bright berry fillings\r\nand velvety vanilla yoghurt frosting",
    category: ["signature", "cakes"],
    imageUrl: [
      "https://res.cloudinary.com/dmhyq5ub5/image/upload/v1738082875/lgyocggof52szvndwyps.webp",
      "https://res.cloudinary.com/dmhyq5ub5/image/upload/v1738082876/n7wxyzxpg85x5sb2i7x4.webp",
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
      "Four-layer chocolate cake with gorgeous\r\nlayers of berry jam and berry pudding",
    category: ["cakes"],
    imageUrl: [
      "https://res.cloudinary.com/dmhyq5ub5/image/upload/v1738082899/hylempkw1kxtau2zrctg.webp",
      "https://res.cloudinary.com/dmhyq5ub5/image/upload/v1738082900/adjsuszmqrdz7kqq3irv.webp",
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
      "Three-layer cake with refreshing mango\r\nfilling and mango yoghurt frosting",
    category: ["cakes"],
    imageUrl: [
      "https://res.cloudinary.com/dmhyq5ub5/image/upload/v1738082924/dymhzgn0t3rqllb0yfbf.webp",
      "https://res.cloudinary.com/dmhyq5ub5/image/upload/v1738082925/o5puc3tqkthc6qvveezl.webp",
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
      "Crunchy chocolate crust filled with raspberry\r\ncream, covered with raspberry chocolate",
    category: ["cakes", "signature"],
    imageUrl: [
      "https://res.cloudinary.com/dmhyq5ub5/image/upload/v1738082962/uizxy9yn1iq34cssslmh.webp",
      "https://res.cloudinary.com/dmhyq5ub5/image/upload/v1738082963/nyf4ranuly9u5esoo3hp.webp",
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
    description:
      "Four-layer cake with two different fillings\r\nof caramelised hazelnuts and coffee\r\npudding (options for non-coffee or decaf)",
    category: ["cakes"],
    imageUrl: [
      "https://res.cloudinary.com/dmhyq5ub5/image/upload/v1738082979/lsrkz32elvu7hikueezh.webp",
    ],
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
      "A taste of summer with blueberry cream\r\npaired with lemon curd",
    category: ["delicacies"],
    imageUrl: [
      "https://res.cloudinary.com/dmhyq5ub5/image/upload/v1738082999/eaniwrzn8elxk3zecd3i.webp",
      "https://res.cloudinary.com/dmhyq5ub5/image/upload/v1738083000/zktqdkj3qgrlqfaslxnd.webp",
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
      "A luscious combination of rich chocolate,\r\nsalted caramel and caramelised hazelnut",
    category: ["delicacies", "signature"],
    imageUrl: [
      "https://res.cloudinary.com/dmhyq5ub5/image/upload/v1738083047/ywbes3sldhxnxdgumwej.webp",
      "https://res.cloudinary.com/dmhyq5ub5/image/upload/v1738083048/pph3rnit8yayjnzkubvv.webp",
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
      "A delightful vanilla yoghurt cream paired\r\nwith jammy berries",
    category: ["delicacies"],
    imageUrl: [
      "https://res.cloudinary.com/dmhyq5ub5/image/upload/v1738083077/fq7dmgjtovsx6hkjq18a.webp",
      "https://res.cloudinary.com/dmhyq5ub5/image/upload/v1738083078/vhtsuuo1ratofgftuw3x.webp",
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
