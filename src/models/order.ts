import { model, Schema } from "mongoose";
import { IOrder } from "../types";

const orderSchema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  cart: { type: Schema.Types.ObjectId, ref: "Cart", required: true },
  payment: {
    type: { type: String, required: true },
    address: { type: String },
    creditCard: { type: String },
  },
  delivery: {
    type: { type: String, required: true },
    address: { type: String, required: true },
  },
  comments: { type: String },
  status: { type: String, required: true },
  total: { type: Number, required: true },
});

export const Order = model<IOrder>("Order", orderSchema);
