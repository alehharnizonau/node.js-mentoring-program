import { getUpdatedItems, HTTP_STATUSES } from "../utils";
import { Cart, Product, User } from "../models";
import { ICart } from "../types";

export const cartsRepository = {
  findOne: (id: string) =>
    new Promise<ICart | null>(async (resolve, reject) => {
      try {
        const user = await User.findById(id);
        const cart = await Cart.findOne({ user, isDeleted: false });
        if (cart) {
          resolve(cart);
        } else {
          resolve(null);
        }
      } catch (err) {
        reject(err);
      }
    }),
  createOne: (id: string) =>
    new Promise<ICart>(async (resolve, reject) => {
      try {
        const user = await User.findById(id);
        const cart = new Cart({
          isDeleted: false,
          items: [],
          user,
        });
        await cart.save();
        resolve(cart);
      } catch (err) {
        reject(err);
      }
    }),
  update: (
    data: {
      productId: string;
      count: number;
    },
    cart?: ICart | null,
  ) =>
    new Promise<ICart>(async (resolve, reject) => {
      if (!cart) {
        reject({
          status: HTTP_STATUSES.NotFound,
          message: "Cart was not found",
        });
      } else {
        const { productId, count } = data;
        try {
          const product = await Product.findById(productId);
          if (!product) {
            reject({
              status: HTTP_STATUSES.BadRequest,
              message: "Products are not valid",
            });
          } else {
            const items = getUpdatedItems(cart, count, productId, product);
            const newCart = await Cart.findByIdAndUpdate(
              cart.id,
              {
                items:
                  items.length > 0
                    ? items
                    : [
                        {
                          product,
                          count,
                        },
                      ],
              },
              { returnDocument: "after" },
            );
            if (newCart) {
              resolve(newCart);
            } else {
              reject({
                status: HTTP_STATUSES.NotFound,
                message: "Cart was not found",
              });
            }
          }
        } catch (err) {
          reject({
            status: HTTP_STATUSES.BadRequest,
            message: "Products are not valid",
          });
        }
      }
    }),
  remove: (id: string) =>
    new Promise<{ success: true }>(async (resolve, reject) => {
      try {
        const user = await User.findById(id);
        const cart = await Cart.findOneAndUpdate(
          { user, isDeleted: false },
          { isDeleted: true },
        );
        if (cart) {
          resolve({ success: true });
        } else {
          reject({
            status: HTTP_STATUSES.NotFound,
            message: "Cart was not found",
          });
        }
      } catch (err) {
        reject(err);
      }
    }),
};
