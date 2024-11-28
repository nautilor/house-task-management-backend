import datasource from "@config/init";
import express, { Express } from "express";
import cors from "cors";
import routes from "@controller/index";

datasource
  .initialize()
  .then(() => console.log("Connected to the database"))
  .catch((err: Error) => console.error(err));

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
