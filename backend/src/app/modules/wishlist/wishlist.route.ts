import { Router } from "express";
import { WishlistControllers } from "./wishlist.controller";
import auth from "../../middleware/auth";

const router = Router();

router.route("/").get(auth(), WishlistControllers.getWishlists);

router
  .route("/:id")
  .post(auth(), WishlistControllers.createWishlist)
  .delete(auth(), WishlistControllers.deleteWishlist);

export const WishlistRoutes = router;
