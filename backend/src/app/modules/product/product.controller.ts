import { StatusCodes } from "http-status-codes";;
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../middleware/sendResponse";
import { ProductServices } from "./product.service";

const createProduct = catchAsync(async (req, res) => {
	const result = await ProductServices.createProduct(req);
	sendResponse(res, {
		statusCode: StatusCodes.CREATED,
		success: true,
		message: "Product created successfully",
		data: result,
	
	});
});
const getProducts = catchAsync(async (req, res) => {
	const result = await ProductServices.getProducts(req);
	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "Products retrieved successfully",
		data: result.data,
		meta: result.meta,
	});
});

const getProductById = catchAsync(async (req, res) => {
	const result = await ProductServices.getProductById(req.params.id);
	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "Product retrieved successfully",
		data: result,
	});
});

const updateProduct = catchAsync(async (req, res) => {
	const result = await ProductServices.updateProduct(req);
	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "Product updated successfully",
		data: result,
	});
});

const deleteProduct = catchAsync(async (req, res) => {
	await ProductServices.deleteProduct(req);
	sendResponse(res, {
		statusCode: StatusCodes.NO_CONTENT,
		success: true,
		message: "Product deleted successfully",
		data: null,
	});
});

export const ProductControllers = {
	getProducts,
	getProductById,
	updateProduct,
	deleteProduct,
	createProduct,
};