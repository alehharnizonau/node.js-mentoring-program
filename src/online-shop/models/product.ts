export interface ProductEntity {
  id: string; // uuid
  title: string;
  description: string;
  price: number;
}

export const products: ProductEntity[] = [
  {
    id: '51422fcd-0366-4186-ad5b-c23059b6f64f',
    title: 'Book',
    description: 'A very interesting book',
    price: 100
  },
  {
    id: '51422fcd-0366-4186-ad5b-c23059b6f666',
    title: 'Book2',
    description: 'Not very interesting book',
    price: 200
  },
]
