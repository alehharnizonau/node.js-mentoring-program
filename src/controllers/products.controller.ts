import { Request, Response, Router } from "express";
import { productsService } from "../services";
import { HTTP_STATUSES } from "../utils";
import { ErrorObject } from "../types";
import { initProducts } from "../config/init";

export const getProductsRoutes = (router: Router) => {
  const { NODE_ENV } = process.env;
  return router
    .get("/", async (req: Request, res: Response) => {
      try {
        let products = await productsService.getProductsList();

        // only for dev to init products in db if there aren't any
        if (!products.length && NODE_ENV === "dev") {
          await initProducts();
          products = await productsService.getProductsList();
        }

        res.send({ data: products, error: null });
      } catch (err) {
        res.status(HTTP_STATUSES.ServerError).json({
          data: null,
          error: { message: err },
        });
      }
    })
    .get("/:productId", async (req: Request, res: Response) => {
      try {
        const product = await productsService.getProduct(req.params.productId);

        res.send({ data: product, error: null });
      } catch (err) {
        const { status, message } = err as ErrorObject;
        res
          .status(err instanceof Error ? HTTP_STATUSES.ServerError : status)
          .json({
            data: null,
            error: {
              message: err instanceof Error ? err.message : message,
            },
          });
      }
    });
};
