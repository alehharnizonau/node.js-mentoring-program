import { ProductEntity, products } from "../models/product";
import { HTTP_STATUSES } from "../utils";

export const productsRepository = {
  findAll: () => new Promise<ProductEntity[]>((resolve, _reject) => {
    const foundProducts = products.map(product => product)
    resolve(foundProducts);
  }),
  findOne: (productId: string) => new Promise<ProductEntity>((resolve, reject) => {
    const foundProduct = products.find(product => product.id === productId)
    if (foundProduct) {
      resolve(foundProduct)
    } else {
      reject({
        status: HTTP_STATUSES.NotFound,
        message: 'Product not found'
      })
    }
  })
}