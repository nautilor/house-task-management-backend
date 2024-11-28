import datasource from "@/config/init";
import Task from "@/model/Task";

export const TaskRepository = datasource.getRepository(Task);
