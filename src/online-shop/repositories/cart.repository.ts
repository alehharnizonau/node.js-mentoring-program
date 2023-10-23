import {Cart} from "../entities";
import {DI} from "../index";
import {HTTP_STATUSES} from "../utils";

export const cartRepository = {
    findOne: (id: string) => new Promise<Cart | undefined | null>(async (resolve, reject) => {
        try {
            const user = await DI.userRepository.findOneOrFail(id);
            const cart = await DI.cartRepository.findOne({user, isDeleted: false});
            resolve(cart);
        } catch (err) {
            reject(err)
        }
    }),
    createOne: (id: string) => new Promise<Cart>(async (resolve, reject) => {
        try {
            const user = await DI.userRepository.findOneOrFail(id);
            const newCart = new Cart(user);
            await DI.cartRepository.persistAndFlush(newCart);
            if (newCart) {
                resolve(newCart)
            } else {
                throw new Error("Error creating cart");
            }
        } catch (err) {
            reject(err);
        }
    }),
    update: (data: {
        productId: string,
        count: number
    }, cart?: Cart | null) => new Promise<Cart>(async (resolve, reject) => {
            if (!cart) {
                reject({
                    status: HTTP_STATUSES.NotFound,
                    message: 'Cart was not found'
                })
            } else {
                const {productId, count} = data;
                try {
                    const product = await DI.productRepository.findOneOrFail(productId);
                    cart.addItem(product, count);
                    await DI.cartRepository.persistAndFlush(cart);
                    resolve(cart);
                } catch (err) {
                    reject({
                        status: HTTP_STATUSES.BadRequest,
                        message: 'Products are not valid'
                    });
                }
            }
        }
    ),
    remove: (id: string) => new Promise<{ success: true }>(async (resolve, reject) => {
        try {
            const user = await DI.userRepository.findOneOrFail(id);
            const cart = await DI.cartRepository.findOne({user, isDeleted: false});
            if (cart) {
                cart.isDeleted = true;
                await DI.cartRepository.persistAndFlush(cart);
                resolve({success: true})
            } else {
                reject({
                    status: HTTP_STATUSES.NotFound,
                    message: 'Cart was not found'
                });
            }
        } catch (err) {
            reject(err);
        }
    })
}