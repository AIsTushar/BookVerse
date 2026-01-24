import { Role } from "@prisma/client";
import { Router } from "express";
import auth from "../../middleware/auth";
import { DashboardControllers } from "./dashboard.controller";
const router = Router();

router.route("/stats").get(auth(Role.ADMIN), DashboardControllers.getStats);

export const DashboardRoutes = router;
