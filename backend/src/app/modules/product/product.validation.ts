import { z } from "zod";

const createProductSchema = z.object({
  categoryId: z.string({
    required_error: "Category is required!",
  }),
  authorId: z.string({
    required_error: "Author is required!",
  }),
  title: z.string({
    required_error: "Title is required!",
  }),
  description: z.string({
    required_error: "Description is required!",
  }),
  price: z.number({
    required_error: "Price is required!",
  }),
  stock: z.number({
    required_error: "Stock is required!",
  }),
  publisher: z
    .string({
      required_error: "Publisher is required!",
    })
    .optional(),
  isbn: z
    .string({
      required_error: "ISBN is required!",
    })
    .optional(),
});
const updateProductSchema = z.object({
  categoryId: z
    .string({
      required_error: "Category is required!",
    })
    .optional(),

  authorId: z
    .string({
      required_error: "Author is required!",
    })
    .optional(),
  title: z
    .string({
      required_error: "Title is required!",
    })
    .optional(),
  description: z
    .string({
      required_error: "Description is required!",
    })
    .optional(),
  price: z
    .number({
      required_error: "Price is required!",
    })
    .optional(),
  stock: z
    .number({
      required_error: "Stock is required!",
    })
    .optional(),
  publisher: z
    .string({
      required_error: "Publisher is required!",
    })
    .optional(),
  isbn: z
    .string({
      required_error: "ISBN is required!",
    })
    .optional(),
});

export const ProductValidations = {
  createProductSchema,
  updateProductSchema,
};
