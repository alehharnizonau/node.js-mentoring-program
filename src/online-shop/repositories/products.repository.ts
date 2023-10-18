import {HTTP_STATUSES} from "../utils";
import {Product} from "../entities";
import {DI} from "../index";

export const productsRepository = {
    findAll: () => new Promise<Product[]>(async (resolve) => {
        const products = await DI.productRepository.findAll();
        resolve(products);
    }),
    findOne: (productId: string) => new Promise<Product>(async (resolve, reject) => {
        const product = await DI.productRepository.findOne(productId);
        if (product) {
            resolve(product)
        } else {
            reject({
                status: HTTP_STATUSES.NotFound,
                message: 'No product with such id'
            })
        }
    }),
}