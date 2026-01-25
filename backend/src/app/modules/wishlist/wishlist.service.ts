import { Request } from "express";
import { prisma } from "../../../utils/prisma";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../error/ApiErrors";

const createWishlist = async (req: Request) => {
  const userId = req.user.id;
  const { id: productId } = req.params;

  const wishList = await prisma.wishlist.upsert({
    where: {
      userId,
    },
    update: {},
    create: {
      userId,
    },
  });

  await prisma.wishlistItem.upsert({
    where: {
      wishlistId_productId: {
        wishlistId: wishList.id,
        productId,
      },
    },
    update: {},
    create: {
      wishlistId: wishList.id,
      productId,
    },
  });

  return true;
};

const getWishlists = async (req: Request) => {
  const userId = req.user.id;
  const wishlist = await prisma.wishlist.findUnique({
    where: { userId },
    include: {
      items: {
        include: {
          product: {
            select: {
              id: true,
              title: true,
              slug: true,
              price: true,
              images: true,
              stock: true,
            },
          },
        },
      },
    },
  });

  return wishlist?.items || [];
};

const deleteWishlist = async (req: Request) => {
  const userId = req.user.id;
  const { id: productId } = req.params;

  const wishList = await prisma.wishlist.findUnique({
    where: {
      userId,
    },
  });

  if (!wishList) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Wishlist not found");
  }

  await prisma.wishlistItem.delete({
    where: {
      wishlistId_productId: {
        wishlistId: wishList.id,
        productId,
      },
    },
  });

  return true;
};

export const WishlistServices = {
  getWishlists,
  deleteWishlist,
  createWishlist,
};
