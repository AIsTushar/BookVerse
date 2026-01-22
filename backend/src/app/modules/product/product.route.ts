import { Router } from "express";
import { ProductControllers } from "./product.controller";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import { parseBodyMiddleware } from "../../middleware/parseBodyData";;
import validateRequest from "../../middleware/validateRequest"
import { ProductValidations } from "./product.validation";
const router = Router();

router.route("/")
 	.post(
		auth(),
		parseBodyMiddleware,
		validateRequest(ProductValidations.createProductSchema),
		ProductControllers.createProduct
	)
  .get(ProductControllers.getProducts);

router
	.route("/:id")
	.get(ProductControllers.getProductById)
	.put(
		auth(),
		parseBodyMiddleware,
		validateRequest(ProductValidations.updateProductSchema),
	    ProductControllers.updateProduct)
	.delete(ProductControllers.deleteProduct);

export const ProductRoutes = router;