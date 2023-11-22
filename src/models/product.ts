import { model, Schema } from "mongoose";
import { IProduct } from "../types";

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
});

export const Product = model<IProduct>("Product", productSchema);
