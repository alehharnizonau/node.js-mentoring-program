import { Request, Response, Router } from "express";
import bcrypt from "bcryptjs";
import * as jwt from "jsonwebtoken";
import { HTTP_STATUSES } from "../utils";
import { ErrorObject } from "../types";
import { usersService } from "../services";
import logger from "../log/logger";

export const getUsersRoutes = (router: Router) =>
  router
    .post("/register", async (req: Request, res: Response) => {
      try {
        const { email, password, role } = req.body;

        if (!(email && password && role)) {
          res.status(HTTP_STATUSES.BadRequest).json({
            data: null,
            error: {
              message: "All inputs are required",
            },
          });
        }

        const oldUser = await usersService.findUser(email);
        if (oldUser) {
          return res.status(HTTP_STATUSES.AlreadyExist).json({
            data: null,
            error: {
              message: "User Already Exist. Please Login",
            },
          });
        }

        const encryptedPassword = await bcrypt.hash(password, 10);
        const user = await usersService.createUser(
          email.toLowerCase(),
          encryptedPassword,
          role,
        );
        logger.info(`User ${email} successfully registered`);
        res.status(HTTP_STATUSES.Created).send({ data: user, error: null });
      } catch (err) {
        const { status, message } = err as ErrorObject;
        logger.error("Internal Server Error");
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
    .post("/login", async (req: Request, res: Response) => {
      try {
        const { email, password } = req.body;
        if (!(email && password)) {
          return res.status(HTTP_STATUSES.BadRequest).json({
            data: null,
            error: {
              message: "All inputs are required",
            },
          });
        }

        const user = await usersService.findUser(email);
        if (user && (await bcrypt.compare(password, user.password))) {
          const { id, email, role } = user;
          const token = jwt.sign({ id, email, role }, process.env.TOKEN_KEY!, {
            expiresIn: "2h",
          });
          logger.info(`User ${email} successfully logged in`);
          return res
            .status(HTTP_STATUSES.Ok)
            .send({ data: { token }, error: null });
        }

        res.status(HTTP_STATUSES.NotFound).json({
          data: null,
          error: {
            message: "No user with such email or password",
          },
        });
      } catch (err) {
        const { status, message } = err as ErrorObject;
        logger.error("Internal Server Error");
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
