export enum USER_ACTION_TYPES {
    SET_CURRENT_USER = 'SET_CURRENT_USER',
    CHECK_USER_SESSION = 'CHECK_USER_SESSION',
    SIGN_UP_USER_START = 'SIGN_UP_USER_START',
    GOOGLE_SIGN_IN_START = 'GOOGLE_SIGN_IN_START',
    EMAIL_SIGN_IN_START = 'EMAIL_SIGN_IN_START',
    SIGN_IN_SUCCESS = 'SIGN_IN_SUCCESS',
    SIGN_IN_FAILED = 'SIGN_IN_FAILED',
    SIGN_OUT_START = 'SIGN_OUT_START',
    SIGN_OUT_SUCCESS = 'SIGN_OUT_SUCCESS',
    SIGN_OUT_FAILED = 'SIGN_OUT_FAILED'
}

export const { SET_CURRENT_USER,
               CHECK_USER_SESSION,
               SIGN_UP_USER_START,
               GOOGLE_SIGN_IN_START,
               EMAIL_SIGN_IN_START,
               SIGN_IN_SUCCESS,
               SIGN_IN_FAILED,
               SIGN_OUT_START,
               SIGN_OUT_SUCCESS,
               SIGN_OUT_FAILED } = USER_ACTION_TYPES;

export type CurrentUser = {
    createdAt: {
        nanoseconds: number;
        seconds: number;
    }
    displayName: string;
    email: string;
    id: string;
}

export type SignInUser = {
    email: string;
    password: string;
}

export type SignUpUser = SignInUser & {
    displayName: string;
}