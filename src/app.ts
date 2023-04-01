import "reflect-metadata";
import express from "express";
import "express-async-errors";
import handleError from "./errors/handleError"
import cors from "cors";
import { userRoutes } from "./routes/users.routes";
import { contactRoutes } from "./routes/contacts.routes";

const app = express();

app.use(cors());

app.use(express.json());

app.use("/users", userRoutes);
app.use("/contacts", contactRoutes);

app.use(handleError);

export default app;