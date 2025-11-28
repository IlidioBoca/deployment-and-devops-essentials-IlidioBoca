import { Router } from "express";
import User from "../models/User.js";

const router = Router();

router.get("/hello", (req, res) => res.json({ message: "API MERN em produção - rota /api/hello funcionando!" }));

router.get("/users", async (req, res, next) => {
  try {
    const users = await User.find().lean();
    res.json(users);
  } catch (err) {
    next(err);
  }
});

export default router;
