import { all, put, call, takeLatest } from 'typed-redux-saga/macro'
import { CHECK_USER_SESSION, EMAIL_SIGN_IN_START, GOOGLE_SIGN_IN_START, 
         SIGN_UP_USER_START, SIGN_OUT_START } from './user.types'
import { signInSuccess, signInFailed, signOutUserSuccess, singOutUserFailed, EmailSignInStart, SignUpUserStart } from './user.action'
import { getCurrentUser, createUserDocFromAuth, signInUserWithEmailAndPassword,
         signInWithGooglePopup, createAuthUserWithEmailAndPassword,
         signOutUser, AdditionalInfo } from '../../utils/firebase/firebase.utils'
import { User, AuthError, AuthErrorCodes } from "firebase/auth";

// used for sign up and sign in sagas
export function* getSnapshotFromUserAuth(userAuth: User, additionalInfo?: AdditionalInfo) {
    try {
        const userSnapshot = yield* call(
            createUserDocFromAuth, 
            userAuth, 
            additionalInfo
        )
        if(userSnapshot)
        yield* put(signInSuccess({ id: userSnapshot.id , ...userSnapshot.data() }))
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

// create user account
export function* onCreateUserAccount() {
    yield* takeLatest(SIGN_UP_USER_START, createUserAccount)
}

export function* createUserAccount({ payload: { email, password, displayName }}: SignUpUserStart) {    
    try {
        const userCredential = yield* call(createAuthUserWithEmailAndPassword, email, password)
        if(userCredential) {
            const { user } = userCredential;
            yield* call(getSnapshotFromUserAuth, user, { displayName })
            yield* call(isUserAuthenticated)
        }
    } catch (error) {
        if((error as AuthError).code === AuthErrorCodes.EMAIL_EXISTS) {
            console.error(error)
            alert("Email already in use")
            // password less than 6 characters
        } else if ((error as AuthError).code === AuthErrorCodes.WEAK_PASSWORD) {
            console.error(error)
            alert("Password must be at least 6 characters long")
        } else {
            console.log('createAuthUserWithEmailAndPassword error: ', error)
        }
        yield* put(signInFailed(error as Error))
    }
}

// Check if user is signed in
export function* onCheckUserSession() {
    yield* takeLatest(CHECK_USER_SESSION, isUserAuthenticated)
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield* call(getCurrentUser)
        if (!userAuth) return
        yield* call(getSnapshotFromUserAuth, userAuth)
    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

// Email Sign in
export function* onEmailSigninStart() {
    yield* takeLatest(EMAIL_SIGN_IN_START, signInWithEmailAndPassword)
}


export function* signInWithEmailAndPassword({ payload: { email, password }}: EmailSignInStart) {
    try {
        const userCredential = yield* call(
            signInUserWithEmailAndPassword,
            email,
            password)
        if(userCredential) {
            const { user } = userCredential
            yield* call(getSnapshotFromUserAuth, user)
        }


    } catch (error) {
        yield* put(signInFailed(error as Error))
        
        if((error as AuthError).code === AuthErrorCodes.INVALID_LOGIN_CREDENTIALS || 
           (error as AuthError).code === AuthErrorCodes.INVALID_PASSWORD) {
            console.error((error as AuthError).message)
            alert("Email or password is invalid")
        // user not found in db
        } else if ((error as AuthError).code === AuthErrorCodes.NULL_USER) {
            console.error((error as AuthError).message)
            alert("No user was found")
        } else {
            console.log('createAuthUserWithEmailAndPassword error: ', error)
    }
    }
}

// Google Sign in
export function* onGoogleSigninStart() {
    yield* takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signInWithGoogle() {
    try {
        const { user } = yield* call(signInWithGooglePopup)
        yield* call(getSnapshotFromUserAuth, user)

    } catch (error) {
        yield* put(signInFailed(error as Error))
    }
}

// Sign out user
export function* onSignOutUser() {
    yield* takeLatest(SIGN_OUT_START, signUserOut)
}

export function* signUserOut() {
    try {
        yield* call(signOutUser)
        yield* put(signOutUserSuccess())
        alert('User Signed Out')
    } catch (error) {
        yield* put(singOutUserFailed(error as Error))
    }
}

// User Saga
export function* userSaga() {
    yield* all(
        [call(onCheckUserSession),
         call(onGoogleSigninStart),
         call(onEmailSigninStart),
         call(onCreateUserAccount),
         call(onSignOutUser)
        ]);
}