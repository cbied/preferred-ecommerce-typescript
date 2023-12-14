export enum CATEGORIES_ACTION_TYPES {
    FETCH_CATEGORIES_START = "category/FETCH_CATEGORIES_START",
    FETCH_CATEGORIES_SUCCESS = "category/FETCH_CATEGORIES_SUCCESS",
    FETCH_CATEGORIES_FAILED = "category/FETCH_CATEGORIES_FAILED"
}

export const { FETCH_CATEGORIES_START, 
               FETCH_CATEGORIES_SUCCESS, 
               FETCH_CATEGORIES_FAILED } = CATEGORIES_ACTION_TYPES;

export type CategoryProduct = {
    title: string,
    imageUrl: string
}

export type CategoryItem = {
    id: number,
    imageUrl: string,
    name: string,
    price: number
}

export type Categories = {
    title: string,
    items: CategoryItem[]
}