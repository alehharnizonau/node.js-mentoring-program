import {usersRepository} from "../repositories";

export const usersService = {
    getUser: async (userId: string): Promise<{ id: string }> => {
        const {id} = await usersRepository.findById(userId);

        return {id}
    }
}