import { NestedFilter } from "../../interface/nestedFiltering";
import { rangeFilteringPrams } from "../../../utils/queryBuilder";

// Fields for basic filtering
export const productFilterFields = ["isFeatured", "isActive"];

// Fields for top-level search
export const productSearchFields = ["title", "author"];

// Nested filtering config
export const productNestedFilters: NestedFilter[] = [
  // { key: "user", searchOption: "search", queryFields: ["name"] },
];

// Array-based filtering
export const productArrayFilterFields = [];

// Array-based filtering with multiple select not array
export const productMultiSelectNestedArrayFilters = [
  // {
  //   field: "option",
  //   relation: "option",
  //   matchField: "name",
  // },
];

// Range-based filtering config
export const productRangeFilter: rangeFilteringPrams[] = [
  {
    field: "createdAt",
    maxQueryKey: "maxDate",
    minQueryKey: "minDate",
    dataType: "date",
  },
  {
    field: "price",
    maxQueryKey: "maxPrice",
    minQueryKey: "minPrice",
    dataType: "number",
  },
];

// Prisma select configuration
export const productSelect = {};

// Prisma include configuration
export const productInclude = {};
