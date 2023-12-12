import { createAction } from "../../utils/reducer/reducer.utils"
import { SET_CURRENT_USER, CHECK_USER_SESSION, SIGN_UP_USER_START, 
         GOOGLE_SIGN_IN_START, EMAIL_SIGN_IN_START, SIGN_IN_SUCCESS,
         SIGN_IN_FAILED, SIGN_OUT_START, SIGN_OUT_SUCCESS, SIGN_OUT_FAILED } from './user.types'

export const setCurrentUser = (user) => {
        return createAction(SET_CURRENT_USER, user);
    }

export const checkUserSession = () => {
    return createAction(CHECK_USER_SESSION);
}

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
export const signUpUserStart = (email, password, displayName) => {
    return createAction(SIGN_UP_USER_START, { email, password, displayName });
}

export const googleSignInStart = () => {
    return createAction(GOOGLE_SIGN_IN_START);
}

export const emailSignInStart = (email, password) => {
    return createAction(EMAIL_SIGN_IN_START, { email, password });
}

export const signInSuccess = (user) => {
    alert("User Signed in successfully")
    return createAction(SIGN_IN_SUCCESS, user);
}

export const signInFailed = (error) => {
    return createAction(SIGN_IN_FAILED, error);
}

export const signOutUserStart = () => {
    return createAction(SIGN_OUT_START);
}

export const signOutUserSuccess = () => {
    return createAction(SIGN_OUT_SUCCESS);
}

export const singOutUserFailed = (error) => {
    return createAction(SIGN_OUT_FAILED, error);
}
