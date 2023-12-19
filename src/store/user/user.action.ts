import { createAction, withMatcher, Action, ActionWithPayload } from "../../utils/reducer/reducer.utils"
import { USER_ACTION_TYPES, SET_CURRENT_USER, CHECK_USER_SESSION, 
         SIGN_UP_USER_START, GOOGLE_SIGN_IN_START, EMAIL_SIGN_IN_START, SIGN_IN_SUCCESS,
         SIGN_IN_FAILED, SIGN_OUT_START, SIGN_OUT_SUCCESS, SIGN_OUT_FAILED, 
         CurrentUser, SignUpUser, SignInUser } from './user.types'

export type SetCurrentUser = ActionWithPayload<USER_ACTION_TYPES.SET_CURRENT_USER, CurrentUser>
export type CheckUserSession = Action<USER_ACTION_TYPES.CHECK_USER_SESSION>
export type SignUpUserStart = ActionWithPayload<USER_ACTION_TYPES.SIGN_UP_USER_START, SignUpUser>
export type GoogleSignInStart = Action<USER_ACTION_TYPES.GOOGLE_SIGN_IN_START>
export type EmailSignInStart = ActionWithPayload<USER_ACTION_TYPES.EMAIL_SIGN_IN_START, SignInUser>
export type SignInSuccess = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_SUCCESS, CurrentUser>
export type SignInFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_IN_FAILED, Error>
export type SignOutUserStart = Action<USER_ACTION_TYPES.SIGN_OUT_START>
export type SignOutUserSuccess = Action<USER_ACTION_TYPES.SIGN_OUT_SUCCESS>
export type SignOutUserFailed = ActionWithPayload<USER_ACTION_TYPES.SIGN_OUT_FAILED, Error>

export const setCurrentUser = withMatcher(
    (user: CurrentUser): SetCurrentUser => {
        return createAction(SET_CURRENT_USER, user);
    })

export const checkUserSession = withMatcher(
    (): CheckUserSession => {
    return createAction(CHECK_USER_SESSION);
})

/**
 * uses signInSuccess and signInFailure to check if user is created in db
 * *** NOTE: the reason I did it this way is because there is a quark with firebase that only responds
 * with the user id and nothing else the first time it is called. We are expecting the users display 
 * name, email and timestamp to come back, but is slow to respond. One way to get around this 
 * is to call getSnapshotFromUserAuth twice through the isUserAuthenticated method which then also 
 * signs the user in.
 * 
 * See the createUserAccount function in the user saga for logic
 */
export const signUpUserStart = withMatcher(
    (email: string, password: string, displayName: string): SignUpUserStart => {
    return createAction(SIGN_UP_USER_START, { email, password, displayName });
})

export const googleSignInStart = withMatcher(
    (): GoogleSignInStart => {
    return createAction(GOOGLE_SIGN_IN_START);
})

export const emailSignInStart = withMatcher(
    (email: string, password: string): EmailSignInStart => {
    return createAction(EMAIL_SIGN_IN_START, { email, password });
})

export const signInSuccess = withMatcher(
    (user: CurrentUser): SignInSuccess => {
    return createAction(SIGN_IN_SUCCESS, user);
})

export const signInFailed = withMatcher(
    (error: Error): SignInFailed => {
    return createAction(SIGN_IN_FAILED, error);
})

export const signOutUserStart = withMatcher(
    (): SignOutUserStart => {
    return createAction(SIGN_OUT_START);
})

export const signOutUserSuccess = withMatcher(
    (): SignOutUserSuccess => {
    return createAction(SIGN_OUT_SUCCESS);
})

export const singOutUserFailed = withMatcher(
    (error: Error): SignOutUserFailed => {
    return createAction(SIGN_OUT_FAILED, error);
})
