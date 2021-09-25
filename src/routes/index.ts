import express from "express";
import UserRouter from "./user.router";
import ArticleRouter from "./article.router";

const router = express.Router();

router.use("/users", UserRouter);
router.use("/articles", ArticleRouter);

export default router;
