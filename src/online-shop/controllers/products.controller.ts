import {Router} from "express";
import {productsService} from "../services/products.service";
import {HTTP_STATUSES} from "../utils";
import {ErrorObject} from "../types";

export const getProductsRoutes = (router: Router) =>
    router.get('/', async (req, res) => {
        try {
            const products = await productsService.getProductsList();

            res.send({data: products, error: null});
        } catch (err) {
            res.status(HTTP_STATUSES.ServerError).json({
                data: null,
                error: {message: err},
            });
        }

    })
        .get('/:productId', async (req, res) => {
            try {
                const product = await productsService.getProduct(req.params.productId);

                res.send({data: product, error: null});
            } catch (err) {
                const {status, message} = err as ErrorObject;
                res.status(err instanceof Error ? HTTP_STATUSES.ServerError : status).json({
                    data: null,
                    error: {
                        message: err instanceof Error ? err.message : message,
                    },
                })
            }
        });
