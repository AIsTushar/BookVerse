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
  authorSelect

} from "./author.constant";
import config from "../../../config";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../error/ApiErrors";
import { Prisma } from "@prisma/client";


const createAuthor = async (req: Request) => {
	const payload = req.body;

	const author = await prisma.author.create({ data: payload });

	return author;
};

const getAuthors = async (req: Request) => {
	const queryBuilder = new QueryBuilder(req.query, prisma.author);
	const results = await queryBuilder
		.filter(authorFilterFields)
		.search(authorSearchFields)
		.arrayFieldHasSome(authorArrayFilterFields)
    .multiSelectNestedArray(authorMultiSelectNestedArrayFilters)
		.nestedFilter(authorNestedFilters)
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

const getAuthorById = async (id: string) => {
	return prisma.author.findUnique({ where: { id } });
};

const updateAuthor = async (req: Request) => {
	const { id } = req.params;
	const data= req.body;
	const user = req.user;
	const role = user?.role;

	const whereClause: Prisma.AuthorWhereUniqueInput = {
		id,
		...(role === "-----" ? { userId: user.id } : {}),
	};

	const existing = await prisma.author.findUnique({ where: whereClause });
	if (!existing) {
		throw new ApiError(StatusCodes.NOT_FOUND, `Author not found with this id: ${id}`);
	}

	return prisma.author.update({
		where: whereClause,
		data: {
			...data,
		},
	});
};

const deleteAuthor = async (req: Request) => {
	await prisma.author.delete({ where: { id: req.params.id } });
};

export const AuthorServices = {
	getAuthors,
	getAuthorById,
	updateAuthor,
	deleteAuthor,
	createAuthor
};