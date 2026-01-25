import { Request } from "express";
import { prisma } from "../../../utils/prisma";
import QueryBuilder from "../../../utils/queryBuilder";
import {
  reviewFilterFields,
  reviewInclude,
  reviewNestedFilters,
  reviewRangeFilter,
  reviewSearchFields,
  reviewMultiSelectNestedArrayFilters,
  reviewArrayFilterFields,
  reviewSelect,
} from "./review.constant";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../error/ApiErrors";
import { Prisma } from "@prisma/client";

const createReview = async (req: Request) => {
  const userId = req.user.id;
  const payload = req.body;

  const product = await prisma.product.findUnique({
    where: { id: payload.productId },
  });

  if (!product) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `Product not found with this id: ${payload.productId}`,
    );
  }

  const existReview = await prisma.review.findFirst({
    where: {
      productId: payload.productId,
      userId,
    },
  });
  if (existReview) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "You have already reviewed this product",
    );
  }

  const review = await prisma.review.create({ data: { ...payload, userId } });

  return review;
};

const getReviews = async (req: Request) => {
  const queryBuilder = new QueryBuilder(req.query, prisma.review);
  const results = await queryBuilder
    .filter(reviewFilterFields)
    .search(reviewSearchFields)
    .arrayFieldHasSome(reviewArrayFilterFields)
    .multiSelectNestedArray(reviewMultiSelectNestedArrayFilters)
    .nestedFilter(reviewNestedFilters)
    .sort()
    .paginate()
    //.select(reviewSelect)
    //.include(reviewInclude)
    .fields()
    .filterByRange(reviewRangeFilter)
    .execute();

  const meta = await queryBuilder.countTotal();
  return { data: results, meta };
};

const getReviewById = async (id: string) => {
  return prisma.review.findUnique({ where: { id } });
};

const updateReview = async (req: Request) => {
  const { id } = req.params;
  const userId = req.user.id;
  const data = req.body;

  const whereClause: Prisma.ReviewWhereUniqueInput = {
    id,
  };

  const existing = await prisma.review.findUnique({ where: whereClause });
  if (!existing) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `Review not found with this id: ${id}`,
    );
  }

  if (existing.userId !== userId) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "You are not allowed to update this review",
    );
  }

  return prisma.review.update({
    where: whereClause,
    data: {
      ...data,
    },
  });
};

const deleteReview = async (req: Request) => {
  await prisma.review.delete({ where: { id: req.params.id } });
};

export const ReviewServices = {
  getReviews,
  getReviewById,
  updateReview,
  deleteReview,
  createReview,
};
