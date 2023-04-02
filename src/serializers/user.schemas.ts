import * as yup from "yup";
import { SchemaOf } from "yup";
import {
  IUserRequest,
  IUserResponse,
  IUserLogin,
  IUserUpdateRequest
} from "../interfaces/user.interface"
import { contactResponseSerializer } from "./contacts.schemas";

const userSerializer: SchemaOf<IUserRequest> = yup.object().shape({
  fullName: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(8).required(),
  phone: yup.string().min(10).required()
});

const userWithoutPasswordSerializer: SchemaOf<IUserResponse> = yup.object().shape({
  id: yup.string().notRequired(),
  fullName: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  password: yup.string().min(8).notRequired(),
  phone: yup.string().min(11).notRequired(),
  createdAt: yup.date().notRequired(),
  contacts: yup.array(contactResponseSerializer)
});

const userLoginSerializer: SchemaOf<IUserLogin> = yup.object().shape({
  email: yup.string().email().notRequired(),
  password: yup.string().notRequired(),
});

const userUpdateSerializer: SchemaOf<IUserUpdateRequest> = yup.object().shape({
  fullName: yup.string().notRequired(),
  email: yup.string().email().notRequired(),
  phone: yup.string().min(11).notRequired(),
  password: yup.string().min(8).notRequired(),
});

export {
  userSerializer,
  userWithoutPasswordSerializer,
  userLoginSerializer,
  userUpdateSerializer
}
