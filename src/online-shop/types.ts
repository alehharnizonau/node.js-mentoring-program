export type ErrorObject = {
    status: number,
    message: string,
}

export interface IUser {
    name: string;
    email: string;
    id: string;
}

export interface IProduct {
    id: string;
    title: string;
    description: string;
    price: number;
}

export interface CartItem {
    product: IProduct;
    count: number;
}

export interface ICart {
    id: string,
    items: CartItem[]
}

export interface ResponseCart {
    cart: ICart,
    total: number
}

export interface BaseOrder {
    payment: {
        type: string,
        address?: any,
        creditCard?: any,
    },
    delivery: {
        type: string,
        address: any,
    },
    status: string;
    comments?: string,
    total: number
}

export interface IOrder extends BaseOrder {
    id: string;
    user: IUser;
    cart: ICart;
}

export interface CreatedOrder extends BaseOrder {
    id: string;
    userId: string;
    cartId: string;
    items: CartItem[]
}
