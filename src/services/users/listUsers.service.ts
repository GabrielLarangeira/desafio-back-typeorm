import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { IUserResponse } from "../../interfaces/user.interface"

const listUsersService = async (): Promise<any> => {
  const userRepository = AppDataSource.getRepository(User);

  const users = await userRepository.find({
    relations: {
      contacts: true,
    },
  });

  const usersNotPassword = users.map((user) => {
    const { password, ...notPassWord } = user;
    return notPassWord;
  });

  return usersNotPassword;
};

export default listUsersService;
