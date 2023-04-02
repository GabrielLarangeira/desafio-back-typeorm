import AppDataSource from "../../data-source";
import User from "../../entities/user.entity";
import Contact from "../../entities/contact.entity";
import { AppError } from "../../errors/AppError";
import {
  IContactRequest,
  IContactResponse,
} from "../../interfaces/contact.interface"
import { contactResponseSerializer } from "../../serializers/contacts.schemas"

const createContactService = async (
  contactData: IContactRequest,
  idUser: string
): Promise<IContactResponse> => {
  const userRepository = AppDataSource.getRepository(User);

  const user = await userRepository.findOneBy({
    id: idUser,
  });

  if (!user) {
    throw new AppError("user does not exist", 404);
  }

  const contactRepository = AppDataSource.getRepository(Contact);

  const createContact = contactRepository.create({
    ...contactData,
    user: user,
  });

  await contactRepository.save(createContact);

  const createdContactResponse = await contactResponseSerializer.validate(
    createContact,
    { stripUnknown: true }
  );

  return createdContactResponse;
};

export default createContactService;