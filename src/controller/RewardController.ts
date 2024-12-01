import { RewardMiddleware } from "@/middleware/RewardMiddleware";
import Reward from "@/model/Reward";
import { RewardParams } from "@/param/RewardParams";
import { Router, Request } from "express";

const REWARD_BASE_PATH = "/rewards";

const rewardRoute = () => {
  const router = Router();
  type FindRequest = Request<{}, any, any, RewardParams>;

  router.get("/", async (req: FindRequest, res, next) => {
    try {
      const rewards: Reward[] = await RewardMiddleware.find(req.query);
      res.send(rewards);
    } catch (e) {
      next(e);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const reward: Reward = req.body;
      const newReward = await RewardMiddleware.create(reward);
      res.send(newReward);
    } catch (e) {
      next(e);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const reward: Reward = await RewardMiddleware.findOne(id);
      res.send(reward);
    } catch (e) {
      next(e);
    }
  });

  router.post("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const data: Reward = req.body;
      const reward: Reward = await RewardMiddleware.update(id, data);
      res.send(reward);
    } catch (e) {
      next(e);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const name = await RewardMiddleware.delete(id);
      res.json({ message: `Succesfully removed reward: ${name}` });
    } catch (e) {
      next(e);
    }
  });

  return router;
};

export { REWARD_BASE_PATH, rewardRoute };
