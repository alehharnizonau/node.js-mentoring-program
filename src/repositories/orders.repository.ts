import { BaseOrder, IOrder } from "../types";
import { Cart, User } from "../models";
import { Order } from "../models/order";

export const ordersRepository = {
  create: (order: BaseOrder, id: string) =>
    new Promise<IOrder>(async (resolve, reject) => {
      try {
        const user = await User.findById(id);
        const cart = await Cart.findOne({ user, isDeleted: false });
        const newOrder = new Order({
          user,
          cart,
          ...order,
        });

        await newOrder.save();

        resolve(newOrder);
      } catch (err) {
        reject(err);
      }
    }),
};
