import { cartsRepository, productsRepository } from "../repositories";
import { CartItem } from "../types";

export const cartService = {
  getCart: async (id: string) => {
    let cart = await cartsRepository.findOne(id);
    let totalPrice = 0;
    let items: CartItem[] = [];

    if (cart) {
      items = await Promise.all(
        cart.items.map(async (item) => {
          const product = await productsRepository.findOne(
            (item.product.id as unknown as Buffer).toString("hex"),
          );
          const { id, title, description, price } = product;
          return {
            product: { id, title, description, price },
            count: item.count,
          };
        }),
      );
      totalPrice = items.reduce(
        (acc, cur) => acc + cur.product.price * cur.count,
        0,
      );
    } else {
      cart = await cartsRepository.createOne(id);
    }

    return {
      cart: {
        id: cart.id,
        items,
      },
      total: totalPrice,
    };
  },
  updateCart: async (
    id: string,
    data: {
      productId: string;
      count: number;
    },
  ) => {
    let cart = await cartsRepository.findOne(id);
    const updatedCart = await cartsRepository.update(data, cart);
    const items = await Promise.all(
      updatedCart.items.map(async (item) => {
        const product = await productsRepository.findOne(
          (item.product.id as unknown as Buffer).toString("hex"),
        );
        const { id, title, description, price } = product;
        return {
          product: { id, title, description, price },
          count: item.count,
        };
      }),
    );
    const totalPrice = items.reduce(
      (acc, cur) => acc + cur.product.price * cur.count,
      0,
    );

    return {
      cart: {
        id: updatedCart.id,
        items,
      },
      total: totalPrice,
    };
  },
  removeCart: async (userId: string) => await cartsRepository.remove(userId),
};
