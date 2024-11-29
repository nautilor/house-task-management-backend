import { CompletionMiddleware } from "@/middleware/CompletionMiddleware";
import Completion from "@/model/Completion";
import { CompletionParams } from "@/param/CompletionParams";
import { Router, Request } from "express";

const COMPLETION_BASE_PATH = "/completions";

const completionRoute = () => {
  const router = Router();
  type FindRequest = Request<{}, any, any, CompletionParams>;

  router.get("/", async (req: FindRequest, res, next) => {
    try {
      const completions: Completion[] = await CompletionMiddleware.find(
        req.query,
      );
      res.send(completions);
    } catch (e) {
      next(e);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const completion: Completion = req.body;
      const newCompletion = await CompletionMiddleware.create(completion);
      res.send(newCompletion);
    } catch (e) {
      next(e);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const completion: Completion = await CompletionMiddleware.findOne(id);
      res.send(completion);
    } catch (e) {
      next(e);
    }
  });

  router.post("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const data: Completion = req.body;
      const completion: Completion = await CompletionMiddleware.update(
        id,
        data,
      );
      res.send(completion);
    } catch (e) {
      next(e);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const deleted = await CompletionMiddleware.delete(id);
      res.json({ message: `Succesfully removed completion: ${deleted}` });
    } catch (e) {
      next(e);
    }
  });

  return router;
};

export { COMPLETION_BASE_PATH, completionRoute };
