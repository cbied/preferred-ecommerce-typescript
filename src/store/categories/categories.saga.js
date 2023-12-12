import { all, takeLatest, call, put } from 'redux-saga/effects'
import { getCategoriesAndDocuments } from "../../utils/firebase/firebase.utils"
import { fetchCategoriesSuccess, fetchCategoriesFailed } from "./categories.actions"
import { FETCH_CATEGORIES_START } from "./categories.types"

export function* fetchCategoriesAsync() {
    try {
        const categoriesArray = yield call(getCategoriesAndDocuments, 'categories')
        yield put(fetchCategoriesSuccess(categoriesArray))
    } catch(error) {
        yield put(fetchCategoriesFailed(error))
    }
}

export function* onFetchCategories() {
    yield takeLatest(FETCH_CATEGORIES_START, fetchCategoriesAsync)
}

export function* categoriesSaga() {
    yield all([call(onFetchCategories)])
}