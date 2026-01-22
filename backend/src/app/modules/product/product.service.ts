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
  productSelect

} from "./product.constant";
import config from "../../../config";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../error/ApiErrors";
import { Prisma } from "@prisma/client";


const createProduct = async (req: Request) => {
	const payload = req.body;

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
		//.include(productInclude)
		.fields()
		.filterByRange(productRangeFilter)
		.execute();

	const meta = await queryBuilder.countTotal();
	return { data: results, meta };
};

const getProductById = async (id: string) => {
	return prisma.product.findUnique({ where: { id } });
};

const updateProduct = async (req: Request) => {
	const { id } = req.params;
	const data= req.body;
	const user = req.user;
	const role = user?.role;

	const whereClause: Prisma.ProductWhereUniqueInput = {
		id,
		...(role === "-----" ? { userId: user.id } : {}),
	};

	const existing = await prisma.product.findUnique({ where: whereClause });
	if (!existing) {
		throw new ApiError(StatusCodes.NOT_FOUND, `Product not found with this id: ${id}`);
	}

	return prisma.product.update({
		where: whereClause,
		data: {
			...data,
		},
	});
};

const deleteProduct = async (req: Request) => {
	await prisma.product.delete({ where: { id: req.params.id } });
};

export const ProductServices = {
	getProducts,
	getProductById,
	updateProduct,
	deleteProduct,
	createProduct
};