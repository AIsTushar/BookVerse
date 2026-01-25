import { z } from "zod";

const createReviewSchema = z.object({
  productId: z.string({
    required_error: "Product is required!",
  }),

  rating: z
    .number({
      required_error: "Rating is required!",
    })
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5"),
  comment: z.string({
    required_error: "Comment is required!",
  }),
});
const updateReviewSchema = z.object({
  rating: z
    .number({
      required_error: "Rating is required!",
    })
    .min(1, "Rating must be between 1 and 5")
    .max(5, "Rating must be between 1 and 5")
    .optional(),
  comment: z
    .string({
      required_error: "Comment is required!",
    })
    .optional(),
});

export const ReviewValidations = {
  createReviewSchema,
  updateReviewSchema,
};
