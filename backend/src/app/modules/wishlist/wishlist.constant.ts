
import { NestedFilter } from "../../interface/nestedFiltering";
import { rangeFilteringPrams } from "../../../utils/queryBuilder";

// Fields for basic filtering
export const wishlistFilterFields = [];

// Fields for top-level search
export const wishlistSearchFields = [];

// Nested filtering config
export const wishlistNestedFilters: NestedFilter[] = [
	// { key: "user", searchOption: "search", queryFields: ["name"] },

];

// Array-based filtering
export const wishlistArrayFilterFields = [];

// Array-based filtering with multiple select not array
export const wishlistMultiSelectNestedArrayFilters = [
  // {
  //   field: "option",
  //   relation: "option",
  //   matchField: "name",
  // },
];

// Range-based filtering config
export const wishlistRangeFilter: rangeFilteringPrams[] = [
	{
		field: "createdAt",
		maxQueryKey: "maxDate",
		minQueryKey: "minDate",
		dataType: "date",
	},
];

// Prisma select configuration
export const wishlistSelect = {
 
};

// Prisma include configuration
export const wishlistInclude = {
	
};
