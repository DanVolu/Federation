import express from "express";
import logger from "../middlewares/logger"
import authRoutes from "./authRoutes";

const router = express.Router();

router.use("/auth", logger, authRoutes);

export default router;