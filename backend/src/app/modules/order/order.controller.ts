import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../middleware/sendResponse";
import { OrderServices } from "./order.service";

const createOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.createOrder(req);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    success: true,
    message: "Order created successfully",
    data: result,
  });
});
const getOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getOrders(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Orders retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

const getOrderById = catchAsync(async (req, res) => {
  const result = await OrderServices.getOrderById(req.params.id);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order retrieved successfully",
    data: result,
  });
});

const updateOrder = catchAsync(async (req, res) => {
  const result = await OrderServices.updateOrder(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Order updated successfully",
    data: result,
  });
});

const deleteOrder = catchAsync(async (req, res) => {
  await OrderServices.deleteOrder(req);
  sendResponse(res, {
    statusCode: StatusCodes.NO_CONTENT,
    success: true,
    message: "Order deleted successfully",
    data: null,
  });
});

const getMyOrders = catchAsync(async (req, res) => {
  const result = await OrderServices.getMyOrders(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "My orders retrieved successfully",
    data: result.data,
    meta: result.meta,
  });
});

export const OrderControllers = {
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  createOrder,
  getMyOrders,
};
