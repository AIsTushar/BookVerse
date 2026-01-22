import { Router } from "express";
import { CategoryControllers } from "./category.controller";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import { parseBodyMiddleware } from "../../middleware/parseBodyData";
import validateRequest from "../../middleware/validateRequest";
import { CategoryValidations } from "./category.validation";
import { uploadSingleImage } from "../../helper/cloudinary";
const router = Router();

router
  .route("/")
  .post(
    auth(Role.ADMIN),
    uploadSingleImage,
    parseBodyMiddleware,
    validateRequest(CategoryValidations.createCategorySchema),
    CategoryControllers.createCategory,
  )
  .get(CategoryControllers.getCategorys);

router.route("/:slug").get(CategoryControllers.getCategoryBySlug);

router
  .route("/:id")
  .put(
    auth(Role.ADMIN),
    uploadSingleImage,
    parseBodyMiddleware,
    validateRequest(CategoryValidations.updateCategorySchema),
    CategoryControllers.updateCategory,
  )
  .delete(CategoryControllers.deleteCategory);

export const CategoryRoutes = router;
