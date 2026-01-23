import { Request } from "express";
import { prisma } from "../../../utils/prisma";
import QueryBuilder from "../../../utils/queryBuilder";
import {
  cartFilterFields,
  cartInclude,
  cartNestedFilters,
  cartRangeFilter,
  cartSearchFields,
  cartMultiSelectNestedArrayFilters,
  cartArrayFilterFields,
  cartSelect,
} from "./cart.constant";
import config from "../../../config";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../error/ApiErrors";
import { Prisma } from "@prisma/client";

const createCart = async (req: Request) => {
  const userId = req.user?.id;
  const { productId, quantity } = req.body;
  let cart;

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { id: true, stock: true, isActive: true },
  });

  if (!product || !product.isActive) {
    throw new ApiError(StatusCodes.NOT_FOUND, "Product not found or inactive");
  }

  if (product.stock < quantity) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      "Insufficient stock for this product",
    );
  }

  cart = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: true,
    },
  });

  if (!cart) {
    cart = await prisma.cart.create({
      data: { userId },
      include: {
        items: true,
      },
    });
  }

  const existingItem = cart.items.find((item) => item.productId === productId);

  if (existingItem) {
    // Increment quantity
    const newQuantity = existingItem.quantity + quantity;

    if (newQuantity > product.stock) {
      throw new ApiError(StatusCodes.BAD_REQUEST, "Exceeds available stock");
    }

    await prisma.cartItem.update({
      where: { id: existingItem.id },
      data: { quantity: newQuantity },
    });
  } else {
    // Add new item
    await prisma.cartItem.create({
      data: {
        cartId: cart.id,
        productId,
        quantity,
      },
    });
  }

  const updatedCart = await prisma.cart.findUnique({
    where: { id: cart.id },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  return updatedCart;
};

const getCarts = async (req: Request) => {
  const userId = req.user?.id;
  const result = await prisma.cart.findUnique({
    where: { userId },
    include: {
      items: {
        include: { product: true },
      },
    },
  });

  return result;
};

const clearCart = async (req: Request) => {
  const userId = req.user?.id;
  const result = await prisma.cart.deleteMany({ where: { userId } });
  return result;
};

const deleteCartItem = async (req: Request) => {
  const userId = req.user?.id;
  const { productId } = req.params;
  const result = await prisma.cartItem.deleteMany({
    where: { cart: { userId }, productId },
  });
  return result;
};

const editCartItem = async (req: Request) => {
  const userId = req.user?.id;
  const { productId } = req.params;
  const { quantity } = req.body;

  if (!userId) {
    throw new Error("Unauthorized");
  }

  if (!quantity || quantity < 1) {
    throw new Error("Quantity must be at least 1");
  }

  const product = await prisma.product.findUnique({
    where: { id: productId },
    select: { stock: true },
  });

  if (!product) {
    throw new Error("Product not found");
  }

  if (product.stock < quantity) {
    throw new Error("Insufficient product stock");
  }

  const cartItem = await prisma.cartItem.findFirst({
    where: {
      productId,
      cart: { userId },
    },
  });

  if (!cartItem) {
    throw new Error("Cart item not found");
  }

  const updatedCartItem = await prisma.cartItem.update({
    where: { id: cartItem.id },
    data: { quantity },
  });

  return updatedCartItem;
};

export const CartServices = {
  getCarts,
  createCart,
  clearCart,
  deleteCartItem,
  editCartItem,
};
