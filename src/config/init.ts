import dotenv from "dotenv";
import path from "path";
import { DataSource } from "typeorm";

// as a first step, we load the environment variables
dotenv.config();

// we create a new instance of the DataSource class
const datasource = new DataSource({
  type: "postgres",
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || "5432"),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  synchronize: true,
  logging: true,
  entities: [path.join("src", "model", "*.ts")],
});

export default datasource;
