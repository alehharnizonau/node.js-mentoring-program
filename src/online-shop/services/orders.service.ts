import {cartService} from "./cart.service";
import {HTTP_STATUSES} from "../utils";
import {ordersRepository} from "../repositories/orders.repository";
import {BaseOrder, CreatedOrder} from "../types";

export const ordersService = {
    createOrder: (user_id: string) => new Promise<{ order: CreatedOrder }>(async (resolve, reject) => {
        const {cart: {items: cartItems, id: cart_id}, total: totalPrice} = await cartService.getCart(user_id);
        if (!totalPrice || !cartItems.length) {
            reject({
                status: HTTP_STATUSES.BadRequest,
                message: 'Cart is empty'
            })
        } else {
            const order: BaseOrder = {
                cartId: cart_id,
                items: cartItems,
                payment: {
                    type: "paypal",
                    address: "London",
                    creditCard: "1234-1234-1234-1234"
                },
                delivery: {
                    type: "post",
                    address: "London"
                },
                comments: 'test order',
                status: 'created',
                total: totalPrice,
            };

            const createdOrder = await ordersRepository.create(order, user_id);

            const {
                id,
                user: {id: userId},
                cartId,
                items,
                payment,
                delivery,
                status,
                comments,
                totalPrice: total
            } = createdOrder;
            const responseOrder = {
                id,
                userId,
                cartId,
                items,
                payment,
                delivery,
                comments,
                status,
                total
            }
            resolve({order: responseOrder});
        }
    })
}