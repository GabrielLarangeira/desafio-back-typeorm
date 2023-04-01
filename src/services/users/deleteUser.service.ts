import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";



const deleteUserService = async (idUserDelete: string, idUser: string) => {
  const userRepository = AppDataSource.getRepository(User);

  if (idUserDelete !== idUser) {
    throw new AppError("You dont have permission", 403);
  }

  const user = await userRepository.findOneBy({ id: idUserDelete });

  if (!user) {
    throw new AppError("Client don't exists!", 404);
  }

  await userRepository.remove(user);

  return {}
};

export default deleteUserService;