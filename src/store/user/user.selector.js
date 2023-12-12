import { createSelector } from "reselect"

export const selectUserReducer = state => state.user

export const selectUserLoading = createSelector(
    [selectUserReducer],
    user => user.isLoading
)

export const selectCurrentUser = createSelector(
    [selectUserReducer],
    user => user.currentUser
)

export const selectUserLoginError = createSelector(
    [selectUserReducer],
    user => user.error
)