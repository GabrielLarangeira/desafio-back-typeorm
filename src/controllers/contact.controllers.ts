import { Request, Response } from "express";
import createContactService from "../services/contacts/createContact.service";
import updateContactService from "../services/contacts/updateContact.service";
import deleteContactService from "../services/contacts/deleteContact.service";
import {
  IContactRequest,
  IContactUpdateRequest,
} from "../interfaces/contact.interface"

const createContactController = async (req: Request, res: Response) => {
  const contactData: IContactRequest = req.body;
  const newContact = await createContactService(contactData, req.user.id);
  return res.status(201).json(newContact);
};

const updateContactController = async (req: Request, res: Response) => {
  const contactData: IContactUpdateRequest = req.body;
  const idContact = req.params.id;
  const idUser = String(req.user.id);

  const updateContact = await updateContactService(contactData, idContact, idUser);

  return res.json(updateContact);
};

const deleteContactController = async (req: Request, res: Response) => {
  const idContact = req.params.id;
  const idUser = String(req.user.id);
  await deleteContactService(idContact, idUser);
  return res.status(204).json({});
};

export {
  createContactController,
  updateContactController,
  deleteContactController,
};