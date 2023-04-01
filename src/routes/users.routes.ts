import { Router } from "express";
import ensureDataIsValidMiddleware from "../middlewares/ensureDataIsValid.middleware";
import { userLoginSerializer, userSerializer, userUpdateSerializer } from "../serializers/user.schemas";
import { createUserController, deleteUserController, getUserController, listUsersController, loginUserController, updateUserController } from "../controllers/users.controllers";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";



export const userRoutes = Router();

userRoutes.post("/login", ensureDataIsValidMiddleware(userLoginSerializer), loginUserController)
userRoutes.post("", ensureDataIsValidMiddleware(userSerializer), createUserController)
userRoutes.get("", listUsersController)
userRoutes.get("/:id", ensureAuthMiddleware, getUserController)
userRoutes.patch("/:id", ensureAuthMiddleware, ensureDataIsValidMiddleware(userUpdateSerializer), updateUserController)
userRoutes.delete("/:id", ensureAuthMiddleware, deleteUserController)
