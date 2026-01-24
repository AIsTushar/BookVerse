import { NestedFilter } from "../../interface/nestedFiltering";
import { rangeFilteringPrams } from "../../../utils/queryBuilder";

// Fields for basic filtering
export const orderFilterFields = ["status", "paymentStatus"];

// Fields for top-level search
export const orderSearchFields = ["name"];

// Nested filtering config
export const orderNestedFilters: NestedFilter[] = [
  // { key: "user", searchOption: "search", queryFields: ["name"] },
  // { key: "items.product", searchOption: "search", queryFields: ["title"] },
];

// Array-based filtering
export const orderArrayFilterFields = [];

// Array-based filtering with multiple select not array
export const orderMultiSelectNestedArrayFilters = [
  // {
  //   field: "option",
  //   relation: "option",
  //   matchField: "name",
  // },
];

// Range-based filtering config
export const orderRangeFilter: rangeFilteringPrams[] = [
  {
    field: "createdAt",
    maxQueryKey: "maxDate",
    minQueryKey: "minDate",
    dataType: "date",
  },
];

// Prisma select configuration
export const orderSelect = {};

// Prisma include configuration
export const orderInclude = { items: { include: { product: true } } };
