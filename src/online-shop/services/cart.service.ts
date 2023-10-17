import {cartRepository} from "../repositories/cart.repository";

export const cartService = {
    getCart: async (id: string) => {
        let cart = await cartRepository.findOne(id);
        let totalPrice = 0;
        if (cart) {
            totalPrice = cart.items.reduce((acc, cur) => acc + cur.product.price * cur.count, 0);
        } else {
            cart = await cartRepository.createOne(id);
        }
        return {
            cart: {
                id: cart.id,
                items: cart.items,
            },
            total: totalPrice
        }
    },
    updateCart: async (id: string, data: {
        productId: string,
        count: number
    }) => {
        let cart = await cartRepository.findOne(id);
        if (!cart) {
            cart = await cartRepository.createOne(id);
        }

        const updatedCart = await cartRepository.update(cart, data);
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