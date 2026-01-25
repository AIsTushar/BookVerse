import { Router } from "express";
import { ReviewControllers } from "./review.controller";
import auth from "../../middleware/auth";
import { Role } from "@prisma/client";
import { parseBodyMiddleware } from "../../middleware/parseBodyData";;
import validateRequest from "../../middleware/validateRequest"
import { ReviewValidations } from "./review.validation";
const router = Router();

router.route("/")
 	.post(
		auth(),
		parseBodyMiddleware,
		validateRequest(ReviewValidations.createReviewSchema),
		ReviewControllers.createReview
	)
  .get(ReviewControllers.getReviews);

router
	.route("/:id")
	.get(ReviewControllers.getReviewById)
	.put(
		auth(),
		parseBodyMiddleware,
		validateRequest(ReviewValidations.updateReviewSchema),
	    ReviewControllers.updateReview)
	.delete(ReviewControllers.deleteReview);

export const ReviewRoutes = router;