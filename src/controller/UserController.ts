import User from "@/model/User";
import { UserRepository } from "@/repository/UserRepository";
import { Router } from "express";

const USER_BASE_PATH = "/users";

const userRoute = () => {
  const router = Router();

  router.get("/", async (req, res) => {
    const users: User[] = await UserRepository.find({ order: { name: "ASC" } });
    res.send(users);
  });

  router.post("/", async (req, res) => {
    const user: User = await UserRepository.save(req.body);
    res.send(user);
  });

  router.get("/:id", async (req, res) => {
    const id: string = req.params.id;
    const user: User | null = await UserRepository.findOneBy({ id });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    res.send(user);
  });

  router.post("/:id", async (req, res) => {
    const id: string = req.params.id;
    const user: User | null = await UserRepository.findOneBy({ id });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    await UserRepository.save({ ...user, ...req.body });
    res.send(user);
  });

  router.delete("/:id", async (req, res) => {
    const id: string = req.params.id;
    const user: User | null = await UserRepository.findOneBy({ id });
    if (!user) {
      res.status(404).send("User not found");
      return;
    }
    await UserRepository.remove(user);
    res.send("User deleted");
  });

  return router;
};

export { USER_BASE_PATH, userRoute };
