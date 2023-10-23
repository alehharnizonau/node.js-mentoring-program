import {Entity, JsonType, ManyToOne, PrimaryKey, Property} from "@mikro-orm/core";
import {v4 as uuidv4} from "uuid";
import {CartItem} from "../types";
import {User} from "./User";
import {Product} from "./Product";

@Entity({tableName: 'carts'})
export class Cart {
    @PrimaryKey()
    id: string = uuidv4();

    @Property()
    isDeleted: boolean = false;

    @Property({type: JsonType})
    items: CartItem[] = [];

    @ManyToOne(() => User)
    user!: User;

    constructor(user: User) {
        this.user = user;
    }

    addItem(product: Product, count: number) {
        const existingItem = this.items.find(
            (item) => item.product.id === product.id
        );

        if (existingItem) {
            if (count === 0) {
                this.items = this.items.filter(
                    (item) => item.product.id !== product.id);
            } else {
                existingItem.count += count;
            }
        } else {
            this.items.push({product, count});
        }
    }
}