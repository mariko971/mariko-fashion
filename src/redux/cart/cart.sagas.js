import { takeLatest, put, all, call } from "redux-saga/effects";
import userActionTypes  from '../user/user.types';
import { clearCartOut } from "./cart.actions";

export function* clearCartOutStart(){
    yield put(clearCartOut());
}

export function* onclearCartOnSignOut(){
    yield takeLatest(userActionTypes.SIGN_OUT_SUCCESS, clearCartOutStart);
}

export function* cartSagas(){
    yield all([
        call(onclearCartOnSignOut)
    ]);
}