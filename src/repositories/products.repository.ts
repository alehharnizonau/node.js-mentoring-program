import { HTTP_STATUSES } from "../utils";
import { IProduct } from "../types";
import { Product } from "../models";

export const productsRepository = {
  findAll: () =>
    new Promise<IProduct[]>(async (resolve) => {
      const products = await Product.find();
      resolve(products);
    }),
  findOne: (productId: string) =>
    new Promise<IProduct>(async (resolve, reject) => {
      try {
        const product = await Product.findOne({ _id: productId });

        if (product) {
          resolve(product);
        } else {
          reject({
            status: HTTP_STATUSES.NotFound,
            message: "No product with such id",
          });
        }
      } catch (err) {
        reject({
          status: HTTP_STATUSES.NotFound,
          message: "No product with such id",
        });
      }
    }),
};
