import Joi from "joi";

export enum HTTP_STATUSES {
    Ok = 200,
    Created = 201,
    NoContent = 204,
    BadRequest = 400,
    Unauthorized = 401,
    NotFound = 404,
    ServerError = 500
}

export const schema = Joi.object({
    productId: Joi.string().required(),
    count: Joi.number().integer().min(0).required(),
}).required();
