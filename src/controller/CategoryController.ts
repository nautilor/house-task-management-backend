import Category from "@/model/Category";
import { CategoryRepository } from "@/repository/CategoryRepository";
import { Router } from "express";

const CATEGORY_BASE_PATH = "/categories";

const categoryRoute = () => {
  const router = Router();

  router.get("/", async (req, res) => {
    const categorys: Category[] = await CategoryRepository.find({
      order: { name: "ASC" },
    });
    res.send(categorys);
  });

  router.post("/", async (req, res) => {
    const category: Category = await CategoryRepository.save(req.body);
    res.send(category);
  });

  router.get("/:id", async (req, res) => {
    const id: string = req.params.id;
    const category: Category | null = await CategoryRepository.findOneBy({
      id,
    });
    if (!category) {
      res.status(404).send("Category not found");
      return;
    }
    res.send(category);
  });

  router.post("/:id", async (req, res) => {
    const id: string = req.params.id;
    const category: Category | null = await CategoryRepository.findOneBy({
      id,
    });
    if (!category) {
      res.status(404).send("Category not found");
      return;
    }
    await CategoryRepository.save({ ...category, ...req.body });
    res.send(category);
  });

  router.delete("/:id", async (req, res) => {
    const id: string = req.params.id;
    const category: Category | null = await CategoryRepository.findOneBy({
      id,
    });
    if (!category) {
      res.status(404).send("Category not found");
      return;
    }
    await CategoryRepository.remove(category);
    res.send("Category deleted");
  });

  return router;
};

export { CATEGORY_BASE_PATH, categoryRoute };
