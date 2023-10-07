import { CartEntity, carts } from "../models/cart";
import { v4 as uuidv4 } from "uuid";

export const cartRepository = {
  findOne: (id: string) => new Promise<CartEntity | undefined>((resolve) => {
    const foundCart = carts.find(({ userId }) => userId === id);
    resolve(foundCart);
  }),
  createOne: (id: string) => new Promise<CartEntity>((resolve, reject) => {
    const newCart: CartEntity = {
      id: uuidv4(),
      userId: id,
      isDeleted: false,
      items: []
    }
    if (newCart) {
      carts.push(newCart);
      resolve(newCart)
    } else {
      reject();
    }
  }),
  update: (cart: CartEntity, data: {
    productId: string,
    count: number
  }) => new Promise<CartEntity>((resolve, reject) => {
    const { productId, count } = data;
    const productIndex = cart.items.findIndex((item) => item.product.id === productId);
    if (productIndex !== -1) {
      cart.items[productIndex].count = count;
      resolve(cart);
    } else {
      reject();
    }
  })
}