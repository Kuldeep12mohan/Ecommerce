import { asyncHandler } from "../utils/asyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { Product } from "../models/product.model.js";

const addProduct = asyncHandler(async (req, res) => {
  const { name, description, price, category } = req.body;
  console.log(req.body);
  const productImagePath = req.file?.path;

  if (!productImagePath) {
    throw new ApiError(401, "Product image is missing");
  }

  const productImage = await uploadOnCloudinary(productImagePath);
  if (!productImage) {
    throw new ApiError(400, "Product image uploading failed");
  }

  const product = await Product.create({
    name,
    description,
    price,
    category,
    imageUrl: productImage.url
  });

  return res.status(200).json(
    new ApiResponse(200, product, "Product uploaded successfully")
  );
});

export { addProduct };
