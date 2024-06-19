import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, placeOrders, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/register").post(registerUser);
router.route("/logout").get(verifyJWT,logoutUser)
router.route("/login").post(loginUser);
router.route("/getUser").get(verifyJWT,getCurrentUser);
router.route("/orders").post(placeOrders);
export default router;
