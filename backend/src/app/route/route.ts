import { Router } from "express";
import { userRoutes } from "../modules/user/user.routes";
import { authRoutes } from "../modules/auth/auth.routes";
import { CategoryRoutes } from "../modules/category/category.route";
import { ProductRoutes } from "../modules/product/product.route";
import { CartRoutes } from "../modules/cart/cart.route";
import { OrderRoutes } from "../modules/order/order.route";
import { DashboardRoutes } from "../modules/dashboard/dashboard.route";
import { WishlistRoutes } from "../modules/wishlist/wishlist.route";
import { AuthorRoutes } from "../modules/author/author.route";

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
    path: "/authors",
    component: AuthorRoutes,
  },
  {
    path: "/products",
    component: ProductRoutes,
  },
  {
    path: "/carts",
    component: CartRoutes,
  },
  {
    path: "/orders",
    component: OrderRoutes,
  },
  {
    path: "/wishlists",
    component: WishlistRoutes,
  },
  {
    path: "/dashboard",
    component: DashboardRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.component));
export default router;
