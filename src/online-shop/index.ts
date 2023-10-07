import express, { Router } from 'express';
import { authMiddleware } from "./controllers/auth.controlller";
import { getProductsRoutes } from "./controllers/products.controller";
import { getCartRoutes } from "./controllers/cart.controller";
import bodyParser from "body-parser";

const app = express();

const parserMiddleware = bodyParser();

app.use(authMiddleware);
app.use('/api/products', getProductsRoutes(Router()));
app.use('/api/profile/cart', parserMiddleware, getCartRoutes(Router()));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`)
});