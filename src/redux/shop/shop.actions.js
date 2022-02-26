import ShopActionTypes from "./shop.types";
import { firestore,convertCollectionsSnapshotToMap } from "../../firebase/firebase.utils";

export const fetchCollectionsStart = collectionsMap => ({
    type:ShopActionTypes.FETCH_COLLECTION_START
})

export const FecthCollectionsSuccsss = collectionsMap => ({
    type:ShopActionTypes.FETCH_COLLECTION_SUCCESS,
    payload:collectionsMap
})

export const FecthCollectionsFailure = errorMessage => ({
    type:ShopActionTypes.FETCH_COLLECTION_FAILURE,
    payload:errorMessage
})

export const fetchCollectionsStartAsync = () => {
    return dispatch =>{
        const collectionRef = firestore.collection('collections');   
        dispatch(fetchCollectionsStart())     

        collectionRef.get().then(snapshot => { 
                    const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
                    dispatch(FecthCollectionsSuccsss(collectionsMap));
            }).catch(error=>dispatch(FecthCollectionsFailure(error.message)))
    }
}