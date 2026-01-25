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
  reviewSelect

} from "./review.constant";
import config from "../../../config";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../error/ApiErrors";
import { Prisma } from "@prisma/client";


const createReview = async (req: Request) => {
	const payload = req.body;

	const review = await prisma.review.create({ data: payload });

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
	const data= req.body;
	const user = req.user;
	const role = user?.role;

	const whereClause: Prisma.ReviewWhereUniqueInput = {
		id,
		...(role === "-----" ? { userId: user.id } : {}),
	};

	const existing = await prisma.review.findUnique({ where: whereClause });
	if (!existing) {
		throw new ApiError(StatusCodes.NOT_FOUND, `Review not found with this id: ${id}`);
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
	createReview
};