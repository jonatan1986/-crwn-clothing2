import React,{useEffect} from "react";
import { Route } from "react-router-dom";
import CollectionsOverview from "../../components/collections-overview/collections-overview.component";
import CollectionPage from "../collection/collection.component";
import { firestore, convertCollectionsSnapshotToMap} from "../../firebase/firebase.utils";
import { connect } from "react-redux";
import { fetchCollectionsStart } from "../../redux/shop/shop.actions";
import { selectIsCollectionFecthing,selectIsCollectionLoaded} from "../../redux/shop/shop.selectors";
import CollectionsOverviewContainer from "../../components/collections-overview/collections-overview.containers";
import CollectionPageContainer from "../collection/collection.container";
// import selectCollections from "../../redux/shop/shop.selectors";
// import { connect } from "react-redux";
// import { createStructuredSelector } from "reselect";

const ShopPage = ({match,fetchCollectionsStart}) =>
{
    // some note - render occures before componentDidMount, so when 'CollectionPageWithSpinner' is rendered
    // isLoading is false(initial value of isLoading), and 'WrappedComponent' which is 'CollectionPage'
    // (wrapped by with spinner), loads the data from props,because isLoading is not 'true' 
    // so the spinning circle does not  appear as expected. there is confusion between false value
    // of isLoading - before data fecthing and also after - it is false
    
    useEffect(() =>{
        fetchCollectionsStart();
    },[fetchCollectionsStart]); // the array with fetchCollectionsStart , is there in order to call
    // the funtion only once , otherwise the this component will render twice - first when the compnent
    // mounts and then also when parent comonent App.js checks current user and if there is new user -
    // app.js re-renders and then renders shop component

    return(<div className='shop-page'>
    <Route exact path={`${match.path}`} component={CollectionsOverviewContainer}/* render={(props)=><CollectionOverviewWithSpinner isLoading={isCollectionFetching} {...props}/>} *//>
    <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer}/*render={(props)=><CollectionPageWithSpinner isLoading={!isCollectionLoaded} {...props}/>} */ />
    </div>);
}

 
// const mapStateToProps = createStructuredSelector({
//     collections:selectCollections
// })
 
// export default connect(mapStateToProps)(ShopPage);


const mapDispatchToProps = dispatch => ({
    fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

export default connect(null,mapDispatchToProps)(ShopPage);



