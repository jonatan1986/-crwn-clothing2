import { createSelector } from "reselect";

const selectShop = state => state.shop;

 const selectCollections = createSelector(
    [selectShop],
    shop => shop.collections
)
export const selectCollection = collectionUrlParam =>
createSelector(
    [selectCollections],
    collections => (collections ? collections[collectionUrlParam] : null)
);

export const selectIsCollectionFecthing = createSelector(
    [selectShop],
    shop => shop.isFetching
)

export const selectCollectionForPreview = createSelector(
    [selectCollections],
    collections => collections ? Object.keys(collections).map(key => collections[key]) : []
)

export const selectIsCollectionLoaded = createSelector(
    [selectShop],
    shop => !!shop.collections
)
// export const selectCollection = collectionUrlParam =>
//     createSelector(
//         [selectCollections],
//         collections =>collections.find(collection => collection.id ===
//             COLLECTION_ID_MAP[collectionUrlParam]))



export default selectCollections;