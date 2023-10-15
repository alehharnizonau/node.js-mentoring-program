import { productsRepository } from "../repositories/products.repository";

export const productsService = {
  getProductsList: () => productsRepository.findAll(),
  getProduct: (id: string) => productsRepository.findOne(id),
}