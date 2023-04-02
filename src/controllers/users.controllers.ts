import { Request, Response } from "express";
import { IUserLogin, IUserRequest, IUserUpdateRequest } from "../interfaces/user.interface"
import createUserService from "../services/users/createUser.service";
import getUserService from "../services/users/getUser.service";
import listUsersService from "../services/users/listUsers.service";
import updateUserService from "../services/users/updateUser.service";
import deleteUserService from "../services/users/deleteUser.service";
import loginUserService from "../services/users/loginUser.service";


const createUserController = async (req: Request, res: Response) => {
  const userData: IUserRequest = req.body;
  const newUser = await createUserService(userData);
  return res.status(201).json(newUser);
};

const loginUserController = async (req: Request, res: Response) => {
  const sessionData: IUserLogin = req.body;
  const token = await loginUserService(sessionData);
  return res.json({ token });
};

const listUsersController = async (req: Request, res: Response) => {
  const users = await listUsersService();

  return res.json(users);
};

const getUserController = async (req: Request, res: Response) => {
  const idUser = req.params.id;
  const users = await getUserService(idUser);

  return res.json(users);
};

const updateUserController = async (req: Request, res: Response) => {
  const userData: IUserUpdateRequest = req.body;
  const userIdParams = req.params.id;
  const idUser = String(req.user.id);

  const updateUser = await updateUserService(userIdParams, userData, idUser);

  return res.json(updateUser);
};

const deleteUserController = async (req: Request, res: Response) => {
  const idUserDelete = req.params.id;
  const idUser = req.user.id;
  await deleteUserService(idUserDelete, idUser);
  return res.status(204).json({});
}

export {
  createUserController,
  loginUserController,
  listUsersController,
  deleteUserController,
  updateUserController,
  getUserController,
};