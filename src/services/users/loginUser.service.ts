import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import { IUserLogin } from "../../interfaces/user.interface"
import jwt from "jsonwebtoken";
import { AppError } from "../../errors/AppError";
import "dotenv/config";
import { compare } from "bcryptjs";

const loginUserService = async ({
  email,
  password,
}: IUserLogin): Promise<string> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    email: email,
  });

  if (!user) {
    throw new AppError("User or password invalid", 403);
  }

  const passwordMatch = await compare(password, user.password);

  if (!passwordMatch) {
    throw new AppError("User or password invalid", 403);
  }

  const token = jwt.sign(
    {
    },
    process.env.SECRET_KEY,
    {
      subject: user.id,
      expiresIn: "24h",
    }
  );

  return token;
};

export default loginUserService;
