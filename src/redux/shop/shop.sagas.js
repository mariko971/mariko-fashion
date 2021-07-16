import { takeLatest, call, put } from 'redux-saga/effects';

import { fetchCollectionSuccess, fetchCollectionFailure } from './shop.actions';
import { convertCollectionsSnapshotToMap, firestore } from '../../firebase/firebase.utils';
import shopActionTypes from './shop.types';

export function* fetchCollectionsAsync(){
    try {
        const collectionRef = firestore.collection('collections');
        const snapshot = yield collectionRef.get();
        const collectionsMap = yield call(convertCollectionsSnapshotToMap, snapshot);
        yield put(fetchCollectionSuccess(collectionsMap));
    } catch (error) {
        yield put(fetchCollectionFailure(error.message));
    }
};

export function* fetchCollectionsStart(){
    yield takeLatest(shopActionTypes.FETCH_COLLECTIONS_START, fetchCollectionsAsync);
};
