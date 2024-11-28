import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import routes from "@controller/index";

// load envs
dotenv.config();

const app: Express = express();
app.use(cors());
app.use(express.json());
app.use(routes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
