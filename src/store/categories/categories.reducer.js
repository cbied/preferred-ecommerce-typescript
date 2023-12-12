import { FETCH_CATEGORIES_START, FETCH_CATEGORIES_SUCCESS, FETCH_CATEGORIES_FAILED } from './categories.types';

const INITIAL_CATEGORIES_STATE = {
    categories: [],
    isLoading: false,
    error: null
}

export const categoriesReducer = (state = INITIAL_CATEGORIES_STATE, action = {}) => {
    const { type, payload } = action;

    switch(type) {
        case FETCH_CATEGORIES_START:
            return { ...state, isLoading: true }
        case FETCH_CATEGORIES_SUCCESS:
            return { ...state, isLoading: false, categories: payload }
        case FETCH_CATEGORIES_FAILED:
            return { ...state, isLoading: false, error: payload }
        default:
            return state
    }
}