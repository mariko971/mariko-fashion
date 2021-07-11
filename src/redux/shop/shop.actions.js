import shopActionTypes from "./shop.types";
import { firestore, convertCollectionsSnapshotToMap} from "../../firebase/firebase.utils";


export const updateCollections = (collectionsMap)=>({
    type: shopActionTypes.UPDATE_COLLECTIONS,
    payload: collectionsMap
});

export const fetchCollectionStart = ()=>({
    type: shopActionTypes.FETCH_COLLECTIONS_START
});

export const fetchCollectionFailure = (errorMessage)=>({
    type: shopActionTypes.FETCH_COLLECTIONS_FAILURE,
    payload: errorMessage
});

export const fetchCollectionSuccess = (collectionsMap)=>({
    type: shopActionTypes.FETCH_COLLECTIONS_SUCCESS,
    payload: collectionsMap
});

export const selectFetchCollectionsAsync = ()=>{
    return dispatch =>{
        const collectionRef = firestore.collection('collections');
        dispatch(fetchCollectionStart());
        collectionRef.get().then(async snapshot=>{
         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
         dispatch(fetchCollectionSuccess(collectionsMap));         
      }).catch(error=>dispatch(fetchCollectionFailure(error.message))); 
    }
};