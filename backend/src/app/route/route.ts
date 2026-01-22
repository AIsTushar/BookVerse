import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { CategoryRoutes } from "../modules/category/category.route";
import { ProductRoutes } from "../modules/product/product.route";

const router = Router();
const routes = [
  {
    path: "/user",
    component: userRoutes,
  },
  {
    path: "/auth",
    component: authRoutes,
  },
  {
    path: "/categories",
    component: CategoryRoutes,
  },
  {
    path: "/products",
    component: ProductRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.component));
export default router;
