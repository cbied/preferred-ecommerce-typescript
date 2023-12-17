import { AnyAction } from 'redux'
import { CurrentUser  } from "./user.types";
import { setCurrentUser, checkUserSession, signUpUserStart, googleSignInStart,
         emailSignInStart, signInSuccess, signInFailed, signOutUserStart, 
         signOutUserSuccess, singOutUserFailed } from './user.action'

export type UserState = {
    currentUser: CurrentUser | null,
    isLoading: boolean,
    error: Error | null
}

const INITIAL_STATE: UserState = {
    currentUser: null,
    isLoading: false,
    error: null,
}

export const userReducer = (state = INITIAL_STATE, action: AnyAction): UserState => {

    if(setCurrentUser.match(action)) {
        return { ...state, currentUser: action.payload }
    }
    if(checkUserSession.match(action)) {
        return state
    }
    if(signOutUserStart.match(action) || googleSignInStart.match(action)) {
        return { ...state, isLoading: true }
    }
    if(emailSignInStart.match(action) || signUpUserStart.match(action)) {
        return { ...state, isLoading: true }
    }
    if(signInSuccess.match(action)) {
        return { ...state, isLoading: false, currentUser: action.payload }
    }
    if(signOutUserSuccess.match(action)) {
        return { ...state, isLoading: false, currentUser: null }
    }
    if(signInFailed.match(action) || singOutUserFailed.match(action)) {
        return { ...state, isLoading: false, error: action.payload }
    }
    return state
   
}