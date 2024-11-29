import { TaskMiddleware } from "@/middleware/TaskMiddleware";
import Task from "@/model/Task";
import { TaskParams } from "@/param/TaskParams";
import { Request, Router } from "express";

const TASK_BASE_PATH = "/tasks";

const taskRoute = () => {
  const router = Router();
  type FindRequest = Request<{}, any, any, TaskParams>;

  router.get("/", async (req: FindRequest, res, next) => {
    try {
      const tasks: Task[] = await TaskMiddleware.find(req.query);
      res.send(tasks);
    } catch (e) {
      next(e);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const task: Task = req.body;
      const newTask = await TaskMiddleware.create(task);
      res.send(newTask);
    } catch (e) {
      next(e);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const task: Task = await TaskMiddleware.findOne(id);
      res.send(task);
    } catch (e) {
      next(e);
    }
  });

  router.post("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const data: Task = req.body;
      const task: Task = await TaskMiddleware.update(id, data);
      res.send(task);
    } catch (e) {
      next(e);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const name = await TaskMiddleware.delete(id);
      res.json({ message: `Succesfully removed task: ${name}` });
    } catch (e) {
      next(e);
    }
  });

  return router;
};

export { TASK_BASE_PATH, taskRoute };
