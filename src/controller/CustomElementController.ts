import { CustomElementMiddleware } from "@middleware/CustomElementMiddleware";
import CustomElement from "@model/CustomElement";
import { CustomElementParams } from "@param/CustomElementParams";
import { Router, Request } from "express";

const CUSTOM_ELEMENT_BASE_PATH = "/elements";

const customElementRoute = () => {
  const router = Router();
  type FindRequest = Request<{}, any, any, CustomElementParams>;

  router.get("/", async (req: FindRequest, res, next) => {
    try {
      const customElements: CustomElement[] =
        await CustomElementMiddleware.find(req.query);
      res.send(customElements);
    } catch (e) {
      next(e);
    }
  });

  router.post("/", async (req, res, next) => {
    try {
      const customElement: CustomElement = req.body;
      const newCustomElement =
        await CustomElementMiddleware.create(customElement);
      res.send(newCustomElement);
    } catch (e) {
      next(e);
    }
  });

  router.get("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const customElement: CustomElement =
        await CustomElementMiddleware.findOne(id);
      res.send(customElement);
    } catch (e) {
      next(e);
    }
  });

  router.post("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const data: CustomElement = req.body;
      const customElement: CustomElement = await CustomElementMiddleware.update(
        id,
        data,
      );
      res.send(customElement);
    } catch (e) {
      next(e);
    }
  });

  router.delete("/:id", async (req, res, next) => {
    try {
      const id: string = req.params.id;
      const name = await CustomElementMiddleware.delete(id);
      res.json({ message: `Succesfully removed customElement: ${name}` });
    } catch (e) {
      next(e);
    }
  });

  return router;
};

export { CUSTOM_ELEMENT_BASE_PATH, customElementRoute };
