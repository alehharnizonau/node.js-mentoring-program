import {usersRepository} from "../repositories/users.repository";

export const usersService = {
    getUser: (id: string) => usersRepository.findById(id)
}