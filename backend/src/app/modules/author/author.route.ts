import { Router } from "express";
import { AuthorControllers } from "./author.controller";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import { parseBodyMiddleware } from "../../middleware/parseBodyData";
import validateRequest from "../../middleware/validateRequest";
import { AuthorValidations } from "./author.validation";
import { uploadSingleImage } from "../../helper/cloudinary";
const router = Router();

router
  .route("/")
  .post(
    auth(Role.ADMIN),
    uploadSingleImage,
    parseBodyMiddleware,
    validateRequest(AuthorValidations.createAuthorSchema),
    AuthorControllers.createAuthor,
  )
  .get(AuthorControllers.getAuthors);

router.route("/:slug").get(AuthorControllers.getAuthorBySlug);

router
  .route("/:id")
  .put(
    auth(),
    uploadSingleImage,
    parseBodyMiddleware,
    validateRequest(AuthorValidations.updateAuthorSchema),
    AuthorControllers.updateAuthor,
  )
  .delete(auth(Role.ADMIN), AuthorControllers.deleteAuthor);

export const AuthorRoutes = router;
