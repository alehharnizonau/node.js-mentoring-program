import {BaseOrder} from "../types";
import {DI} from "../index";
import {Order} from "../entities";

export const ordersRepository = {
    create: (order: BaseOrder, id: string) => new Promise<Order>(async (resolve, reject) => {
        try {
            const user = await DI.userRepository.findOneOrFail(id);
            const {cartId, items, payment, delivery, status, total, comments} = order;
            const newOrder = new Order(user, cartId, items, payment, delivery, status, total, comments);
            await DI.orderRepositorty.persistAndFlush(newOrder)
            resolve(newOrder);
        } catch (err) {
            reject(err)
        }
    })
}