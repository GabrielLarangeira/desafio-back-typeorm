import AppDataSource from "../../data-source";
import User from "../../entities/user.entity"
import { AppError } from "../../errors/AppError";
import { IUserRequest, IUserResponse } from "../../interfaces/user.interface"
import { userWithoutPasswordSerializer } from "../../serializers/user.schemas";

const createUserService = async (
  userData: IUserRequest
): Promise<IUserResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const emailVerify = await userRepository.findOne({
    where: {
      email: userData.email,
    },
  });

  if (emailVerify) {
    throw new AppError("E-mail already registered", 409);
  }
  const phoneNumberVerify = await userRepository.findOne({
    where: {
      phone: userData.phone,
    },
  });

  if (phoneNumberVerify) {
    throw new AppError("Phone number already registered", 409);
  }

  const createdUser = userRepository.create(userData);

  await userRepository.save(createdUser);

  const userWithoutPassord = await userWithoutPasswordSerializer.validate(
    createdUser,
    {
      stripUnknown: true,
    }
  );

  return userWithoutPassord;
};

export default createUserService;
