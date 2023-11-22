import { usersRepository } from "../repositories";

export const usersService = {
  getUser: async (userId: string): Promise<{ id: string }> => {
    const { id } = await usersRepository.findById(userId);

    return { id };
  },
  findUser: async (email: string) => await usersRepository.findOne(email),
  createUser: async (userEmail: string, password: string, userRole: string) => {
    const { id, email, role } = await usersRepository.createOne(
      userEmail,
      password,
      userRole,
    );

    return { id, email, role };
  },
};
