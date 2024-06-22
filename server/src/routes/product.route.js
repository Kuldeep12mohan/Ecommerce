import { Router } from "express";
import { addProduct } from "../controllers/product.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const router = Router();

router.route("/add-product").post(upload.single("productImage"), addProduct);

export default router;
