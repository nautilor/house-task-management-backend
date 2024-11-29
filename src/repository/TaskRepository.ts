import datasource from "@/config/init";
import Task from "@/model/Task";
import { Repository } from "typeorm";

export const TaskRepository: Repository<Task> = datasource.getRepository(Task);
