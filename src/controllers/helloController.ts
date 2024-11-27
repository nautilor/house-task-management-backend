import express, { Router } from "express";

export const HELLO_BASE_PATH = "/hello";

const helloRoute = () => {
  const router = Router();

  router.get("/", (req, res) => {
    res.json({ message: "Hello, World!" });
  });

  return router;
};

export default helloRoute;
