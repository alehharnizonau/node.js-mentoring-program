import { Product } from "../models";

export const initProducts = async () => {
  await Product.create({
    title: "Book",
    description: "Very interesting book",
    price: 20,
  });
  await Product.create({
    title: "Pen",
    description: "Black gift pen",
    price: 30,
  });
  await Product.create({
    title: "Glasses",
    description: "Sunglasses with red tint",
    price: 50,
  });
};
