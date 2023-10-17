import {Cart} from "../entities";
import {DI} from "../index";

export const cartRepository = {
    findOne: (id: string) => new Promise<Cart | undefined | null>(async (resolve) => {
        const user = await DI.userRepository.findOneOrFail(id);
        const cart = await DI.cartRepository.findOne({user, isDeleted: false});
        resolve(cart);
    }),
    createOne: (id: string) => new Promise<Cart>(async (resolve, reject) => {
        const user = await DI.userRepository.findOneOrFail(id);
        const newCart = new Cart(user);
        await DI.cartRepository.persistAndFlush(newCart);
        if (newCart) {
            resolve(newCart)
        } else {
            reject();
        }
    }),
    update: (cart: Cart, data: {
        productId: string,
        count: number
    }) => new Promise<Cart>(async (resolve, reject) => {
        const {productId, count} = data;
        try {
            const product = await DI.productRepository.findOneOrFail(productId);
            cart.addItem(product, count);
            await DI.cartRepository.persistAndFlush(cart);
            resolve(cart);
        } catch (err) {
            reject(err);
        }
    }),
    remove: (id: string) => new Promise<{ success: true }>(async (resolve, reject) => {
        try {
            const user = await DI.userRepository.findOneOrFail(id);
            const cart = await DI.cartRepository.findOne({user, isDeleted: false});
            if (cart) {
                cart.isDeleted = true;
                await DI.cartRepository.persistAndFlush(cart);
                resolve({success: true})
            } else (
                reject()
            )
        } catch (err) {
            reject(err);
        }
    })
}