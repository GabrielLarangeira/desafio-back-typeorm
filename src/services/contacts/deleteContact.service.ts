import AppDataSource from "../../data-source";
import Contact from "../../entities/contact.entity";
import User from "../../entities/user.entity";
import { AppError } from "../../errors/AppError";

const deleteContactService = async (
  contactId: string,
  userId: string
): Promise<object> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new AppError("Client don't exists!", 404);
  }

  const contactRepository = AppDataSource.getRepository(Contact);

  const contactVerify = await contactRepository.findOne({
    where: {
      id: contactId,
      user: { id: userId },
    },
  });

  if (!contactVerify) {
    throw new AppError("Contact not found", 404);
  }

  await contactRepository.remove(contactVerify);

  return {};
};

export default deleteContactService;