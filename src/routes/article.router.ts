import express from "express";
import ArticleController from "../controllers/article.controller";

const router = express.Router();

router.get("/", async (_req, res) => {
  const controller = new ArticleController();
  const response = await controller.getArticles();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new ArticleController();
  const response = await controller.createArticle(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new ArticleController();
  const response = await controller.getArticle(req.params.id);
  if (!response) res.status(404).send({ message: "No article found" });
  return res.send(response);
});

export default router;
