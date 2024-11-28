import Task from "@/model/Task";
import { TaskRepository } from "@/repository/TaskRepository";
import { Router } from "express";

const TASK_BASE_PATH = "/tasks";

const taskRoute = () => {
  const router = Router();

  router.get("/", async (req, res) => {
    const tasks: Task[] = await TaskRepository.find({
      order: { name: "ASC" },
    });
    res.send(tasks);
  });

  router.post("/", async (req, res) => {
    const task: Task = await TaskRepository.save(req.body);
    res.send(task);
  });

  router.get("/:id", async (req, res) => {
    const id: string = req.params.id;
    const task: Task | null = await TaskRepository.findOneBy({
      id,
    });
    if (!task) {
      res.status(404).send("Task not found");
      return;
    }
    res.send(task);
  });

  router.post("/:id", async (req, res) => {
    const id: string = req.params.id;
    const task: Task | null = await TaskRepository.findOneBy({
      id,
    });
    if (!task) {
      res.status(404).send("Task not found");
      return;
    }
    await TaskRepository.save({ ...task, ...req.body });
    res.send(task);
  });

  router.delete("/:id", async (req, res) => {
    const id: string = req.params.id;
    const task: Task | null = await TaskRepository.findOneBy({
      id,
    });
    if (!task) {
      res.status(404).send("Task not found");
      return;
    }
    await TaskRepository.remove(task);
    res.send("Task deleted");
  });

  return router;
};

export { TASK_BASE_PATH, taskRoute };
