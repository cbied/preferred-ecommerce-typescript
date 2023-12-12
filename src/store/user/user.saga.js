import { all, put, call, takeLatest } from 'redux-saga/effects'
import { CHECK_USER_SESSION, EMAIL_SIGN_IN_START, GOOGLE_SIGN_IN_START, 
         SIGN_UP_USER_START, SIGN_OUT_START } from './user.types'
import { signInSuccess, signInFailed, signOutUserSuccess, singOutUserFailed } from './user.action'
import { getCurrentUser, createUserDocFromAuth, signInUserWithEmailAndPassword,
         signInWithGooglePopup, createAuthUserWithEmailAndPassword, signOutUser } from '../../utils/firebase/firebase.utils'

// used for sign up and sign in sagas
export function* getSnapshotFromUserAuth(userAuth, additionalInfo) {
    try {
        const userSnapshot = yield call(
            createUserDocFromAuth, 
            userAuth, 
            additionalInfo
        )
        yield put(signInSuccess({ id: userSnapshot.id , ...userSnapshot.data() }))
    } catch (error) {
        yield put(signInFailed(error))
    }
}

// create user account
export function* onCreateUserAccount() {
    yield takeLatest(SIGN_UP_USER_START, createUserAccount)
}

export function* createUserAccount({ payload: { email, password, displayName }}) {    
    try {
        const { user } = yield call(createAuthUserWithEmailAndPassword, email, password)
        yield call(getSnapshotFromUserAuth, user, { displayName })
        yield call(isUserAuthenticated)
    } catch (error) {
        // Email already in databases
        if(error.code === "auth/email-already-in-use") {
            console.error(error.message)
            alert("Email already in use")
            // password less than 6 characters
        } else if (error.code === "auth/weak-password") {
            console.error(error.message)
            alert("Password must be at least 6 characters long")
        } else {
            console.log('createAuthUserWithEmailAndPassword error: ', error)
        }
        yield put(signInFailed(error))
    }
}

// Check if user is signed in
export function* onCheckUserSession() {
    yield takeLatest(CHECK_USER_SESSION, isUserAuthenticated)
}

export function* isUserAuthenticated() {
    try {
        const userAuth = yield call(getCurrentUser)
        if (!userAuth) return
        yield call(getSnapshotFromUserAuth, userAuth)
    } catch (error) {
        yield put(signInFailed(error))
    }
}

// Email Sign in
export function* onEmailSigninStart() {
    yield takeLatest(EMAIL_SIGN_IN_START, signInWithEmailAndPassword)
}

export function* signInWithEmailAndPassword({ payload: { email, password }}) {
    try {
        const { user } = yield call(
            signInUserWithEmailAndPassword,
            email,
            password)
        yield call(getSnapshotFromUserAuth, user)
        

    } catch (error) {
        yield put(signInFailed(error))
        if(error.code === "auth/invalid-login-credentials" || 
        error.code === "auth/wrong-password") {
        console.error(error.message)
        alert("Email or password is invalid")
        // user not found in db
        } else if (error.code === "auth/user-not-found") {
            console.error(error.message)
            alert("No user was found")
        } else {
            console.log('createAuthUserWithEmailAndPassword error: ', error)
    }
    }
}

// Google Sign in
export function* onGoogleSigninStart() {
    yield takeLatest(GOOGLE_SIGN_IN_START, signInWithGoogle)
}

export function* signInWithGoogle() {
    try {
        const { user } = yield call(signInWithGooglePopup)
        yield call(getSnapshotFromUserAuth, user)

    } catch (error) {
        yield put(signInFailed(error))
    }
}

// Sign out user
export function* onSignOutUser() {
    yield takeLatest(SIGN_OUT_START, signUserOut)
}

export function* signUserOut() {
    try {
        yield call(signOutUser)
        yield put(signOutUserSuccess())
        alert('User Signed Out')
    } catch (error) {
        yield put(singOutUserFailed(error))
    }
}

// User Saga
export function* userSaga() {
    yield all(
        [call(onCheckUserSession),
         call(onGoogleSigninStart),
         call(onEmailSigninStart),
         call(onCreateUserAccount),
         call(onSignOutUser)
        ]);
}