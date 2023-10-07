import { cartRepository } from "../repositories/cart.repository";

export const cartService = {
  getCart: async (id: string) => {
    const foundCart = await cartRepository.findOne(id);
    if (foundCart) {
      return foundCart
    }

    return await cartRepository.createOne(id);
  },
  updateCart: async (id: string, data: {
    productId: string,
    count: number
  }) => {
    let foundCart = await cartRepository.findOne(id);
    if (!foundCart) {
      foundCart = await cartRepository.createOne(id);
    }

    return await cartRepository.update(foundCart, data);
  }
}