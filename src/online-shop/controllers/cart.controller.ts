import {Request, Router} from "express";
import {HTTP_STATUSES, schema} from "../utils";
import {cartService} from "../services/cart.service";
import {ordersService} from "../services/orders.service";
import {ErrorObject, ResponseCart} from "../types";

interface UserRequest extends Request {
    user?: {
        id: string;
    }
}

export const getCartRoutes = (router: Router) =>
    router.get('/', async (req: UserRequest, res) => {
        try {
            const userId = String(req.user?.id);
            const cart: ResponseCart = await cartService.getCart(userId);
            res.send({data: cart, error: null});
        } catch (err) {
            res.status(HTTP_STATUSES.ServerError).json({
                data: null,
                error: {message: err},
            });
        }
    })
        .put('/', async (req: UserRequest, res) => {
            try {
                const userId = String(req.user?.id);
                const {body} = req;
                const {error} = schema.validate(body, {abortEarly: false});
                if (error) {
                    const message = error?.details.map((detail) => detail.message.replace(/[^\w\s]/gi, '')).toString();
                    return res.status(HTTP_STATUSES.BadRequest).json({
                        data: null,
                        error: {message},
                    });
                }

                const cart: ResponseCart = await cartService.updateCart(userId, body);
                res.send({data: cart, error: null});
            } catch (err) {
                const {status, message} = err as ErrorObject;
                res.status(err instanceof Error ? HTTP_STATUSES.ServerError : status).json({
                    data: null,
                    error: {
                        message: err instanceof Error ? err.message : message,
                    },
                });
            }
        })
        .delete('/', async (req: UserRequest, res) => {
            try {
                const userId = String(req.user?.id);
                const data = await cartService.removeCart(userId);
                res.send({data, error: null});
            } catch (err) {
                res.status(HTTP_STATUSES.ServerError).json({
                    data: null,
                    error: {message: err},
                });
            }
        })
        .post('/checkout', async (req: UserRequest, res) => {
            try {
                const userId = String(req.user?.id);

                const order = await ordersService.createOrder(userId);
                res.send({data: order, error: null});
            } catch (err) {
                res.status(HTTP_STATUSES.ServerError).json({
                    data: null,
                    error: {message: err},
                });
            }
        })
;
