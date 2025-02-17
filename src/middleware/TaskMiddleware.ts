import { QueryParamException } from "@/exception/QueryParamException";
import Task from "@/model/Task";
import { TaskParams, TaskParamSchema } from "@/param/TaskParams";
import { TaskRepository } from "@/repository/TaskRepository";
import Ajv from "ajv";
import { CompletionMiddleware } from "@middleware/CompletionMiddleware";

class middleware {
  protected validator = new Ajv();

  buildWhere = (queryParams: TaskParams) => {
    const { categoryId } = queryParams;
    queryParams.categoryId = undefined;
    return { category: { id: categoryId }, ...queryParams };
  };

  find = async (queryParams: TaskParams): Promise<Task[]> => {
    const valid = this.validator.validate(TaskParamSchema, queryParams);
    if (!valid) {
      throw new QueryParamException(this.validator.errorsText());
    }
    const where = this.buildWhere(queryParams);
    const tasks: Task[] = await TaskRepository.find({
      where,
      order: {
        category: {
          name: "ASC",
        },
        name: "ASC",
      },
      relations: ["completions"],
    });
    for (const task of tasks) {
      task.completions = await CompletionMiddleware.findCurrentWeekForTask(
        task.id,
      );
    }
    return tasks;
  };

  create = async (data: Task): Promise<Task> => {
    return await TaskRepository.save(data);
  };

  findOne = async (id: string): Promise<Task> => {
    const task: Task | null = await TaskRepository.findOneBy({
      id,
    });
    if (!task) {
      throw new Error("Task not found with id: " + id);
    }
    task.completions = await CompletionMiddleware.findCurrentWeekForTask(
      task.id,
    );
    return task;
  };

  update = async (id: string, data: Task): Promise<Task> => {
    const task: Task = await this.findOne(id);
    return await TaskRepository.save({ ...task, ...data });
  };

  delete = async (id: string): Promise<string> => {
    const task: Task = await this.findOne(id);
    await TaskRepository.remove(task);
    return task.name;
  };
}

export const TaskMiddleware = new middleware();
