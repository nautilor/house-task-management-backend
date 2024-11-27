import helloRoute, { HELLO_BASE_PATH } from "@controllers/helloController";
import express from "express";

const router = express.Router();

router.use(HELLO_BASE_PATH, helloRoute());

export default router;
