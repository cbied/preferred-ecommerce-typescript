import { FETCH_CATEGORIES_START, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILED, Categories } from './categories.types';
import { CategoryAction } from './categories.actions';

export type CategoriesState = {
    readonly categories: Categories[];
    readonly isLoading: boolean;
    readonly error: Error | null;
}

const INITIAL_CATEGORIES_STATE: CategoriesState = {
    categories: [],
    isLoading: false,
    error: null
}

export const categoriesReducer = (state = INITIAL_CATEGORIES_STATE, action = {} as CategoryAction) => {
    const { type } = action;

    switch(type) {
        case FETCH_CATEGORIES_START:
            return { ...state, isLoading: true }
        case FETCH_CATEGORIES_SUCCESS:
            return { ...state, isLoading: false, categories: action.payload }
        case FETCH_CATEGORIES_FAILED:
            return { ...state, isLoading: false, error: action.payload }
        default:
            return state
    }
}