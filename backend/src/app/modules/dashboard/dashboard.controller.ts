import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../middleware/sendResponse";
import { DashboardServices } from "./dashboard.service";

const getStats = catchAsync(async (req, res) => {
  const result = await DashboardServices.getStats(req);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    success: true,
    message: "Stats retrieved successfully",
    data: result,
  });
});

export const DashboardControllers = { getStats };
