import {CartEntity, carts} from "../models/cart";
import {v4 as uuidv4} from "uuid";
import {productsRepository} from "./products.repository";

export const cartRepository = {
    findOne: (id: string) => new Promise<CartEntity | undefined>((resolve) => {
        const foundCart = carts.find((cart) => cart.userId === id && !cart.isDeleted);
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
    }) => new Promise<CartEntity>(async (resolve, reject) => {
        const {productId, count} = data;
        const productIndex = cart.items.findIndex((item) => item.product.id === productId);
        if (productIndex !== -1) {
            cart.items[productIndex].count = count;
        } else {
            try {
                const product = await productsRepository.findOne(productId);
                const cartItem = {
                    product, count
                }
                cart.items.push(cartItem)
            } catch (err) {
                reject(err)
            }
        }

        resolve(cart);
    }),
    remove: (id: string) => new Promise<{ success: true }>((resolve, reject) => {
        const deletedCartIndex = carts.findIndex((cart) => cart.userId === id && !cart.isDeleted);
        if (deletedCartIndex !== -1) {
            carts[deletedCartIndex].isDeleted = true;
            resolve({success: true});
        } else {
            reject();
        }
    })
}