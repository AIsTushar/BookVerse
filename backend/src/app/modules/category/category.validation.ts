import { z } from "zod";

const createCategorySchema = z.object({
  name: z.string({
    required_error: "Name is required!",
  }),
});
const updateCategorySchema = z.object({
  name: z
    .string({
      required_error: "Name is required!",
    })
    .optional(),
});

export const CategoryValidations = {
  createCategorySchema,
  updateCategorySchema,
};
