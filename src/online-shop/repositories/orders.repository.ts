import {OrderEntity, orders} from "../models/order";

export const ordersRepository = {
    create: (order: OrderEntity) => new Promise<OrderEntity>((resolve) => {
        orders.push(order);
        resolve(order);
    })
}