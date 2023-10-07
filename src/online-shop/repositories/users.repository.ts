import { UserEntity, users } from "../models/user";
import { HTTP_STATUSES } from "../utils";

export const usersRepository = {
  findById: (userId: string) => new Promise<UserEntity>((resolve, reject) => {
    const user = users.find((user) => user.id === userId);
    if (user) {
      resolve(user);
    } else {
      reject({
        status: HTTP_STATUSES.Unauthorized,
        message: 'User is not authorized'
      });
    }
  })
}