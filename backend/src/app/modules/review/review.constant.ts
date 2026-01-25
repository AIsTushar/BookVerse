
import { NestedFilter } from "../../interface/nestedFiltering";
import { rangeFilteringPrams } from "../../../utils/queryBuilder";

// Fields for basic filtering
export const reviewFilterFields = [];

// Fields for top-level search
export const reviewSearchFields = [];

// Nested filtering config
export const reviewNestedFilters: NestedFilter[] = [
	// { key: "user", searchOption: "search", queryFields: ["name"] },

];

// Array-based filtering
export const reviewArrayFilterFields = [];

// Array-based filtering with multiple select not array
export const reviewMultiSelectNestedArrayFilters = [
  // {
  //   field: "option",
  //   relation: "option",
  //   matchField: "name",
  // },
];

// Range-based filtering config
export const reviewRangeFilter: rangeFilteringPrams[] = [
	{
		field: "createdAt",
		maxQueryKey: "maxDate",
		minQueryKey: "minDate",
		dataType: "date",
	},
];

// Prisma select configuration
export const reviewSelect = {
 
};

// Prisma include configuration
export const reviewInclude = {
	
};
