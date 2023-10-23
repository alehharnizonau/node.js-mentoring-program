import {Entity, JsonType, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {v4 as uuidv4} from "uuid";
import {User} from "./User";
import {CartItem} from "../types";

@Entity({tableName: "orders"})
export class Order {
    @PrimaryKey()
    id: string = uuidv4();

    @ManyToOne(() => User)
    user!: User;

    @Property()
    cartId: string;

    @Property({type: JsonType})
    items: CartItem[];

    @Property({type: JsonType})
    payment: {
        type: string;
        address?: string;
        creditCard?: string;
    };

    @Property({type: JsonType})
    delivery: {
        type: string;
        address: string;
    };

    @Property({nullable: true})
    comments?: string;

    @Property()
    status: string;

    @Property()
    totalPrice: number;

    constructor(
        user: User,
        cartId: string,
        items: CartItem[],
        payment: {
            type: string;
            address?: string;
            creditCard?: string;
        },
        delivery: {
            type: string;
            address: string;
        },
        status: string,
        totalPrice: number,
        comments?: string
    ) {
        this.user = user;
        this.cartId = cartId;
        this.items = items;
        this.payment = payment;
        this.delivery = delivery;
        this.status = status;
        this.totalPrice = totalPrice;
        this.comments = comments;
    }
}