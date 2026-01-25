import { Request } from "express";
import { prisma } from "../../../utils/prisma";
import QueryBuilder from "../../../utils/queryBuilder";
import {
  productFilterFields,
  productInclude,
  productNestedFilters,
  productRangeFilter,
  productSearchFields,
  productMultiSelectNestedArrayFilters,
  productArrayFilterFields,
  productSelect,
} from "./product.constant";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../error/ApiErrors";
import { Prisma } from "@prisma/client";
import {
  deleteManyFromCloudinary,
  getImageUrls,
} from "../../helper/cloudinary";
import { generateSlugFromFields } from "../../../utils/slugify";

const createProduct = async (req: Request) => {
  const payload = req.body;

  const category = await prisma.category.findUnique({
    where: { id: payload.categoryId },
  });
  if (!category) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Category not found with this id: ${payload.categoryId}`,
    );
  }

  const author = await prisma.author.findUnique({
    where: { id: payload.authorId },
  });
  if (!author) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Author not found!");
  }

  let imageUrls: string[] = [];
  const files = req.files as Express.Multer.File[] | undefined;

  if (files && files.length > 0) {
    imageUrls = await getImageUrls(files);
  }

  payload.images = imageUrls;

  payload.slug = await generateSlugFromFields(
    payload,
    ["title"],
    prisma.product,
  );

  const product = await prisma.product.create({ data: payload });

  return product;
};

const getProducts = async (req: Request) => {
  const queryBuilder = new QueryBuilder(req.query, prisma.product);
  const results = await queryBuilder
    .filter(productFilterFields)
    .search(productSearchFields)
    .arrayFieldHasSome(productArrayFilterFields)
    .multiSelectNestedArray(productMultiSelectNestedArrayFilters)
    .nestedFilter(productNestedFilters)
    .sort()
    .paginate()
    //.select(productSelect)
    .include(productInclude)
    .fields()
    .filterByRange(productRangeFilter)
    .execute();

  const meta = await queryBuilder.countTotal();
  return { data: results, meta };
};

const getProductBySlug = async (slug: string) => {
  return prisma.product.findUnique({ where: { slug } });
};

const updateProduct = async (req: Request) => {
  const { id } = req.params;
  const data = req.body;

  const whereClause: Prisma.ProductWhereUniqueInput = {
    id,
  };

  const existing = await prisma.product.findUnique({ where: whereClause });
  if (!existing) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `Product not found with this id: ${id}`,
    );
  }

  if (data.title) {
    data.slug = await generateSlugFromFields(
      {
        title: data.title ?? existing.title,
      },
      ["title"],
      prisma.product,
    );
  }

  if (data.categoryId) {
    const categoryExists = await prisma.category.findUnique({
      where: { id: data.categoryId },
    });

    if (!categoryExists) {
      throw new ApiError(400, "Invalid category");
    }
  }

  const files = req.files as Express.Multer.File[] | undefined;

  if (files && files.length > 0) {
    const imageUrls = await getImageUrls(files);
    data.images = [...existing.images, ...imageUrls];
  }

  return prisma.product.update({
    where: whereClause,
    data: {
      ...data,
    },
  });
};

const deleteProduct = async (req: Request) => {
  const existing = await prisma.product.findUnique({
    where: { id: req.params.id },
    select: {
      images: true,
    },
  });
  if (!existing) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `Product not found with this id: ${req.params.id}`,
    );
  }

  if (existing.images.length > 0) {
    await deleteManyFromCloudinary(existing.images);
  }

  await prisma.product.delete({ where: { id: req.params.id } });
};

export const ProductServices = {
  getProducts,
  getProductBySlug,
  updateProduct,
  deleteProduct,
  createProduct,
};
