import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { userServices } from "./user.service";
import sendResponse from "../../middleware/sendResponse";
import { StatusCodes } from "http-status-codes";

const createUserController = catchAsync(async (req: Request, res: Response) => {
  const body = req.body;
  const result = await userServices.createUserIntoDB(body);
  sendResponse(res, {
    statusCode: StatusCodes.CREATED,
    message: "Please check your email for verification",
    data: result,
    success: true,
  });
});

const changePasswordController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.user;
    const body = req.body as any;
    const result = await userServices.changePasswordIntoDB(id, body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "User updated successfully",
      data: result,
      success: true,
    });
  },
);

const updateUserController = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.user;
  const body = req?.body as any;
  const image = req?.file as any;
  const result = await userServices.updateUserIntoDB(id, body, image);
  sendResponse(res, {
    statusCode: StatusCodes.OK,
    message: "User updated successfully",
    data: result,
    success: true,
  });
});

const getMyProfileController = catchAsync(
  async (req: Request, res: Response) => {
    const { id } = req.user;
    const result = await userServices.getMyProfile(id);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "User profile retrieved successfully",
      data: result,
      success: true,
    });
  },
);

const createModaratorController = catchAsync(
  async (req: Request, res: Response) => {
    const body = req.body as any;
    const result = await userServices.createModarator(body);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Modarator created successfully",
      data: result,
      success: true,
    });
  },
);

const getAllUsersController = catchAsync(
  async (req: Request, res: Response) => {
    const result = await userServices.getAllUsers(req);
    sendResponse(res, {
      statusCode: StatusCodes.OK,
      message: "Users retrieved successfully",
      success: true,
      data: result.data,
      meta: result.meta,
    });
  },
);

export const userController = {
  createUserController,
  updateUserController,
  changePasswordController,
  getMyProfileController,
  createModaratorController,
  getAllUsersController,
};
