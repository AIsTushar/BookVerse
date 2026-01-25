import { z } from "zod";

const createAuthorSchema = z.object({
  name: z.string({
    required_error: "Name is required!",
  }),
  bio: z
    .string({
      required_error: "Bio is required!",
    })
    .optional(),
});
const updateAuthorSchema = z.object({
  name: z
    .string({
      required_error: "Name is required!",
    })
    .optional(),
  bio: z
    .string({
      required_error: "Bio is required!",
    })
    .optional(),

  isFeatured: z
    .boolean({
      required_error: "isFeatured is required!",
    })
    .optional(),

  isActive: z
    .boolean({
      required_error: "isActive is required!",
    })
    .optional(),
});

export const AuthorValidations = {
  createAuthorSchema,
  updateAuthorSchema,
};
