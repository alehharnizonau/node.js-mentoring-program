import {CartItemEntity, carts} from "./cart";

export enum OrderStatus {
    created = 'created',
    completed = 'completed'
}

export interface OrderEntity {
    id: string, // uuid
    userId: string;
    cartId: string;
    items: CartItemEntity[] // products from CartEntity
    payment: {
        type: string,
        address?: any,
        creditCard?: any,
    },
    delivery: {
        type: string,
        address: any,
    },
    comments: string,
    status: OrderStatus.created;
    total: number;
}

export const orders: OrderEntity[] = [
    {
        id: 'dffd6fa8-be6b-47f6-acff-455612620ac2',
        userId: '0fe36d16-49bc-4aab-a227-f84df899a6cb',
        cartId: '',
        items: carts[0].items,
        payment: {
            type: 'paypal',
            address: "London",
            creditCard: "1234-1234-1234-1234"
        },
        delivery: {
            type: 'post',
            address: 'London'
        },
        comments: '',
        status: OrderStatus.created,
        total: 1200,
    }
]
