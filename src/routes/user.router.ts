import express from "express";
import UserController from "../controllers/user.controller";
import {UserRepository} from "../repositories/user.repository";
import {UserService} from "../service/user.service";

const router = express.Router();
const userRepository = new UserRepository();
const userService = new UserService(userRepository);

router.get("/", async (_req, res) => {
  const controller = new UserController(userService);
  const response = await controller.getUsers();
  return res.send(response);
});

router.post("/", async (req, res) => {
  const controller = new UserController(userService);
  const response = await controller.createUser(req.body);
  return res.send(response);
});

router.get("/:id", async (req, res) => {
  const controller = new UserController(userService);
  const response = await controller.getUser(req.params.id);
  if (!response) res.status(404).send({ message: "No user found" });
  return res.send(response);
});

export default router;
