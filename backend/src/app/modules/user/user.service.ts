import { Role, User } from "@prisma/client";
import ApiError from "../../error/ApiErrors";
import { StatusCodes } from "http-status-codes";
import { compare, hash } from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";
import { prisma } from "../../../utils/prisma";
import { jwtHelpers } from "../../helper/jwtHelper";
import { OTPFn } from "../../helper/OTP/OTPFn";
import { deleteFromCloudinary, getImageUrl } from "../../helper/cloudinary";
import QueryBuilder from "../../../utils/queryBuilder";
import { Request } from "express";

const createUserIntoDB = async (payload: User) => {
  const findUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (findUser && findUser?.isVerified) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "User already exists");
  }
  if (findUser && !findUser?.isVerified) {
    await OTPFn(payload.email);
    return;
  }

  const newPass = await hash(payload.password, 10);

  const result = await prisma.user.create({
    data: {
      ...payload,
      password: newPass,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  OTPFn(payload.email);
  return result;
};

const changePasswordIntoDB = async (id: string, payload: any) => {
  const findUser = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      password: true,
      isSocial: true,
    },
  });
  if (!findUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  if (findUser.isSocial) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "Social user can't change password",
    );
  }

  const comparePassword = await compare(payload.oldPassword, findUser.password);
  if (!comparePassword) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid password");
  }

  const hashedPassword = await hash(payload.newPassword, 10);
  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      password: hashedPassword,
    },
  });
  return result;
};

const updateUserIntoDB = async (id: string, payload: any, image: any) => {
  const userImage = image && (await getImageUrl(image));

  const findUser = await prisma.user.findUnique({
    where: {
      id,
    },
  });
  if (!findUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  if (userImage && findUser.image) {
    const oldImage = findUser.image;
    if (oldImage) {
      await deleteFromCloudinary(oldImage);
    }
  }

  const result = await prisma.user.update({
    where: {
      id,
    },
    data: {
      ...payload,
      image: userImage ?? undefined,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const getMyProfile = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: {
      id,
    },
    select: {
      id: true,
      name: true,
      email: true,
      image: true,
      role: true,
      isSocial: true,
      createdAt: true,
      updatedAt: true,
    },
  });

  if (!result) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  return result;
};

const createModarator = async (payload: any) => {
  const { email } = payload;

  const findUser = await prisma.user.findUnique({
    where: {
      email,
    },
  });
  if (findUser) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "User already exists");
  }
  const newPass = await hash(payload.password, 10);
  const result = await prisma.user.create({
    data: {
      ...payload,
      password: newPass,
      isVerified: true,
      Role: Role.MODERATOR,
    },
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      status: true,
      createdAt: true,
      updatedAt: true,
    },
  });
  return result;
};

const getAllUsers = async (req: Request) => {
  const queryBuilder = new QueryBuilder(req.query, prisma.user, {
    role: {
      not: "ADMIN",
    },
  });
  const result = await queryBuilder
    .filter(["role", "status"])
    .search(["name", "email"])
    .paginate()
    .execute();

  const meta = await queryBuilder.countTotal();

  return { data: result, meta };
};

export const userServices = {
  createUserIntoDB,
  updateUserIntoDB,
  changePasswordIntoDB,
  getMyProfile,
  createModarator,
  getAllUsers,
};
