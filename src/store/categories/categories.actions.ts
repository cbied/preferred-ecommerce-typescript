import { createAction, Action, ActionWithPayload, withMatcher } from '../../utils/reducer/reducer.utils';
import { CATEGORIES_ACTION_TYPES,
         FETCH_CATEGORIES_START, 
         FETCH_CATEGORIES_SUCCESS, 
         FETCH_CATEGORIES_FAILED,
         Categories } from './categories.types';

export type FetchCategoriesStart = Action<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_START>
export type FetchCategoriesSuccess = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_SUCCESS, Categories[]>
export type FetchCategoriesFailed = ActionWithPayload<CATEGORIES_ACTION_TYPES.FETCH_CATEGORIES_FAILED, Error>

export const fetchCategoriesStart = withMatcher(
    (): FetchCategoriesStart => {
    return createAction(FETCH_CATEGORIES_START);
})

export const fetchCategoriesSuccess = withMatcher(
    (categoriesArray: Categories[]): FetchCategoriesSuccess => {
    return createAction(FETCH_CATEGORIES_SUCCESS, categoriesArray);
})

export const fetchCategoriesFailed = withMatcher(
    (error: Error): FetchCategoriesFailed => {
    return createAction(FETCH_CATEGORIES_FAILED, error);
})