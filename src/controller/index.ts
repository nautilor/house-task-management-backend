import express from "express";
import { HELLO_BASE_PATH, helloRoute } from "@controller/HelloController";
import { USER_BASE_PATH, userRoute } from "@controller/UserController";
import {
  CATEGORY_BASE_PATH,
  categoryRoute,
} from "@controller/CategoryController";
import { TASK_BASE_PATH, taskRoute } from "@controller/TaskController";
import {
  COMPLETION_BASE_PATH,
  completionRoute,
} from "@controller/CompletionController";

import { REWARD_BASE_PATH, rewardRoute } from "@controller/RewardController";
import {
  REWARDED_POINTS_BASE_PATH,
  rewardedPointsRoute,
} from "@controller/RewardPointsController";

const router = express.Router();

// sample route used to test the server
router.use(HELLO_BASE_PATH, helloRoute());
router.use(USER_BASE_PATH, userRoute());
router.use(CATEGORY_BASE_PATH, categoryRoute());
router.use(TASK_BASE_PATH, taskRoute());
router.use(COMPLETION_BASE_PATH, completionRoute());
router.use(REWARD_BASE_PATH, rewardRoute());
router.use(REWARDED_POINTS_BASE_PATH, rewardedPointsRoute());

export default router;
