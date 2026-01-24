import { Router } from "express";
import validateRequest from "../../middleware/validateRequest";
import { userController } from "./user.controller";
import { UserValidation } from "./user.validation";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import { parseBodyMiddleware } from "../../middleware/parseBodyData";
import { uploadSingleImage } from "../../helper/cloudinary";

const route = Router();

route.post(
  "/create",
  validateRequest(UserValidation.createValidation),
  userController.createUserController,
);

route.put(
  "/change-password",
  auth(Role.USER, Role.ADMIN),
  validateRequest(UserValidation.changePasswordValidation),
  userController.changePasswordController,
);

route.put(
  "/me",
  auth(Role.USER, Role.ADMIN),
  uploadSingleImage,
  parseBodyMiddleware,
  userController.updateUserController,
);
route.get("/me", auth(), userController.getMyProfileController);

route.post(
  "/create-modarator",
  auth(Role.ADMIN),
  userController.createModaratorController,
);

route.get("/all-users", auth(Role.ADMIN), userController.getAllUsersController);

export const userRoutes = route;
