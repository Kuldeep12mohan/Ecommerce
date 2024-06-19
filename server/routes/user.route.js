import { Router } from "express";
import { getCurrentUser, loginUser, logoutUser, registerUser } from "../controllers/user.controller.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";
const router = Router();
router.route("/register").post(registerUser);
router.route("/logout").get(verifyJWT,logoutUser)
router.route("/login").post(loginUser);
router.route("/getUser").get(verifyJWT,getCurrentUser);
export default router;
