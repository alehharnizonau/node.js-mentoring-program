import {HTTP_STATUSES} from "../utils";
import {User} from "../models";
import {IUser} from "../types";

export const usersRepository = {
    findById: (userId: string) => new Promise<IUser>(async (resolve, reject) => {
        try {
            const user = await User.findOne({_id: userId});
            if (user) {
                resolve(user)
            } else {
                reject({
                    status: HTTP_STATUSES.Unauthorized,
                    message: 'User is not authorized'
                });
            }
        } catch (err) {
            reject({
                status: HTTP_STATUSES.Unauthorized,
                message: 'User is not authorized'
            });
        }
    })
}