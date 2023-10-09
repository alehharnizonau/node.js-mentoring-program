import {CartItemEntity} from "./models/cart";

export type ErrorObject = {
    status: number,
    message: string,
}

interface Cart {
    id: string,
    items: CartItemEntity[]
}

export interface ResponseCart {
    cart: Cart,
    total: number
}
