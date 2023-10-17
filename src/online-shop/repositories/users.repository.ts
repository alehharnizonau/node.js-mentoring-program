import {HTTP_STATUSES} from "../utils";
import {User} from '../types'
import {DI} from "../index";

export const usersRepository = {
    findById: (userId: string) => new Promise<User>(async (resolve, reject) => {
        const user = await DI.userRepository.findOne(userId);
        if (user) {
            resolve(user)
        } else {
            reject({
                status: HTTP_STATUSES.Unauthorized,
                message: 'User is not authorized'
            });
        }
    })
}