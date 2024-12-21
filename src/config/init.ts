import dotenv from "dotenv";
import path from "path";
import { DataSource } from "typeorm";
import { newDb, DataType } from "pg-mem";
import { v4 } from "uuid";

// as a first step, we load the environment variables
dotenv.config();

// we create a new instance of the DataSource class
const postgresDatabase = (): DataSource =>
  new DataSource({
    type: "postgres",
    host: process.env.DB_HOST,
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: true,
    logging: false,
    entities: [path.join("src", "model", "*.ts")],
  });

const inMemoryDatabase = (): DataSource => {
  console.log("\nWarn: Using in-memory database for testing");
  const db = newDb({
    autoCreateForeignKeyIndices: true,
  });

  db.public.registerFunction({
    implementation: () => "12.20",
    name: "version",
  });

  db.public.registerFunction({
    implementation: () => "house_test",
    name: "current_database",
  });

  db.registerExtension("uuid-ossp", (schema) => {
    schema.registerFunction({
      name: "uuid_generate_v4",
      returns: DataType.uuid,
      implementation: v4,
      impure: true,
    });
  });

  const datasource: DataSource = db.adapters.createTypeormDataSource({
    type: "postgres",
    entities: [path.join("src", "model", "*.{js,ts}")],
    logging: false,
  });
  return datasource;
};

const datasource =
  process.env.NODE_ENV === "test" ? inMemoryDatabase() : postgresDatabase();

export default datasource;
