import express, { Router } from "express";

const HELLO_BASE_PATH = "/hello";

const helloRoute = () => {
  const router = Router();

  router.get("/", (_, res) => {
    res.json({ Hello: "World!" });
  });

  return router;
};

export { HELLO_BASE_PATH, helloRoute };
