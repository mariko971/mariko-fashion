
import { createSelector } from "reselect";
import memoize from 'lodash.memoize';

const selectShop = state => state.shop;

export const selectShopData = createSelector(
    [selectShop],
    (shop)=> shop.collections
);

export const selectCollection = memoize((collectionUrlParam) =>{
    return createSelector(
        [selectShopData],
        collections=> collections ? collections[collectionUrlParam] : null
    )}
);

export const selectCollectionsForPreview = createSelector(
    [selectShopData],
    collections =>collections ? Object.keys(collections).map( key => collections[key] ) : []       
);



export const selectIsCollectionFetching = createSelector(
    [selectShop],
    shop => shop.isFetching
);

export const selectIsCollectionLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
);