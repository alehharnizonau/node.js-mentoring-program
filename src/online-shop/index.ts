import * as dotenv from "dotenv";
import express, {Router} from 'express';
import {authMiddleware} from "./controllers/auth.controller";
import {getProductsRoutes} from "./controllers/products.controller";
import {getCartRoutes} from "./controllers/cart.controller";
import bodyParser from "body-parser";
import {EntityManager, EntityRepository, MikroORM, RequestContext} from "@mikro-orm/core";
import {PostgreSqlDriver} from "@mikro-orm/postgresql";
import ormConfig from "../config/orm.config";
import http from 'http';
import {Cart, Order, Product, User} from "./entities";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

const parserMiddleware = bodyParser();

export const DI = {} as {
    server: http.Server;
    orm: MikroORM,
    em: EntityManager,
    userRepository: EntityRepository<User>,
    cartRepository: EntityRepository<Cart>,
    productRepository: EntityRepository<Product>,
    orderRepositorty: EntityRepository<Order>
};

(async () => {
    DI.orm = await MikroORM.init<PostgreSqlDriver>(ormConfig);

    DI.em = DI.orm.em;
    DI.userRepository = DI.orm.em.getRepository(User);
    DI.cartRepository = DI.orm.em.getRepository(Cart);
    DI.productRepository = DI.orm.em.getRepository(Product);
    DI.orderRepositorty = DI.orm.em.getRepository(Order);

    app.use((req, res, next) => RequestContext.create(DI.orm.em, next));
    app.use(authMiddleware);
    app.use('/api/products', getProductsRoutes(Router()));
    app.use('/api/profile/cart', parserMiddleware, getCartRoutes(Router()));

    DI.server = app.listen(PORT, () => {
        console.log(`App listening on port ${PORT}`);
    });
})();