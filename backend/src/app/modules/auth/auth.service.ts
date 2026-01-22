import { PrismaClient, Role } from "@prisma/client";
import { compare, hash } from "bcrypt";
import { jwtHelpers } from "../../helper/jwtHelper";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../error/ApiErrors";
import { StatusCodes } from "http-status-codes";
import { createStripeCustomerAcc } from "../../helper/createStripeCustomerAcc";
import { OTPFn } from "../../helper/OTP/OTPFn";
import OTPVerify from "../../helper/OTP/OTPVerify";
import { verifyGoogleToken } from "../../helper/verifyGoogleToken";

const prisma = new PrismaClient();
const logInFromDB = async (payload: { email: string; password: string }) => {
  const findUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!findUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  if (findUser.isSocial) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Please use social login");
  }
  const comparePassword = await compare(payload.password, findUser.password);
  if (!comparePassword) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Invalid password");
  }

  if (findUser.status === "PENDING" && !findUser.isVerified) {
    OTPFn(findUser.email);
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "Please check your email address to verify your account",
    );
  }

  const userInfo = {
    id: findUser.id,
    email: findUser.email,
    name: findUser.name,
    image: findUser.image,
    role: findUser.role,
    isSocial: findUser.isSocial,
    status: findUser.status,
  };

  const token = jwtHelpers.generateToken(userInfo, { expiresIn: "15d" });
  return { accessToken: token, ...userInfo };
};

const verifyOtp = async (payload: { email: string; otp: number }) => {
  const { message } = await OTPVerify({ ...payload, time: "24h" });

  if (message) {
    const updateUserInfo = await prisma.user.update({
      where: {
        email: payload.email,
      },
      data: {
        status: "ACTIVE",
        isVerified: true,
      },
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        isVerified: true,
        createdAt: true,
        updatedAt: true,
      },
    });
    await createStripeCustomerAcc(updateUserInfo);
    return updateUserInfo;
  }
};

const forgetPassword = async (payload: { email: string }) => {
  const findUser = await prisma.user.findUnique({
    where: {
      email: payload.email.trim(),
    },
  });
  if (!findUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }

  if (findUser.isSocial) {
    throw new ApiError(
      StatusCodes.UNAUTHORIZED,
      "Social login user can't change password",
    );
  }

  OTPFn(findUser.email);
  return;
};

const resetOtpVerify = async (payload: { email: string; otp: number }) => {
  const { accessToken } = await OTPVerify({ ...payload, time: "1h" });

  return accessToken;
};

const resendOtp = async (payload: { email: string }) => {
  console.log("I am here");
  const findUser = await prisma.user.findUnique({
    where: {
      email: payload.email,
    },
  });
  if (!findUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  OTPFn(findUser.email);
};

const socialLogin = async ({ idToken }: { idToken: string }) => {
  const data = await verifyGoogleToken(idToken);

  if (!data) {
    throw new ApiError(401, "Invalid Google token");
  }

  if (!data.email_verified) {
    throw new ApiError(401, "Google email not verified");
  }

  const { email, name, picture } = data;

  if (!email) {
    throw new ApiError(400, "Google account has no email");
  }

  let user = await prisma.user.findUnique({
    where: { email: email?.trim() },
  });

  if (!user) {
    user = await prisma.user.create({
      data: {
        email: email?.trim(),
        name,
        image: picture,
        role: Role.USER,
        password: "",
        status: "ACTIVE",
        isSocial: true,
        isVerified: true,
      },
    });

    try {
      await createStripeCustomerAcc(user);
    } catch (e) {
      console.error("Stripe error", e);
    }
  }

  if (user.status !== "ACTIVE") {
    throw new ApiError(403, "Account blocked");
  }

  const accessToken = jwtHelpers.generateToken(
    { id: user.id, email: user.email, role: user.role },
    { expiresIn: "24h" },
  );

  return { ...user, accessToken };
};

const resetPassword = async (payload: { token: string; password: string }) => {
  const { email, exp } = jwtHelpers.tokenDecoder(payload.token) as JwtPayload;

  if (exp && exp < Date.now() / 1000) {
    throw new ApiError(StatusCodes.UNAUTHORIZED, "Token expired");
  }

  const findUser = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });
  if (!findUser) {
    throw new ApiError(StatusCodes.NOT_FOUND, "User not found");
  }
  const hashedPassword = await hash(payload.password, 10);
  const result = await prisma.user.update({
    where: {
      email: email,
    },
    data: {
      password: hashedPassword,
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

export const authService = {
  logInFromDB,
  forgetPassword,
  verifyOtp,
  resendOtp,
  socialLogin,
  resetOtpVerify,
  resetPassword,
};
