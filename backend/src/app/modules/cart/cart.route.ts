import { Router } from "express";
import { CartControllers } from "./cart.controller";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import validateRequest from "../../middleware/validateRequest";
import { CartValidations } from "./cart.validation";
const router = Router();

router
  .route("/")
  .post(
    auth(Role.USER),
    validateRequest(CartValidations.createCartSchema),
    CartControllers.createCart,
  )
  .get(auth(), CartControllers.getCarts)
  .delete(auth(), CartControllers.clearCart);

router
  .route("/:id")
  .get(auth(), CartControllers.editCartItem)
  .delete(auth(), CartControllers.deleteCartItem);

export const CartRoutes = router;
