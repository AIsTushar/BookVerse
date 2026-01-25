import { Request } from "express";
import { prisma } from "../../../utils/prisma";
import QueryBuilder from "../../../utils/queryBuilder";
import {
  authorFilterFields,
  authorInclude,
  authorNestedFilters,
  authorRangeFilter,
  authorSearchFields,
  authorMultiSelectNestedArrayFilters,
  authorArrayFilterFields,
  authorSelect,
} from "./author.constant";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../error/ApiErrors";
import { Prisma } from "@prisma/client";
import { deleteFromCloudinary, getImageUrl } from "../../helper/cloudinary";
import { generateSlugFromFields } from "../../../utils/slugify";

const createAuthor = async (req: Request) => {
  const payload = req.body;
  const image = req.file;
  if (image) {
    payload.image = image && (await getImageUrl(image));
  }
  payload.slug = await generateSlugFromFields(payload, ["name"], prisma.author);
  const author = await prisma.author.create({ data: payload });
  return author;
};

const getAuthors = async (req: Request) => {
  const queryBuilder = new QueryBuilder(req.query, prisma.author);
  const results = await queryBuilder
    .filter(authorFilterFields)
    .search(authorSearchFields)
    .sort()
    .paginate()
    //.select(authorSelect)
    //.include(authorInclude)
    .fields()
    .filterByRange(authorRangeFilter)
    .execute();

  const meta = await queryBuilder.countTotal();
  return { data: results, meta };
};

const getAuthorBySlug = async (slug: string) => {
  return prisma.author.findUnique({
    where: { slug },
    include: {
      products: {
        select: {
          id: true,
          title: true,
          slug: true,
          price: true,
          images: true,
          stock: true,
          category: {
            select: {
              id: true,
              name: true,
              slug: true,
            },
          },
        },
      },
    },
  });
};

const updateAuthor = async (req: Request) => {
  const { id } = req.params;
  const data = req.body;

  const whereClause: Prisma.AuthorWhereUniqueInput = {
    id,
  };

  const existing = await prisma.author.findUnique({ where: whereClause });
  if (!existing) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `Author not found with this id: ${id}`,
    );
  }

  if (data.name) {
    data.slug = await generateSlugFromFields(
      { name: data.name },
      ["name"],
      prisma.author,
    );
  }

  const image = req.file;
  if (image) {
    data.image = image && (await getImageUrl(image));
    if (existing.image) {
      await deleteFromCloudinary(existing.image);
    }
  }

  return prisma.author.update({
    where: whereClause,
    data: {
      ...data,
    },
  });
};

const deleteAuthor = async (req: Request) => {
  const existing = await prisma.author.findUnique({
    where: { id: req.params.id },
    select: {
      image: true,
      products: {
        select: {
          id: true,
        },
      },
    },
  });

  if (!existing) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `Author not found with this id: ${req.params.id}`,
    );
  }

  if (existing.products.length > 0) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Author has products");
  }

  if (existing.image) {
    await deleteFromCloudinary(existing.image);
  }
  await prisma.author.delete({ where: { id: req.params.id } });

  return true;
};

export const AuthorServices = {
  getAuthors,
  getAuthorBySlug,
  updateAuthor,
  deleteAuthor,
  createAuthor,
};
