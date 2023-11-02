import dotenv from "dotenv";
import {connect} from "./config/database";
import express, {Router} from "express";
import {cartsController, productsController, userController} from "./controllers";
import {CurrentUser} from "./types";
import {verifyToken} from "./middleware/auth";

declare global {
    namespace Express {
        interface Request {
            user: CurrentUser
        }
    }
}

export const bootstrap = async () => {
    dotenv.config();
    await connect();
    const app = express();

    app.use(express.json());
    app.use('/api', userController(Router()));
    app.use('/api', verifyToken);
    app.use('/api/products', productsController(Router()));
    app.use('/api/profile/cart', cartsController(Router()));

    return app;
}