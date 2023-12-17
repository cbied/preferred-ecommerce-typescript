import { createSelector } from "reselect";
import { UserState } from "./user.reducer";

export const selectUserReducer = (state: any): UserState => state.user

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