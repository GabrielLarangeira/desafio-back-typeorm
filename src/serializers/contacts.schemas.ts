import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IContactRequest,
  IContactResponse,
  IContactUpdateRequest,
} from "../interfaces/contact.interface"

const contactRequestSerializer: SchemaOf<IContactRequest> = yup.object().shape({
  fullName: yup.string().max(200).required(),
  email: yup.string().email().max(100).required(),
  phone: yup.string().max(11).required(),
});

const contactResponseSerializer: SchemaOf<IContactResponse> = yup.object().shape({
  id: yup.string().notRequired(),
  fullName: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  phone: yup.string().notRequired(),
  createdAt: yup.string().notRequired(),
  userId: yup.string().notRequired(),
});

const contactUpdateSerializer: SchemaOf<IContactUpdateRequest> = yup.object().shape({
  fullName: yup.string().max(200).notRequired(),
  email: yup.string().email().max(100).notRequired(),
  phone: yup.string().max(11).notRequired(),
});

export {
  contactRequestSerializer,
  contactResponseSerializer,
  contactUpdateSerializer,
};