import { takeLatest, call, all, put } from "redux-saga/effects";

import userActionTypes from "./user.types";
import { auth, createUserProfileDocument, googleProvider, getCurrentUser } from "../../firebase/firebase.utils";
import { signInFail, signInSuccess, signOutSuccess, signOutFailure, signUpSuccess, signUpFailure} from "./user.actions";

export function* getSnapshotFromUserAuth(userAuth, additionalData){
    try {
        const userRef = yield call(createUserProfileDocument, userAuth, additionalData);
        const userSnapshot = yield userRef.get();
        yield put(signInSuccess({id: userSnapshot.id, ...userSnapshot.data()}));
    } catch (error) {
        yield put(signInFail(error));
    }
};

export function* signInWithGoogle(){
    try {
        const {user} = yield auth.signInWithPopup(googleProvider);
        yield getSnapshotFromUserAuth(user);
    } catch (error){
        yield put(signInFail(error));
    }
};

export function* signInWithEmail({payload: {email, password}}){
    
    try{
        const {user}= yield auth.signInWithEmailAndPassword(email, password);
        yield getSnapshotFromUserAuth(user);        
      } catch(error){
        yield put(signInFail(error));
      }     
};

export function* isUserAuthenticated(){
    try {
        const userAuth = yield getCurrentUser();
        if(!userAuth) return
        yield getSnapshotFromUserAuth(userAuth);
    } catch (error) {
        yield put(signInFail(error.message));
    }
}

export function* signOutStart(){
    try {
        yield auth.signOut();
        yield put(signOutSuccess());
    } catch (error) {
        yield put(signOutFailure(error));
    }    
}

export function* userSignUp({ payload: { email, password, displayName } }){    
    try {
        const { user } = yield auth.createUserWithEmailAndPassword(email, password);
        yield put (signUpSuccess({user, additionalData: { displayName }}));
    } catch (error) {
        yield put(signUpFailure(error.message));
    }
}

export function* onGoogleSignInStart(){
    yield takeLatest(userActionTypes.GOOGLE_SIGN_IN_START, signInWithGoogle)
};


export function* onEmailSignInStart(){
    yield takeLatest(userActionTypes.EMAIL_SIGN_IN_START, signInWithEmail)
};


export function* onCheckUserSession(){
    yield put(userActionTypes.CHECK_USER_SESSION, isUserAuthenticated)
}

export function* onSignOut(){
    yield takeLatest(userActionTypes.SIGN_OUT_START, signOutStart)
}


export function* onSignUpStart(){
    yield takeLatest(userActionTypes.SIGN_UP_START, userSignUp)
}


export function* onSignUpSuccess(){
    yield takeLatest(userActionTypes.SIGN_UP_SUCCESS, signInAfterSignUp)
}

export function* signInAfterSignUp( { payload: { user, additionalData } } ){
    yield call(getSnapshotFromUserAuth, user, additionalData)
}

export function* userSagas(){
    yield all([
        call(onGoogleSignInStart), 
        call(onEmailSignInStart), 
        call(isUserAuthenticated), 
        call(onSignOut),
        call(onSignUpStart),
        call(onSignUpSuccess)
    ]);
}