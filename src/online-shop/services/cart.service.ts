import {cartRepository} from "../repositories/cart.repository";

export const cartService = {
    getCart: async (id: string) => {
        let foundCart = await cartRepository.findOne(id);
        let totalPrice = 0;
        if (foundCart) {
            totalPrice = foundCart.items.reduce((acc, cur) => acc + cur.product.price * cur.count, 0);
        } else {
            foundCart = await cartRepository.createOne(id);
        }
        return {
            cart: {
                id: foundCart.id,
                items: foundCart.items,
            },
            total: totalPrice
        }
    },
    updateCart: async (id: string, data: {
        productId: string,
        count: number
    }) => {
        let foundCart = await cartRepository.findOne(id);
        if (!foundCart) {
            foundCart = await cartRepository.createOne(id);
        }

        const updatedCart = await cartRepository.update(foundCart, data);
        const totalPrice = updatedCart.items.reduce((acc, cur) => acc + cur.product.price * cur.count, 0);

        return {
            cart: {
                id: updatedCart.id,
                items: updatedCart.items,
            },
            total: totalPrice
        }
    },
    removeCart: async (userId: string) => await cartRepository.remove(userId)
}