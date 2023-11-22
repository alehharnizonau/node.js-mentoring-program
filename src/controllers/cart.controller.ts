import { Request, Response, Router } from "express";
import { HTTP_STATUSES, schema } from "../utils";
import { cartService, ordersService } from "../services";
import { ErrorObject, ResponseCart } from "../types";
import { isAdmin } from "../middleware/isAdmin";

export const getCartRoutes = (router: Router) =>
  router
    .get("/", async (req: Request, res: Response) => {
      try {
        const cart: ResponseCart = await cartService.getCart(req.user.id);

        res.send({ data: cart, error: null });
      } catch (err) {
        res.status(HTTP_STATUSES.ServerError).json({
          data: null,
          error: { message: err },
        });
      }
    })
    .put("/", async (req: Request, res: Response) => {
      try {
        const { body } = req;
        const { error } = schema.validate(body, { abortEarly: false });
        if (error) {
          const details = error?.details
            .map((detail) => detail.message.replace(/[^\w\s]/gi, ""))
            .toString();

          return res.status(HTTP_STATUSES.BadRequest).json({
            data: null,
            error: {
              message: "Products are not valid",
              details,
            },
          });
        }

        const cart: ResponseCart = await cartService.updateCart(
          req.user.id,
          body,
        );

        res.send({ data: cart, error: null });
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
    })
    .delete("/", isAdmin, async (req: Request, res: Response) => {
      try {
        const data = await cartService.removeCart(req.user.id);

        res.send({ data, error: null });
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
    })
    .post("/checkout", async (req: Request, res: Response) => {
      try {
        const order = await ordersService.createOrder(req.user.id);

        res.send({ data: order, error: null });
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
