import { IContactResponse } from "./contact.interface"

export interface IUserRequest {
  fullName: string;
  email: string;
  password: string;
  phone: string;
}

export interface IUserResponse {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  createdAt: Date;
  contacts: Array<IContactResponse> | [];
}

export interface IUserLogin {
  email: string;
  password: string;
}

export interface IUserUpdateRequest {
  fullName?: string;
  email?: string;
  phone?: string;
  password?: string;
}