import {
  IContactResponse,
  IContactUpdateRequest,
} from "../../interfaces/contact.interface"
import AppDataSource from "../../data-source";
import Contact from "../../entities/contact.entity";
import User from "../../entities/user.entity";
import { contactResponseSerializer } from "../../serializers/contacts.schemas"
import { AppError } from "../../errors/AppError";

const updateContactService = async (
  contactData: IContactUpdateRequest,
  contactId: string,
  userId: string
): Promise<IContactResponse> => {
  const userRepository = AppDataSource.getRepository(User);
  const contactRepository = AppDataSource.getRepository(Contact);

  const user = await userRepository.findOneBy({
    id: userId,
  });

  if (!user) {
    throw new AppError("User does not exist", 404);
  }

  const contactVerify = await contactRepository.findOne({
    where: {
      id: contactId,
      user: { id: userId },
    },
  });

  if (!contactVerify) {
    throw new AppError("Contact not found", 404);
  }

  const { fullName, email, phone } = contactData;

  if (!fullName && !email && !phone) {
    throw new AppError(
      "You don't have authorization to change this fields",
      403
    );
  }

  const updateContact = contactRepository.create({
    ...contactVerify,
    fullName: fullName || contactVerify.fullName,
    email: email || contactVerify.email,
    phone: phone || contactVerify.phone,
  });

  await contactRepository.save(updateContact);

  const contactResponse = await contactResponseSerializer.validate(
    updateContact,
    {
      stripUnknown: true,
    }
  );

  return contactResponse;
};

export default updateContactService;