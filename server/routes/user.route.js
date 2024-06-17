import { Router } from "express";
import { placeOrder } from "../controllers/user.controller.js";
const router = Router();

router.route("/orders").post(placeOrder);

export default router;