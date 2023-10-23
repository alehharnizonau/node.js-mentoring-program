import type {EntityManager} from '@mikro-orm/core';
import {Seeder} from '@mikro-orm/seeder';
import {Cart, Order, Product, User} from "../entities";

export class DatabaseSeeder extends Seeder {
    async run(em: EntityManager): Promise<void> {
        const product1 = new Product('Book', 'Very interesting book', 100);
        const product2 = new Product('Book2', 'Not very interesting book', 200);

        await em.persistAndFlush([product1, product2]);

        const user1 = new User('User1', 'user1@test.com');
        const user2 = new User('User2', 'user2@test.com');

        const cart1 = new Cart(user1);
        const cart2 = new Cart(user2);

        cart1.addItem(product1, 5);
        cart2.addItem(product2, 10);

        await em.persistAndFlush([cart1, cart2]);

        const order1 = new Order(
            user1,
            cart1.id,
            [
                {product: product1, count: 4},
                {product: product2, count: 2},
            ],
            {
                type: "paypal",
                address: "London",
                creditCard: "1234-1234-1234-1234"
            },
            {
                type: 'post',
                address: 'London'
            },
            'created',
            600,
            "test order"
        );
        const order2 = new Order(
            user2,
            cart2.id,
            [
                {product: product2, count: 5}
            ],
            {
                type: "paypal",
                address: "London",
                creditCard: "1234-1234-1234-1234"
            },
            {
                type: 'post',
                address: 'London'
            },
            'created',
            1000,
            "test order"
        );

        await em.persistAndFlush([order1, order2]);
    }
}
