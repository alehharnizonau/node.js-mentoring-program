import { model, Schema } from "mongoose";
import { ICart } from "../types";

export const cartItemSchema = new Schema({
  product: { type: Schema.Types.ObjectId, ref: "Product" },
  count: { type: Number, required: true },
});

const cartSchema = new Schema({
  isDeleted: { type: Boolean, default: false },
  items: { type: [cartItemSchema], default: [] },
  user: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

export const Cart = model<ICart>("Cart", cartSchema);
