import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../middleware/sendResponse";
import { WishlistServices } from "./wishlist.service";

const createWishlist = catchAsync(async (req, res) => {
  const result = await WishlistServices.createWishlist(req);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Wishlist created successfully",
    data: result,
  });
});

const getWishlists = catchAsync(async (req, res) => {
  const result = await WishlistServices.getWishlists(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Wishlists retrieved successfully",
    data: result,
  });
});

const deleteWishlist = catchAsync(async (req, res) => {
  await WishlistServices.deleteWishlist(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Wishlist deleted successfully",
    data: null,
  });
});

export const WishlistControllers = {
  getWishlists,
  deleteWishlist,
  createWishlist,
};
