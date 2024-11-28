import HelloRoute, { HELLO_BASE_PATH } from "@controller/HelloController";
import express from "express";

const router = express.Router();

// sample route used to test the server
router.use(HELLO_BASE_PATH, HelloRoute());

export default router;
