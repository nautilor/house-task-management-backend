import { FridgeItemMiddleware } from "@middleware/FridgeItemMiddleware";
import FridgeItem from "@model/FridgeItem";
import { FridgeItemParams } from "@param/FridgeItemParams";
import { Router, Request } from "express";

const FRIDGEITEM_BASE_PATH = "/fridge/items";

const fridgeitemRoute = () => {
  const router = Router();
  type FindRequest = Request<{}, any, any, FridgeItemParams>;

  router.get("/", async (req: FindRequest, res, next) => {
    try {
      const fridgeitems: FridgeItem[] = await FridgeItemMiddleware.find(
        req.query,
      );
      res.send(fridgeitems);
    } catch (e) {
      next(e);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const fridgeitem: FridgeItem = req.body;
      const newFridgeItem = await FridgeItemMiddleware.create(fridgeitem);
      res.send(newFridgeItem);
    } catch (e) {
      next(e);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const fridgeitem: FridgeItem = await FridgeItemMiddleware.findOne(id);
      res.send(fridgeitem);
    } catch (e) {
      next(e);
    }
  });

  router.post("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const data: FridgeItem = req.body;
      const fridgeitem: FridgeItem = await FridgeItemMiddleware.update(
        id,
        data,
      );
      res.send(fridgeitem);
    } catch (e) {
      next(e);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const name = await FridgeItemMiddleware.delete(id);
      res.json({ message: `Succesfully removed fridgeitem: ${name}` });
    } catch (e) {
      next(e);
    }
  });

  return router;
};

export { FRIDGEITEM_BASE_PATH, fridgeitemRoute };
