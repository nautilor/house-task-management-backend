import { CategoryMiddleware } from "@/middleware/CategoryMiddleware";
import Category from "@/model/Category";
import { CategoryParams } from "@/param/CategoryParams";
import { Router, Request } from "express";

const CATEGORY_BASE_PATH = "/categories";

const categoryRoute = () => {
  const router = Router();
  type FindRequest = Request<{}, any, any, CategoryParams>;

  router.get("/", async (req: FindRequest, res, next) => {
    try {
      const categorys: Category[] = await CategoryMiddleware.find(req.query);
      res.send(categorys);
    } catch (e) {
      next(e);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const category: Category = req.body;
      const newCategory = await CategoryMiddleware.create(category);
      res.send(newCategory);
    } catch (e) {
      next(e);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const category: Category = await CategoryMiddleware.findOne(id);
      res.send(category);
    } catch (e) {
      next(e);
    }
  });

  router.post("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const data: Category = req.body;
      const category: Category = await CategoryMiddleware.update(id, data);
      res.send(category);
    } catch (e) {
      next(e);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const name = await CategoryMiddleware.delete(id);
      res.json({ message: `Succesfully removed category: ${name}` });
    } catch (e) {
      next(e);
    }
  });

  return router;
};

export { CATEGORY_BASE_PATH, categoryRoute };
