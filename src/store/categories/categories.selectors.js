import { createSelector } from "reselect";

// update state: any when user and cart reducers are updated
const selectCategoriesReducer = (state) => state.categories;

export const selectCategories = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice) => categoriesSlice.categories
)

export const selectCategoriesMap = createSelector(
    [selectCategories],
    (categories) => categories.reduce((acc, categories) => {
        const { title, items } = categories
        acc[title.toLowerCase()] = items
        return acc
    }, {})
)

export const selectCategoriesIsLoading = createSelector(
    [selectCategoriesReducer],
    (categoriesSlice) => categoriesSlice.isLoading
)