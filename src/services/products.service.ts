import { productsRepository } from "../repositories";
import { IProduct } from "../types";

export const productsService = {
  getProductsList: async (): Promise<IProduct[]> => {
    const products = await productsRepository.findAll();

    return products.map(({ id, title, price, description }) => ({
      id,
      title,
      price,
      description,
    }));
  },
  getProduct: async (productId: string): Promise<IProduct> => {
    const { id, title, price, description } =
      await productsRepository.findOne(productId);

    return { id, title, price, description };
  },
};
