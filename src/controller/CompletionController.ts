import Completion from "@/model/Completion";
import Task from "@/model/Task";
import User from "@/model/User";
import { CompletionRepository } from "@/repository/CompletionRepository";
import { TaskRepository } from "@/repository/TaskRepository";
import { UserRepository } from "@/repository/UserRepository";
import { Router } from "express";

const COMPLETION_BASE_PATH = "/completions";

const completionRoute = () => {
  const router = Router();

  router.get("/", async (req, res) => {
    const completions: Completion[] = await CompletionRepository.find({
      order: { timestamp: "ASC" },
    });
    res.send(completions);
  });

  router.post("/", async (req, res) => {
    const completion: Completion = await CompletionRepository.save(req.body);
    const user: User | null = await UserRepository.findOneBy({
      id: completion.user.id,
    });
    const task: Task | null = await TaskRepository.findOneBy({
      id: completion.task.id,
    });
    user!.points += task!.points;
    await UserRepository.save(user!);
    res.send(completion);
  });

  router.get("/:id", async (req, res) => {
    const id: string = req.params.id;
    const completion: Completion | null = await CompletionRepository.findOneBy({
      id,
    });
    if (!completion) {
      res.status(404).send("Completion not found");
      return;
    }
    res.send(completion);
  });

  router.post("/:id", async (req, res) => {
    const id: string = req.params.id;
    const completion: Completion | null = await CompletionRepository.findOneBy({
      id,
    });
    if (!completion) {
      res.status(404).send("Completion not found");
      return;
    }
    await CompletionRepository.save({ ...completion, ...req.body });
    res.send(completion);
  });

  router.delete("/:id", async (req, res) => {
    const id: string = req.params.id;
    const completion: Completion | null = await CompletionRepository.findOneBy({
      id,
    });
    if (!completion) {
      res.status(404).send("Completion not found");
      return;
    }
    const user: User | null = await UserRepository.findOneBy({
      id: completion.user.id,
    });
    const task: Task | null = await TaskRepository.findOneBy({
      id: completion.task.id,
    });
    user!.points -= task!.points;
    await UserRepository.save(user!);
    await CompletionRepository.remove(completion);
    res.send("Completion deleted");
  });

  return router;
};

export { COMPLETION_BASE_PATH, completionRoute };
