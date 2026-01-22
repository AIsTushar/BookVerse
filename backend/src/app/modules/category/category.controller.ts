import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../middleware/sendResponse";
import { CategoryServices } from "./category.service";

const createCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.createCategory(req);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Category created successfully",
    data: result,
  });
});
const getCategorys = catchAsync(async (req, res) => {
  const result = await CategoryServices.getCategorys(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Categorys retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getCategoryBySlug = catchAsync(async (req, res) => {
  const result = await CategoryServices.getCategoryBySlug(req.params.slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Category retrieved successfully",
    data: result,
  });
});

const updateCategory = catchAsync(async (req, res) => {
  const result = await CategoryServices.updateCategory(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Category updated successfully",
    data: result,
  });
});

const deleteCategory = catchAsync(async (req, res) => {
  await CategoryServices.deleteCategory(req);
  sendResponse(res, {
    statusCode: StatusCodes.NO_CONTENT,
    success: true,
    message: "Category deleted successfully",
    data: null,
  });
});

export const CategoryControllers = {
  getCategorys,
  getCategoryBySlug,
  updateCategory,
  deleteCategory,
  createCategory,
};
