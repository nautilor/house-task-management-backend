import datasource from "@config/init";
import express, { Express } from "express";
import cors from "cors";
import routes from "@controller/index";
import { errorHandler } from "./exception/ErrorHandler";

datasource
  .initialize()
  .then(() => console.log("Connected to the database"))
  .catch((err: Error) => console.error(err));

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(routes);
app.use(errorHandler);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
