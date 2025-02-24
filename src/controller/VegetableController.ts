
import { VegetableMiddleware } from "@middleware/VegetableMiddleware";
import Vegetable from "@model/Vegetable";
import { VegetableParams } from "@param/VegetableParams";
import { Router, Request } from "express";

const VEGETABLE_BASE_PATH = "/vegetables";

const vegetableRoute = () => {
  const router = Router();
  type FindRequest = Request<{}, any, any, VegetableParams>;

  router.get("/", async (req: FindRequest, res, next) => {
    try {
      const vegetables: Vegetable[] = await VegetableMiddleware.find(req.query);
      res.send(vegetables);
    } catch (e) {
      next(e);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const vegetable: Vegetable = req.body;
      const newVegetable = await VegetableMiddleware.create(vegetable);
      res.send(newVegetable);
    } catch (e) {
      next(e);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const vegetable: Vegetable = await VegetableMiddleware.findOne(id);
      res.send(vegetable);
    } catch (e) {
      next(e);
    }
  });

  router.post("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const data: Vegetable = req.body;
      const vegetable: Vegetable = await VegetableMiddleware.update(id, data);
      res.send(vegetable);
    } catch (e) {
      next(e);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const name = await VegetableMiddleware.delete(id);
      res.json({ message: `Succesfully removed vegetable: ${name}` });
    } catch (e) {
      next(e);
    }
  });

  return router;
};

export { VEGETABLE_BASE_PATH, vegetableRoute };
