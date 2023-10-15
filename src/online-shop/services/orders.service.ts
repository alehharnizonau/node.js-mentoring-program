import {cartService} from "./cart.service";
import {HTTP_STATUSES} from "../utils";
import {ordersRepository} from "../repositories/orders.repository";
import {v4 as uuidv4} from "uuid";
import {OrderEntity, OrderStatus} from "../models/order";

export const ordersService = {
    createOrder: (userId: string) => new Promise<{ order: OrderEntity }>(async (resolve, reject) => {
        const {cart: {items, id: cartId}, total} = await cartService.getCart(userId);
        if (!total || !items.length) {
            reject({
                status: HTTP_STATUSES.BadRequest,
                message: 'Cart is empty'
            })
        } else {
            const order: OrderEntity = {
                id: uuidv4(),
                userId,
                cartId,
                items,
                payment: {
                    type: "paypal",
                    address: "London",
                    creditCard: "1234-1234-1234-1234"
                },
                delivery: {
                    type: "post",
                    address: "London"
                },
                comments: '',
                status: OrderStatus.created,
                total,
            };

            const createdOrder = await ordersRepository.create(order);
            resolve({order: createdOrder});
        }
    })
}