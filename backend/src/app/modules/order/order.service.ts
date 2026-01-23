import { Request } from "express";
import { prisma } from "../../../utils/prisma";
import QueryBuilder from "../../../utils/queryBuilder";
import {
  orderFilterFields,
  orderInclude,
  orderNestedFilters,
  orderRangeFilter,
  orderSearchFields,
  orderMultiSelectNestedArrayFilters,
  orderArrayFilterFields,
  orderSelect,
} from "./order.constant";
import { StatusCodes } from "http-status-codes";
import ApiError from "../../error/ApiErrors";
import { OrderStatus, Prisma } from "@prisma/client";
import { stripe } from "../../../config/stripe";

const createOrder = async (req: Request) => {
  const userId = req.user?.id;
  const { paymentMethodId } = req.body;

  if (!paymentMethodId) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Payment method is required");
  }

  const cart = await prisma.cart.findFirst({
    where: { userId },
    include: {
      items: { include: { product: true } },
    },
  });

  if (!cart || cart.items.length === 0) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Cart is empty");
  }

  let subtotal = 0;

  const orderItems = cart.items.map((item) => {
    if (item.quantity > item.product.stock) {
      throw new ApiError(
        StatusCodes.BAD_REQUEST,
        `${item.product.title} is out of stock`,
      );
    }

    subtotal += item.product.price * item.quantity;

    return {
      productId: item.productId,
      quantity: item.quantity,
      price: item.product.price,
    };
  });

  const shippingFee = 50;
  const totalAmount = subtotal + shippingFee;

  const paymentIntent = await stripe.paymentIntents.create({
    amount: Math.round(totalAmount * 100),
    currency: "bdt",
    payment_method: paymentMethodId,
    confirm: true,
    automatic_payment_methods: {
      enabled: true,
      allow_redirects: "never",
    },
    metadata: {
      userId,
    },
  });

  if (paymentIntent.status !== "succeeded") {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Payment failed");
  }

  const order = await prisma.$transaction(async (tx) => {
    const createdOrder = await tx.order.create({
      data: {
        userId,
        shippingFee,
        totalAmount,
        status: paymentIntent.status === "succeeded" ? "PAID" : "PENDING",
        paymentMethodId,
        paymentStatus: paymentIntent.status,
        items: {
          create: orderItems,
        },
      },
      include: { items: true },
    });

    // Reduce stock
    for (const item of cart.items) {
      await tx.product.update({
        where: { id: item.productId },
        data: {
          stock: { decrement: item.quantity },
        },
      });
    }

    // Clear cart
    await tx.cartItem.deleteMany({
      where: { cartId: cart.id },
    });

    return createdOrder;
  });

  return {
    order,
    paymentIntent,
  };
};

const getOrders = async (req: Request) => {
  const queryBuilder = new QueryBuilder(req.query, prisma.order);
  const results = await queryBuilder
    .filter(orderFilterFields)
    .search(orderSearchFields)
    .arrayFieldHasSome(orderArrayFilterFields)
    .multiSelectNestedArray(orderMultiSelectNestedArrayFilters)
    .nestedFilter(orderNestedFilters)
    .sort()
    .paginate()
    //.select(orderSelect)
    //.include(orderInclude)
    .fields()
    .filterByRange(orderRangeFilter)
    .execute();

  const meta = await queryBuilder.countTotal();
  return { data: results, meta };
};

const getMyOrders = async (req: Request) => {
  const userId = req.user?.id;
  const queryBuilder = new QueryBuilder(req.query, prisma.order, { userId });
  const results = await queryBuilder
    .filter(orderFilterFields)
    .search(orderSearchFields)
    .arrayFieldHasSome(orderArrayFilterFields)
    .multiSelectNestedArray(orderMultiSelectNestedArrayFilters)
    .nestedFilter(orderNestedFilters)
    .sort()
    .paginate()
    //.select(orderSelect)
    //.include(orderInclude)
    .fields()
    .filterByRange(orderRangeFilter)
    .execute();

  const meta = await queryBuilder.countTotal();
  return { data: results, meta };
};

const getOrderById = async (id: string) => {
  return prisma.order.findUnique({ where: { id } });
};

const updateOrder = async (req: Request) => {
  const { id } = req.params;
  const { status } = req.body;

  if (!status) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Order status is required");
  }

  if (!Object.values(OrderStatus).includes(status)) {
    throw new ApiError(StatusCodes.BAD_REQUEST, "Invalid order status");
  }

  const whereClause: Prisma.OrderWhereUniqueInput = { id };

  const existing = await prisma.order.findUnique({
    where: whereClause,
    select: { id: true, status: true },
  });

  if (!existing) {
    throw new ApiError(
      StatusCodes.NOT_FOUND,
      `Order not found with this id: ${id}`,
    );
  }

  const invalidTransitions: Record<OrderStatus, OrderStatus[]> = {
    PENDING: [],
    PAID: ["PENDING"],
    SHIPPED: ["PENDING"],
    DELIVERED: ["PENDING", "PAID"],
    CANCELLED: ["DELIVERED"],
  };

  if (invalidTransitions[existing.status]?.includes(status)) {
    throw new ApiError(
      StatusCodes.BAD_REQUEST,
      `Cannot change order status from ${existing.status} to ${status}`,
    );
  }

  const updatedOrder = await prisma.order.update({
    where: whereClause,
    data: {
      status,
    },
  });

  return updatedOrder;
};

const deleteOrder = async (req: Request) => {
  await prisma.order.delete({ where: { id: req.params.id } });
};

export const OrderServices = {
  getOrders,
  getOrderById,
  updateOrder,
  deleteOrder,
  createOrder,
  getMyOrders,
};
