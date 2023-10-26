import * as dotenv from "dotenv";
import express, {Router} from 'express';
import {authController, cartsController, productsController} from "./controllers";
import bodyParser from "body-parser";
import mongoose from "mongoose";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017";
const parserMiddleware = bodyParser();

(async () => {
    await mongoose.connect(uri);
    app.use(authController);
    app.use('/api/products', productsController(Router()));
    app.use('/api/profile/cart', parserMiddleware, cartsController(Router()));
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})();