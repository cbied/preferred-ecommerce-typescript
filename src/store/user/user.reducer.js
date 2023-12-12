import { SET_CURRENT_USER, CHECK_USER_SESSION, SIGN_UP_USER_START, 
         GOOGLE_SIGN_IN_START, EMAIL_SIGN_IN_START, SIGN_IN_SUCCESS, 
         SIGN_IN_FAILED, SIGN_OUT_START, SIGN_OUT_SUCCESS, SIGN_OUT_FAILED  } from "./user.types";

const INITIAL_STATE = {
    currentUser: null,
    isLoading: false,
    error: null,
}

export const userReducer = (state = INITIAL_STATE, action = {}) => {
    const { type, payload } = action;
    switch (type) {
        case SIGN_UP_USER_START:
        case SIGN_OUT_START:
        case GOOGLE_SIGN_IN_START:
        case EMAIL_SIGN_IN_START:
            return {
                ...state,
                isLoading: true
            }
        case SET_CURRENT_USER:
        case CHECK_USER_SESSION:
            return {
                ...state,
                currentUser: payload
            }
        case SIGN_IN_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: payload
            }
        case SIGN_OUT_SUCCESS:
            return {
                ...state,
                isLoading: false,
                currentUser: null
            }
        case SIGN_IN_FAILED:
        case SIGN_OUT_FAILED:
            return {
                ...state,
                isLoading: false,
                error: payload
            }
        default:
            return state
    }
}