import Joi from "joi";
import { CartItem, ICart, IProduct } from "../types";

export enum HTTP_STATUSES {
  Ok = 200,
  Created = 201,
  NoContent = 204,
  BadRequest = 400,
  Unauthorized = 401,
  Forbidden = 403,
  NotFound = 404,
  AlreadyExist = 409,
  ServerError = 500,
}

export const schema = Joi.object({
  productId: Joi.string().required(),
  count: Joi.number().integer().min(0).required(),
}).required();

export const getUpdatedItems = (
  cart: ICart,
  count: number,
  productId: string,
  product: IProduct,
) => {
  const existingItem = cart.items.find(
    ({ product: { id } }) =>
      (id as unknown as Buffer).toString("hex") === productId,
  );
  const newItem: CartItem = { product, count };

  if (!existingItem) {
    return [...cart.items, newItem];
  }

  if (count === 0) {
    return cart.items.filter(
      ({ product: { id } }) =>
        (id as unknown as Buffer).toString("hex") !== productId,
    );
  } else {
    existingItem.count += count;
    return cart.items.map((item) =>
      (item.product.id as unknown as Buffer).toString("hex") ===
      existingItem.product.id
        ? existingItem
        : item,
    );
  }
};
