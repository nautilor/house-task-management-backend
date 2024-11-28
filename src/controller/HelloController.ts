import express, { Router } from "express";

export const HELLO_BASE_PATH = "/hello";

const HelloRoute = () => {
  const router = Router();

  router.get("/", (_, res) => {
    res.json({ Hello: "World!" });
  });

  return router;
};

export default HelloRoute;
