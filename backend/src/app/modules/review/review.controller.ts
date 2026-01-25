import { StatusCodes } from "http-status-codes";;
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../middleware/sendResponse";
import { ReviewServices } from "./review.service";

const createReview = catchAsync(async (req, res) => {
	const result = await ReviewServices.createReview(req);
	sendResponse(res, {
		statusCode: StatusCodes.CREATED,
		success: true,
		message: "Review created successfully",
		data: result,
	
	});
});
const getReviews = catchAsync(async (req, res) => {
	const result = await ReviewServices.getReviews(req);
	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "Reviews retrieved successfully",
		data: result.data,
		meta: result.meta,
	});
});

const getReviewById = catchAsync(async (req, res) => {
	const result = await ReviewServices.getReviewById(req.params.id);
	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "Review retrieved successfully",
		data: result,
	});
});

const updateReview = catchAsync(async (req, res) => {
	const result = await ReviewServices.updateReview(req);
	sendResponse(res, {
		statusCode: StatusCodes.OK,
		success: true,
		message: "Review updated successfully",
		data: result,
	});
});

const deleteReview = catchAsync(async (req, res) => {
	await ReviewServices.deleteReview(req);
	sendResponse(res, {
		statusCode: StatusCodes.NO_CONTENT,
		success: true,
		message: "Review deleted successfully",
		data: null,
	});
});

export const ReviewControllers = {
	getReviews,
	getReviewById,
	updateReview,
	deleteReview,
	createReview,
};