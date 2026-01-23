import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../middleware/sendResponse";
import { CartServices } from "./cart.service";

const createCart = catchAsync(async (req, res) => {
  const result = await CartServices.createCart(req);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Cart created successfully",
    data: result,
  });
});
const getCarts = catchAsync(async (req, res) => {
  const result = await CartServices.getCarts(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Carts retrieved successfully",
    data: result,
  });
});

const clearCart = catchAsync(async (req, res) => {
  const result = await CartServices.clearCart(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Cart cleared successfully",
    data: result,
  });
});

const deleteCartItem = catchAsync(async (req, res) => {
  const result = await CartServices.deleteCartItem(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Cart item deleted successfully",
    data: result,
  });
});

const editCartItem = catchAsync(async (req, res) => {
  const result = await CartServices.editCartItem(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Cart item updated successfully",
    data: result,
  });
});

export const CartControllers = {
  getCarts,
  createCart,
  clearCart,
  deleteCartItem,
  editCartItem,
};
