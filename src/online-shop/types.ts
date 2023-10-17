export type ErrorObject = {
    status: number,
    message: string,
}

export interface User {
    id: string;
    username: string;
    email: string;
}

interface Product {
    id: string;
    title: string;
    description: string;
    price: number;
}

export interface CartItem {
    product: Product;
    count: number;
}

interface Cart {
    id: string,
    items: CartItem[]
}

export interface ResponseCart {
    cart: Cart,
    total: number
}

export interface BaseOrder {
    cartId: string;
    items: CartItem[]
    payment: {
        type: string,
        address?: any,
        creditCard?: any,
    },
    delivery: {
        type: string,
        address: any,
    },
    comments?: string,
    status: string;
    total: number;
}

export interface Order extends BaseOrder {
    user: User;
    id: string;
}

export interface CreatedOrder extends BaseOrder {
    userId: string;
}
