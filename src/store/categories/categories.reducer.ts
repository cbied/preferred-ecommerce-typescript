import { AnyAction } from 'redux';
import { Categories } from './categories.types';
import { fetchCategoriesStart, fetchCategoriesSuccess, fetchCategoriesFailed } from './categories.actions';

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

export const categoriesReducer = (state = INITIAL_CATEGORIES_STATE, action: AnyAction): CategoriesState => {
    if(fetchCategoriesStart.match(action)) {
        return { ...state, isLoading: true }
    }
    if(fetchCategoriesSuccess.match(action)) {
        return { ...state, isLoading: false, categories: action.payload }
    }
    if(fetchCategoriesFailed.match(action)) {
        return { ...state, isLoading: false, error: action.payload }
    }

    return state
}