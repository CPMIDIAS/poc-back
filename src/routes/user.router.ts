import express from "express";
import UserController from "../controllers/user.controller";
import { UserRepository } from "../repositories/user.repository";
import { UserService } from "../service/user.service";

const router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

router.get("/", async (_req, res) => {
  const controller = new UserController(userService);
  const response = await controller.getUsers();
  return res.status(response.status).send(response.body);
});

router.post("/", async (req, res) => {
  const controller = new UserController(userService);
  const response = await controller.createUser(req.body);
  return res.status(response.status).send(response.body);
});

router.get("/:id", async (req, res) => {
  const controller = new UserController(userService);
  const response = await controller.getUser(req.params.id);
  return res.status(response.status).send(response.body);
});

export default router;
