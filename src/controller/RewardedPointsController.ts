
import { RewardedPointsMiddleware } from "@middleware/RewardedPointsMiddleware";
import RewardedPoints from "@model/RewardedPoints";
import { RewardedPointsParams } from "@param/RewardedPointsParams";
import { Router, Request } from "express";

const REWARDEDPOINTS_BASE_PATH = "/rewardedpointss";

const rewardedpointsRoute = () => {
  const router = Router();
  type FindRequest = Request<{}, any, any, RewardedPointsParams>;

  router.get("/", async (req: FindRequest, res, next) => {
    try {
      const rewardedpointss: RewardedPoints[] = await RewardedPointsMiddleware.find(req.query);
      res.send(rewardedpointss);
    } catch (e) {
      next(e);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const rewardedpoints: RewardedPoints = req.body;
      const newRewardedPoints = await RewardedPointsMiddleware.create(rewardedpoints);
      res.send(newRewardedPoints);
    } catch (e) {
      next(e);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const rewardedpoints: RewardedPoints = await RewardedPointsMiddleware.findOne(id);
      res.send(rewardedpoints);
    } catch (e) {
      next(e);
    }
  });

  router.post("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const data: RewardedPoints = req.body;
      const rewardedpoints: RewardedPoints = await RewardedPointsMiddleware.update(id, data);
      res.send(rewardedpoints);
    } catch (e) {
      next(e);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const name = await RewardedPointsMiddleware.delete(id);
      res.json({ message: `Succesfully removed rewardedpoints: ${name}` });
    } catch (e) {
      next(e);
    }
  });

  return router;
};

export { REWARDEDPOINTS_BASE_PATH, rewardedpointsRoute };
