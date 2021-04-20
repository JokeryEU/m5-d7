import { Router } from "express";
import {
  getProducts,
  addProduct,
  modifyProduct,
  deleteProduct,
  uploadProductPic,
  getProductReviews,
  getProductsByQuery,
} from "../controllers/products.js";
import {
  // multerValidation,
  validateProduct,
  validateProductSchema,
} from "../middlewares/validation/productsValidation.js";
import multerCloudinary from "../middlewares/products/uploadfile.js";
const upload = multerCloudinary();
const router = Router();

router
  .route("/")
  .get(getProductsByQuery, getProducts)
  .post(validateProduct, addProduct);

router
  .route("/:id")
  .put(validateProductSchema, modifyProduct)
  .delete(deleteProduct);

router.route("/:id/upload").post(upload, uploadProductPic);

router.route("/:id/reviews").get(getProductReviews);

export default router;
