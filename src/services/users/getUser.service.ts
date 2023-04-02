import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { IUserResponse } from "../../interfaces/user.interface"


const getUserService = async (idUser: string): Promise<any> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOne({
    where: {
      id: idUser,
    },
  });

  const { password, ...userNotPassWord } = user;

  return userNotPassWord
};

export default getUserService;
