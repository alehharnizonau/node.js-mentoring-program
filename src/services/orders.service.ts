import { ordersRepository } from "../repositories";
import { BaseOrder, CreatedOrder } from "../types";
import { HTTP_STATUSES } from "../utils";
import { cartService } from "./cart.service";

export const ordersService = {
  createOrder: (user_id: string) =>
    new Promise<{ order: CreatedOrder }>(async (resolve, reject) => {
      const {
        cart: { items },
        total,
      } = await cartService.getCart(user_id);
      if (!total || !items.length) {
        reject({
          status: HTTP_STATUSES.BadRequest,
          message: "Cart is empty",
        });
      } else {
        const order: BaseOrder = {
          payment: {
            type: "paypal",
            address: "London",
            creditCard: "1234-1234-1234-1234",
          },
          delivery: {
            type: "post",
            address: "London",
          },
          comments: "test order",
          status: "created",
          total,
        };

        try {
          const createdOrder = await ordersRepository.create(order, user_id);
          const { id, payment, delivery, comments, status } = createdOrder;
          const {
            cart: { items, id: cartId },
            total: totalPrice,
          } = await cartService.getCart(createdOrder.user.id);
          const responseOrder = {
            id,
            userId: user_id,
            cartId,
            items,
            payment,
            delivery,
            comments,
            status,
            total: totalPrice,
          };

          resolve({ order: responseOrder });
        } catch (err) {
          reject(err);
        }
      }
    }),
};
