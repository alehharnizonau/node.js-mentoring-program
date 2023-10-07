import { Request, Router } from "express";
import { HTTP_STATUSES, schema } from "../utils";
import { cartService } from "../services/cart.service";

interface UserRequest extends Request {
  user?: {
    id: string;
  }
}

export const getCartRoutes = (router: Router) =>
  router.get('/', async (req: UserRequest, res) => {
    try {
      const userId = req?.user?.id;
      if (userId) {
        const cart = await cartService.getCart(userId);

        res.send({ data: cart, error: null });
      }
    } catch (err) {
      res.status(HTTP_STATUSES.ServerError).json({
        data: null,
        error: { message: err },
      });
    }
  })
    .put('/', async (req: UserRequest, res) => {
      try {
        const userId = req?.user?.id;
        if (userId) {
          const { body } = req;
          const { error } = schema.validate(body, { abortEarly: false });
          if (error) {
            const message = error?.details.map((detail) => detail.message.replace(/[^\w\s]/gi, '')).toString();
            return res.status(HTTP_STATUSES.BadRequest).json({
              data: null,
              error: { message },
            });
          }

          const cart = await cartService.updateCart(userId, body);
          res.send({ data: cart, error: null });
        }
      } catch (err) {
        res.status(HTTP_STATUSES.ServerError).json({
          data: null,
          error: { message: err },
        });
      }
    })
;
