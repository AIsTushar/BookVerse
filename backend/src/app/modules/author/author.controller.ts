import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../middleware/sendResponse";
import { AuthorServices } from "./author.service";

const createAuthor = catchAsync(async (req, res) => {
  const result = await AuthorServices.createAuthor(req);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Author created successfully",
    data: result,
  });
});
const getAuthors = catchAsync(async (req, res) => {
  const result = await AuthorServices.getAuthors(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Authors retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getAuthorBySlug = catchAsync(async (req, res) => {
  const result = await AuthorServices.getAuthorBySlug(req.params.slug);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Author retrieved successfully",
    data: result,
  });
});

const updateAuthor = catchAsync(async (req, res) => {
  const result = await AuthorServices.updateAuthor(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Author updated successfully",
    data: result,
  });
});

const deleteAuthor = catchAsync(async (req, res) => {
  await AuthorServices.deleteAuthor(req);
  sendResponse(res, {
    statusCode: StatusCodes.NO_CONTENT,
    success: true,
    message: "Author deleted successfully",
    data: null,
  });
});

export const AuthorControllers = {
  getAuthors,
  getAuthorBySlug,
  updateAuthor,
  deleteAuthor,
  createAuthor,
};
