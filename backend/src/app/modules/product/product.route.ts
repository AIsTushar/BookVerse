import { Router } from "express";
import { ProductControllers } from "./product.controller";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import { parseBodyMiddleware } from "../../middleware/parseBodyData";
import validateRequest from "../../middleware/validateRequest";
import { ProductValidations } from "./product.validation";
import { uploadMultipleImages } from "../../helper/cloudinary";
const router = Router();

router
  .route("/")
  .post(
    auth(Role.ADMIN),
    uploadMultipleImages,
    parseBodyMiddleware,
    validateRequest(ProductValidations.createProductSchema),
    ProductControllers.createProduct,
  )
  .get(ProductControllers.getProducts);

router.route("/:slug").get(ProductControllers.getProductBySlug);

router
  .route("/:id")
  .put(
    auth(),
    uploadMultipleImages,
    parseBodyMiddleware,
    validateRequest(ProductValidations.updateProductSchema),
    ProductControllers.updateProduct,
  )
  .delete(auth(Role.ADMIN), ProductControllers.deleteProduct);

export const ProductRoutes = router;
