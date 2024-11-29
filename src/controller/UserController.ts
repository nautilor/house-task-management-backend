import { UserMiddleware } from "@/middleware/UserMiddleware";
import User from "@/model/User";
import { UserParams } from "@/param/UserParams";
import { Router, Request } from "express";

const USER_BASE_PATH = "/users";

const userRoute = () => {
  const router = Router();
  type FindRequest = Request<{}, any, any, UserParams>;

  router.get("/", async (req: FindRequest, res, next) => {
    try {
      const users: User[] = await UserMiddleware.find(req.query);
      res.send(users);
    } catch (e) {
      next(e);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const user: User = req.body;
      const newUser = await UserMiddleware.create(user);
      res.send(newUser);
    } catch (e) {
      next(e);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const user: User = await UserMiddleware.findOne(id);
      res.send(user);
    } catch (e) {
      next(e);
    }
  });

  router.post("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const data: User = req.body;
      const user: User = await UserMiddleware.update(id, data);
      res.send(user);
    } catch (e) {
      next(e);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const name = await UserMiddleware.delete(id);
      res.json({ message: `Succesfully removed user: ${name}` });
    } catch (e) {
      next(e);
    }
  });

  return router;
};

export { USER_BASE_PATH, userRoute };
