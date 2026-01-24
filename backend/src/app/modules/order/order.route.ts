import { Router } from "express";
import { OrderControllers } from "./order.controller";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import { parseBodyMiddleware } from "../../middleware/parseBodyData";
import validateRequest from "../../middleware/validateRequest";
import { OrderValidations } from "./order.validation";
const router = Router();

router
  .route("/")
  .post(auth(), OrderControllers.createOrder)
  .get(auth(Role.ADMIN), OrderControllers.getOrders);

router.route("/me").get(auth(), OrderControllers.getMyOrders);

router
  .route("/:id")
  .get(auth(), OrderControllers.getOrderById)
  .put(auth(Role.ADMIN), OrderControllers.updateOrder);

export const OrderRoutes = router;
