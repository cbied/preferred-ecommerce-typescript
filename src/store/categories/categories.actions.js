import { createAction } from "../../utils/reducer/reducer.utils";
import { FETCH_CATEGORIES_START, 
         FETCH_CATEGORIES_SUCCESS, 
         FETCH_CATEGORIES_FAILED } from "./categories.types";


export const fetchCategoriesStart = () => {
    return createAction(FETCH_CATEGORIES_START);
}

export const fetchCategoriesSuccess = (categoriesArray) => {
    console.log(categoriesArray)
    return createAction(FETCH_CATEGORIES_SUCCESS, categoriesArray);
}

export const fetchCategoriesFailed = (error) => {
    return createAction(FETCH_CATEGORIES_FAILED, error);
}