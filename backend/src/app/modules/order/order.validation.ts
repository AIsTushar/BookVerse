import { z } from "zod";

const createOrderSchema = z.object({
  name: z.string({
    required_error: "Name is required!",
  }),
  phone: z.string({
    required_error: "Phone is required!",
  }),
  shippingCity: z.string({
    required_error: "Shipping city is required!",
  }),
  shippingAddress: z.string({
    required_error: "Shipping address is required!",
  }),
  shippingPostal: z.string({
    required_error: "Shipping postal is required!",
  }),
  paymentMethodId: z.string({
    required_error: "Payment method is required!",
  }),
});
const updateOrderSchema = z.object({
  status: z.enum(["SHIPPED", "DELIVERED", "CANCELLED"], {
    required_error: "Status is required!",
  }),
});

export const OrderValidations = {
  createOrderSchema,
  updateOrderSchema,
};
