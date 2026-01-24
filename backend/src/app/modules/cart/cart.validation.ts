import { z } from "zod";

const createCartSchema = z.object({
  productId: z.string({
    required_error: "Product is required!",
  }),
  quantity: z
    .number({
      required_error: "Quantity is required!",
    })
    .optional(),
});
const updateCartSchema = z.object({
  quantity: z.number({
    required_error: "Quantity is required!",
  }),
});

export const CartValidations = {
  createCartSchema,
  updateCartSchema,
};
