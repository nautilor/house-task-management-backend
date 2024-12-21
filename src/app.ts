import express, { Express } from "express";
import cors from "cors";
import routes from "@controller/index";
import { errorHandler } from "./exception/ErrorHandler";

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

export default app;
