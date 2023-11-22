import { HTTP_STATUSES } from "../utils";
import { User } from "../models";
import { IUser } from "../types";

export const usersRepository = {
  findById: (userId: string) =>
    new Promise<IUser>(async (resolve, reject) => {
      try {
        const user = await User.findOne({ _id: userId });
        if (user) {
          resolve(user);
        } else {
          reject({
            status: HTTP_STATUSES.Unauthorized,
            message: "User is not authorized",
          });
        }
      } catch (err) {
        reject({
          status: HTTP_STATUSES.Unauthorized,
          message: "User is not authorized",
        });
      }
    }),
  findOne: (email: string) =>
    new Promise<IUser | null>(async (resolve) => {
      const user = await User.findOne({ email });

      resolve(user);
    }),
  createOne: (email: string, password: string, role: string) =>
    new Promise<IUser>(async (resolve, reject) => {
      const user = await User.create({
        email,
        password,
        role,
      });

      if (user) {
        resolve(user);
      } else {
        reject({
          status: HTTP_STATUSES.ServerError,
          message: "Internal Server error",
        });
      }
    }),
};
