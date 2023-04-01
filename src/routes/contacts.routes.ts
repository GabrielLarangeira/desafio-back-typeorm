import { Router } from "express";
import ensureAuthMiddleware from "../middlewares/ensureAuth.middleware";
import { createContactController, deleteContactController, updateContactController } from "../controllers/contact.controllers";



export const contactRoutes = Router();

contactRoutes.post("", ensureAuthMiddleware, createContactController)
contactRoutes.patch("", ensureAuthMiddleware, updateContactController)
contactRoutes.delete("", ensureAuthMiddleware, deleteContactController)
