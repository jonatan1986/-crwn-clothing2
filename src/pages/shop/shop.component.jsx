import React from "react";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { firestore, convertCollectionsSnapshotToMap} from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { updateCollections } from "../../redux/shop/shop.actions";
import WithSpinner from "../../components/with-spinner/with-spinner.component";
// import selectCollections from "../../redux/shop/shop.selectors";
// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";

const CollectionOverviewWithSpinner = WithSpinner(CollectionsOverview);
const CollectionPageWithSpinner = WithSpinner(CollectionPage);

class  ShopPage extends React.Component
{
state = {
     loading:true
}
unsubscribeFromSnapshot = null;
componentDidMount(){
   const {updateCollections} = this.props;
   const collectionRef = firestore.collection('collections');
//    fetch('https://firestore.googleapis.com/v1/projects/crwn-db-c6bff/databases/(default)/documents/collections')
//    .then(response => response.json())
//    .then(collections => console.log(collections))

   collectionRef.get().then(snapshot => { 
             const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
             // console.log(collectionsMap)
             updateCollections(collectionsMap);
             this.setState({loading:false})
        })
//    this.unsubscribeFromSnapshot = collectionRef.onSnapshot(/*async*/ snapshot => { 
//         const collectionsMap = convertCollectionsSnapshotToMap(snapshot);
//         // console.log(collectionsMap)
//         updateCollections(collectionsMap);
//         this.setState({loading:false})
//    }) // this code will be called in the first time when app fires or when collection
                            // is updated, we get back snapshot object of out collection
}
render(){
        const {match} = this.props;
        const {loading} = this.state;
        return(<div className='shop-page'>
        <Route exact path={`${match.path}`} render={(props)=><CollectionOverviewWithSpinner isLoading={loading} {...props}/>}/>
        <Route path={`${match.path}/:collectionId`} render={(props)=><CollectionPageWithSpinner isLoading={loading} {...props}/>} />
        </div>);
    }

}

 
// const mapStateToProps = createStructuredSelector({
//     collections:selectCollections
// })
 
// export default connect(mapStateToProps)(ShopPage);

const mapDispatchToProps = dispatch => ({
        updateCollections: collectionsMap => dispatch(updateCollections(collectionsMap))
})

export default connect(null,mapDispatchToProps)(ShopPage);



