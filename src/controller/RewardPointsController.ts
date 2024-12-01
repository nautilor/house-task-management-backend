import { RewardedPointsMiddleware } from "@/middleware/RewardedPointsMiddleware";
import RewardedPoints from "@/model/RewardedPoints";
import { RewardedPointsParams } from "@/param/RewardedPointsParams";
import { Router, Request } from "express";

const REWARDED_POINTS_BASE_PATH = "/rewarded";

const rewardedPointsRoute = () => {
  const router = Router();
  type FindRequest = Request<{}, any, any, RewardedPointsParams>;

  router.get("/", async (req: FindRequest, res, next) => {
    try {
      const rewardedPointss: RewardedPoints[] =
        await RewardedPointsMiddleware.find(req.query);
      res.send(rewardedPointss);
    } catch (e) {
      next(e);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const rewardedPoints: RewardedPoints = req.body;
      console.log(rewardedPoints);
      const newRewardedPoints =
        await RewardedPointsMiddleware.create(rewardedPoints);
      res.send(newRewardedPoints);
    } catch (e) {
      next(e);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const rewardedPoints: RewardedPoints =
        await RewardedPointsMiddleware.findOne(id);
      res.send(rewardedPoints);
    } catch (e) {
      next(e);
    }
  });

  router.post("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const data: RewardedPoints = req.body;
      const rewardedPoints: RewardedPoints =
        await RewardedPointsMiddleware.update(id, data);
      res.send(rewardedPoints);
    } catch (e) {
      next(e);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const deleted = await RewardedPointsMiddleware.delete(id);
      res.json({ message: `Succesfully removed rewardedPoints: ${deleted}` });
    } catch (e) {
      next(e);
    }
  });

  return router;
};

export { REWARDED_POINTS_BASE_PATH, rewardedPointsRoute };
