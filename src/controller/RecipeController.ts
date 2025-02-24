
import { RecipeMiddleware } from "@middleware/RecipeMiddleware";
import Recipe from "@model/Recipe";
import { RecipeParams } from "@param/RecipeParams";
import { Router, Request } from "express";

const RECIPE_BASE_PATH = "/recipes";

const recipeRoute = () => {
  const router = Router();
  type FindRequest = Request<{}, any, any, RecipeParams>;

  router.get("/", async (req: FindRequest, res, next) => {
    try {
      const recipes: Recipe[] = await RecipeMiddleware.find(req.query);
      res.send(recipes);
    } catch (e) {
      next(e);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const recipe: Recipe = req.body;
      const newRecipe = await RecipeMiddleware.create(recipe);
      res.send(newRecipe);
    } catch (e) {
      next(e);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const recipe: Recipe = await RecipeMiddleware.findOne(id);
      res.send(recipe);
    } catch (e) {
      next(e);
    }
  });

  router.post("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const data: Recipe = req.body;
      const recipe: Recipe = await RecipeMiddleware.update(id, data);
      res.send(recipe);
    } catch (e) {
      next(e);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const name = await RecipeMiddleware.delete(id);
      res.json({ message: `Succesfully removed recipe: ${name}` });
    } catch (e) {
      next(e);
    }
  });

  return router;
};

export { RECIPE_BASE_PATH, recipeRoute };
