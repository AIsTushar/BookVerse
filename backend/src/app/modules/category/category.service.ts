import { Request } from "express";
import { prisma } from "../../../utils/prisma";
import QueryBuilder from "../../../utils/queryBuilder";
import {
  categoryFilterFields,
  categoryInclude,
  categoryNestedFilters,
  categoryRangeFilter,
  categorySearchFields,
  categoryMultiSelectNestedArrayFilters,
  categoryArrayFilterFields,
  categorySelect,
} from "./category.constant";
import config from "../../../config";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../error/ApiErrors";
import { Prisma } from "@prisma/client";
import {
  deleteFromCloudinary,
  deleteManyFromCloudinary,
  getImageUrl,
} from "../../helper/cloudinary";
import { generateSlugFromFields, slugify } from "../../../utils/slugify";

const createCategory = async (req: Request) => {
  const payload = req.body;
  const conflict = await prisma.category.findFirst({
    where: {
      name: payload.name,
    },
  });

  if (conflict) {
    throw new ApiError(StatusCodes.CONFLICT, "Category already exists");
  }
  payload.slug = slugify(payload.name);
  const image = req.file;
  if (image) {
    payload.image = image && (await getImageUrl(image));
  }
  const category = await prisma.category.create({ data: payload });

  return category;
};

const getCategorys = async (req: Request) => {
  const queryBuilder = new QueryBuilder(req.query, prisma.category);
  const results = await queryBuilder
    .filter(categoryFilterFields)
    .search(categorySearchFields)
    .arrayFieldHasSome(categoryArrayFilterFields)
    .multiSelectNestedArray(categoryMultiSelectNestedArrayFilters)
    .nestedFilter(categoryNestedFilters)
    .sort()
    .paginate()
    //.select(categorySelect)
    //.include(categoryInclude)
    .fields()
    .filterByRange(categoryRangeFilter)
    .execute();

  const meta = await queryBuilder.countTotal();
  return { data: results, meta };
};

const getCategoryBySlug = async (slug: string) => {
  return prisma.category.findUnique({ where: { slug } });
};

const updateCategory = async (req: Request) => {
  const { id } = req.params;
  const data = req.body;

  const whereClause: Prisma.CategoryWhereUniqueInput = {
    id,
  };

  const existing = await prisma.category.findUnique({ where: whereClause });
  if (!existing) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `Category not found with this id: ${id}`,
    );
  }

  if (data.name) {
    const conflict = await prisma.category.findFirst({
      where: {
        name: data.name,
        id: { not: id },
      },
    });
    if (conflict) {
      throw new ApiError(StatusCodes.CONFLICT, "Category name already exists");
    }
    data.slug = slugify(data.name);
  }

  const image = req.file;
  if (image) {
    data.image = image && (await getImageUrl(image));

    if (existing.image) {
      await deleteFromCloudinary(existing.image);
    }
  }

  return prisma.category.update({
    where: whereClause,
    data: {
      ...data,
    },
  });
};

const deleteCategory = async (req: Request) => {
  const existing = await prisma.category.findUnique({
    where: { id: req.params.id },
    select: {
      image: true,
      products: true,
    },
  });
  if (!existing) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `Category not found with this id: ${req.params.id}`,
    );
  }

  if (existing.products.length > 0) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Category has products");
  }

  if (existing.image) {
    await deleteFromCloudinary(existing.image);
  }

  await prisma.category.delete({ where: { id: req.params.id } });
};

export const CategoryServices = {
  getCategorys,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
  createCategory,
};
