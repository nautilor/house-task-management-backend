import { FridgeCategoryMiddleware } from "@middleware/FridgeCategoryMiddleware";
import FridgeCategory from "@model/FridgeCategory";
import { FridgeCategoryParams } from "@param/FridgeCategoryParams";
import { Router, Request } from "express";

const FRIDGECATEGORY_BASE_PATH = "/fridge/categories";

const fridgeCategoryRoute = () => {
  const router = Router();
  type FindRequest = Request<{}, any, any, FridgeCategoryParams>;

  router.get("/", async (req: FindRequest, res, next) => {
    try {
      const fridgeCategories: FridgeCategory[] =
        await FridgeCategoryMiddleware.find(req.query);
      res.send(fridgeCategories);
    } catch (e) {
      next(e);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const fridgeCategory: FridgeCategory = req.body;
      const newFridgeCategory =
        await FridgeCategoryMiddleware.create(fridgeCategory);
      res.send(newFridgeCategory);
    } catch (e) {
      next(e);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const fridgeCategory: FridgeCategory =
        await FridgeCategoryMiddleware.findOne(id);
      res.send(fridgeCategory);
    } catch (e) {
      next(e);
    }
  });

  router.post("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const data: FridgeCategory = req.body;
      const fridgeCategory: FridgeCategory =
        await FridgeCategoryMiddleware.update(id, data);
      res.send(fridgeCategory);
    } catch (e) {
      next(e);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const name = await FridgeCategoryMiddleware.delete(id);
      res.json({ message: `Succesfully removed fridgecategory: ${name}` });
    } catch (e) {
      next(e);
    }
  });

  return router;
};

export { FRIDGECATEGORY_BASE_PATH, fridgeCategoryRoute };
