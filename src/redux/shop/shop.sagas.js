import {all,takeLatest,call,put} from 'redux-saga/effects';
import { firestore,convertCollectionsSnapshotToMap } from '../../firebase/firebase.utils';
import ShopActionTypes from './shop.types';
import { FecthCollectionsSuccsss, FecthCollectionsFailure} from './shop.actions';

export function* fetchCollectionsAsync(){
    try{
    const collectionRef = firestore.collection('collections');  
    const snapshot = yield collectionRef.get();
    const collectionsMap = yield call(convertCollectionsSnapshotToMap,snapshot); // techincally we could write
                                            // convertCollectionsSnapshotToMap(snapshot), yield and call - allows
                                            // us to call this function and stop it in case it takes longer than usual
     yield put(FecthCollectionsSuccsss(collectionsMap))
    }
    catch(error)
    {
        yield put(FecthCollectionsFailure(error.message))
    }
    // collectionRef.get().then(snapshot => { 
    //             const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
    //             dispatch(FecthCollectionsSuccsss(collectionsMap));
    //     }).catch(error=>dispatch(FecthCollectionsFailure(error.message)))
}

export function* fetchCollectionsStart(){
    yield takeLatest(ShopActionTypes.FETCH_COLLECTION_START,
        fetchCollectionsAsync
        );
}


export function* shopSagas(){
    yield(all([call(fetchCollectionsStart)]))
}